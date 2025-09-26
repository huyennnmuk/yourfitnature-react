import { NextResponse, NextRequest } from 'next/server';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { workshopPool } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limiter';

// --- Zod Validation and Sanitization Schema ---
const RegistrationSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(50, { message: "First name must be no more than 50 characters long" })
    // Sanitize by removing invalid characters, then validate
    .transform(value => value.replace(/[^a-zA-Z\s'-]/g, ''))
    .refine(value => /^[a-zA-Z\s'-]+$/.test(value), { message: "First name contains invalid characters" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email must be no more than 100 characters long" })
    .transform(value => value.toLowerCase()), // Normalize email to lowercase
  sessionPreference: z.enum(['follicular', 'ovulatory', 'luteal', 'menstrual', 'all']),
  hearAboutUs: z.string().optional(),
  privacyConsent: z.boolean().refine(value => value === true, {
    message: "You must agree to the privacy policy to continue"
  }),
  marketingOptIn: z.boolean().default(false),
  utmData: z.object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
    content: z.string().optional(),
  }).optional(),
  registrationSource: z.string().optional(),
});

// --- Mock JWT Creation (for development) ---
const createMockJwt = (payload: object) => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = 'mock_signature'; // Not a real signature
    return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export async function POST(request: NextRequest) {
  // --- Rate Limiting ---
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  if (!checkRateLimit(ip, 'ip')) {
    return NextResponse.json({ success: false, message: 'Too many requests from this IP. Please try again later.' }, { status: 429 });
  }
  
  let requestBody;
  try {
    requestBody = await request.json();
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid JSON in request body.' }, { status: 400 });
  }

  if (!checkRateLimit(requestBody.email, 'email')) {
    return NextResponse.json({ success: false, message: 'Too many registration attempts for this email. Please try again later.' }, { status: 429 });
  }

  // --- Validation & Sanitization ---
  const validationResult = RegistrationSchema.safeParse(requestBody);

  if (!validationResult.success) {
    const errors = validationResult.error.issues.map(e => ({ field: e.path.join('.'), message: e.message }));
    return NextResponse.json({ success: false, errors, message: 'Registration failed due to validation errors' }, { status: 400 });
  }

  const { 
    firstName, 
    email, 
    sessionPreference, 
    hearAboutUs, 
    privacyConsent, 
    marketingOptIn,
    utmData,
    registrationSource,
  } = validationResult.data;

  let connection;
  try {
    connection = await workshopPool.getConnection();

    // Check for existing registration
    const [existing] = await connection.execute(
      'SELECT id FROM workshop_registrations WHERE email = ? AND (session_preference = ? OR session_preference = \'all\')',
      [email, sessionPreference]
    );

    if (Array.isArray(existing) && existing.length > 0) {
      return NextResponse.json({
        success: false,
        errors: [{ field: 'email', message: 'This email is already registered for this workshop session.' }],
        message: 'This email is already registered for this workshop session.'
      }, { status: 409 });
    }

    const registrationId = `reg_${randomUUID()}`;
    const confirmationToken = createMockJwt({ email, registrationId });
    const registrationTimestamp = new Date();

    // Insert new registration into the database
    await connection.execute(
      `INSERT INTO workshop_registrations 
        (id, email, first_name, session_preference, hear_about_us, privacy_consent, marketing_opt_in, registration_source, utm_source, utm_medium, utm_campaign, utm_content, confirmation_token, registration_timestamp) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        registrationId,
        email,
        firstName,
        sessionPreference,
        hearAboutUs ?? null,
        privacyConsent,
        marketingOptIn,
        registrationSource ?? null,
        utmData?.source ?? null,
        utmData?.medium ?? null,
        utmData?.campaign ?? null,
        utmData?.content ?? null,
        confirmationToken,
        registrationTimestamp
      ]
    );

    const sessionDate = new Date();
    sessionDate.setDate(sessionDate.getDate() + 5); // Placeholder for actual session date logic

    const isAllSessions = sessionPreference === 'all';

    const responseData = {
      id: registrationId,
      email,
      firstName,
      sessionType: isAllSessions ? 'all-sessions' : sessionPreference,
      sessionDate: isAllSessions ? "Multiple Dates - See Email for Details" : sessionDate.toISOString(),
      confirmationToken,
      workshopDetails: {
        title: isAllSessions ? "The Complete Bloating Relief Workshop Series" : `${sessionPreference.charAt(0).toUpperCase() + sessionPreference.slice(1)} Phase Bloating Relief Workshop`,
        duration: "45-60 minutes",
        format: "Faceless - Slides + Audio Only",
        joinLink: "https://zoom.us/j/123456789?pwd=..." // Placeholder
      }
    };

    return NextResponse.json({ success: true, data: responseData, message: "Registration successful" });

  } catch (error) {
    console.error('Registration processing error:', error);
    // Type guard for mysql error
    if (error instanceof Error && 'code' in error) {
        return NextResponse.json({ success: false, message: `Database error: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: 'An unexpected error occurred on the server.' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName } = await req.json();
    const challenge = "5 gut secrets";

    if (!email || !firstName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.gutSecretsRegistration.findUnique({
      where: { email },
    });
    if (existing) {
      return NextResponse.json({ error: 'This email is already registered.' }, { status: 409 });
    }

    const registration = await prisma.gutSecretsRegistration.create({
      data: {
        email,
        name: `${firstName} ${lastName || ''}`.trim(),
      },
    });

    // Subscribe user to WordPress
    try {
      const wordpressSubscribeApiUrl = process.env.WORDPRESS_SUBSCRIBE_API_URL;
      const wordpressUsername = process.env.WORDPRESS_USERNAME;
      const wordpressApplicationPassword = process.env.WORDPRESS_APPLICATION_PASSWORD;

      if (wordpressSubscribeApiUrl && wordpressUsername && wordpressApplicationPassword) {
        const response = await fetch(wordpressSubscribeApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${wordpressUsername}:${wordpressApplicationPassword}`).toString('base64')}`,
          },
          body: JSON.stringify({
            email,
            first_name: firstName,
            last_name: lastName,
            challenge,
            list_title: "Gut Secrets",
            source: "gut_secrets_register_page",
            tags: [8],
            custom_values: {
              Registerto: "Gut Secrets Guide"
            }
          }),
        });

        if (!response.ok) {
          console.error('Failed to subscribe user to WordPress:', await response.text());
        } else {
          console.log('WordPress subscription response:', await response.json());
        }
      }
    } catch (error) {
      console.error('Error subscribing user to WordPress:', error);
    }

    return NextResponse.json({ message: 'Registration successful', registration }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'An error occurred during registration.' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { appendFile } from 'fs/promises';
import { join } from 'path';

interface ReportPayload {
  categories: string[];
  free_text: string;
  user_id?: string;
  session_id?: string;
  thread_id?: string;
  answer_id?: string;
  context?: object;
  safety_flag?: boolean;
  triage_status?: string;
  reviewer_notes?: string;
  resolution_code?: string;
}

// Simple in-memory rate limiter
const requests = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 5;

export async function GET(request: Request) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM answer_reports ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function POST(request: Request) {
  // NOTE: This is a POST endpoint
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';

  const now = Date.now();
  const userRequests = requests.get(ip) || [];
  const requestsInWindow = userRequests.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW);

  if (requestsInWindow.length >= MAX_REQUESTS_PER_WINDOW) {
    return new NextResponse('Too many requests', { status: 429 });
  }

  requests.set(ip, [...requestsInWindow, now]);

  let connection;
  try {
    const payload: ReportPayload = await request.json();

    // Basic validation
    if (!payload.categories || !Array.isArray(payload.categories) || payload.categories.length === 0) {
      return new NextResponse('Bad Request: categories are required', { status: 400 });
    }

    connection = await pool.getConnection();

    const safetyFlag = payload.categories.includes('Harmful or offensive');

    const [result] = await connection.execute(
      `INSERT INTO answer_reports (
        user_id, session_id, thread_id, answer_id, categories, free_text, context, safety_flag, triage_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.user_id || null, // Placeholder
        payload.session_id || null, // Placeholder
        payload.thread_id || null, // Placeholder
        payload.answer_id || null, // Placeholder
        JSON.stringify(payload.categories),
        payload.free_text,
        JSON.stringify(payload.context || {}),
        safetyFlag,
        payload.triage_status || 'pending',
      ]
    );

    // Log the report to a file
    const logEntry = {
      categories: payload.categories,
      free_text: payload.free_text,
      timestamp: new Date().toISOString(),
    };
    const logFilePath = join(process.cwd(), 'logs', 'reporting.log');
    await appendFile(logFilePath, JSON.stringify(logEntry) + '\n');


    return new NextResponse('Success', { status: 200 });
  } catch (error) {
    console.error('Error processing report:', error);
    return new NextResponse('Internal Server a Error', { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

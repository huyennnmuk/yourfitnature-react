import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { event, data } = await request.json();
    
    if (!event) {
      return NextResponse.json({ error: 'Event name is required' }, { status: 400 });
    }

    const logEntry = `[${new Date().toISOString()}] ${event} ${data ? JSON.stringify(data) : ''}`;
    
    // Server-side: append to logs/analytics.log
    const logsDir = path.resolve(process.cwd(), 'logs');
    const logFile = path.join(logsDir, 'analytics.log');
    
    try {
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
      fs.appendFileSync(logFile, logEntry + '\n', 'utf8');
    } catch (err) {
      console.error('Failed to write analytics log:', err);
      return NextResponse.json({ error: 'Failed to log analytics' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

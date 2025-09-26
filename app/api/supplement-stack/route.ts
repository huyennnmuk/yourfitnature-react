import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Handle download/email logic here
  return NextResponse.json({ message: 'Protocol sent!' });
}

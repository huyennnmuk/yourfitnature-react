import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { pool } from "@/lib/roadmap-db";
import { NextRequest, NextResponse } from "next/server";

interface DayLogRequest {
  food: string;
  symptoms: string;
  mood: 'Good' | 'Okay' | 'Bad';
  energy: 'High' | 'Medium' | 'Low';
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: DayLogRequest = await req.json();
    const { food, symptoms, mood, energy } = body;

    if (!food || !mood || !energy) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const log_date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const [result] = await pool.execute(
      `INSERT INTO tracker_logs (user_id, log_date, food, symptoms, mood, energy)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, log_date, food, symptoms, mood, energy]
    );

    const insertId = (result as any).insertId;

    return NextResponse.json({ id: insertId, ...body, log_date, user_id: userId }, { status: 201 });

  } catch (error) {
    console.error("Error creating log:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT id, log_date, food, symptoms, mood, energy FROM tracker_logs WHERE user_id = ? ORDER BY log_date DESC',
      [userId]
    );

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

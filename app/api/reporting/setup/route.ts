'use strict';
import { NextRequest, NextResponse } from "next/server";
import pool from '@/lib/db';

const createAnswerReportsTableSQL = `
CREATE TABLE IF NOT EXISTS answer_reports (
  report_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(191),
  session_id VARCHAR(191),
  thread_id VARCHAR(191),
  answer_id VARCHAR(191),
  categories JSON,
  free_text TEXT,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  context JSON,
  safety_flag BOOLEAN,
  triage_status VARCHAR(191),
  reviewer_notes TEXT,
  resolution_code VARCHAR(191),
  PRIMARY KEY (report_id),
  KEY idx_user_id (user_id),
  KEY idx_answer_id (answer_id),
  KEY idx_safety_flag (safety_flag),
  KEY idx_triage_status (triage_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

export async function GET(req: NextRequest) {
    return NextResponse.json(
        { message: "This endpoint is for setting up the database and only accepts POST requests." },
        { status: 405, headers: { 'Allow': 'POST' } }
    );
}

export async function POST(req: NextRequest) {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Connected to the database.");

    console.log("Creating 'answer_reports' table...");
    await connection.execute(createAnswerReportsTableSQL);
    console.log("'answer_reports' table created or already exists.");

    return NextResponse.json({ success: true, message: "Database setup complete." }, { status: 200 });

  } catch (error) {
    console.error("Failed to set up the database:", error);
    return NextResponse.json({ message: "Failed to set up the database", error: (error as Error).message }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
      console.log("Database connection released.");
    }
  }
}

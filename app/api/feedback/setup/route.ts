'use strict';
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_FEEDBACK_HOST,
  port: Number(process.env.DB_FEEDBACK_PORT),
  database: process.env.DB_FEEDBACK_NAME,
  user: process.env.DB_FEEDBACK_USER,
  password: process.env.DB_FEEDBACK_PASS,
  charset: process.env.DB_CHARSET,
  connectionLimit: 1,
});

const createVotesTableSQL = `
CREATE TABLE IF NOT EXISTS blog_feedback_votes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  blog_id VARCHAR(191) NOT NULL,
  user_key VARCHAR(191) NOT NULL,
  vote_type ENUM('helpful','not_helpful') NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uniq_blog_user (blog_id, user_key),
  KEY idx_blog_id (blog_id),
  KEY idx_blog_vote (blog_id, vote_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

const createSummaryTableSQL = `
CREATE TABLE IF NOT EXISTS blog_feedback_summary (
  blog_id VARCHAR(191) NOT NULL,
  helpful_count INT UNSIGNED NOT NULL DEFAULT 0,
  not_helpful_count INT UNSIGNED NOT NULL DEFAULT 0,
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (blog_id)
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

    console.log("Creating 'blog_feedback_votes' table...");
    await connection.execute(createVotesTableSQL);
    console.log("'blog_feedback_votes' table created or already exists.");

    console.log("Creating 'blog_feedback_summary' table...");
    await connection.execute(createSummaryTableSQL);
    console.log("'blog_feedback_summary' table created or already exists.");

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

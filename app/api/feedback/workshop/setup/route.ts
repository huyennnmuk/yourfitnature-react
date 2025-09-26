import { NextRequest, NextResponse } from "next/server";
import { workshopPool } from "@/lib/db";

const createWorkshopFeedbackTableSQL = `
CREATE TABLE IF NOT EXISTS workshop_feedback (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  workshopId VARCHAR(191) NOT NULL,
  rating TINYINT UNSIGNED NOT NULL,
  message TEXT NOT NULL,
  name VARCHAR(191) NULL,
  isPrivate BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  KEY idx_workshopId (workshopId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

export async function GET(req: NextRequest) {
    return NextResponse.json(
        { message: "This endpoint is for setting up the workshop feedback table and only accepts POST requests." },
        { status: 405, headers: { 'Allow': 'POST' } }
    );
}

export async function POST(req: NextRequest) {
  let connection;
  try {
    connection = await workshopPool.getConnection();
    console.log("Connected to the workshop database.");

    console.log("Creating 'workshop_feedback' table...");
    await connection.execute(createWorkshopFeedbackTableSQL);
    console.log("'workshop_feedback' table created or already exists.");

    return NextResponse.json({ success: true, message: "Workshop feedback table setup complete." }, { status: 200 });

  } catch (error) {
    console.error("Failed to set up the workshop feedback table:", error);
    // In a real app, you'd want more robust error handling and logging
    return NextResponse.json({ message: "Failed to set up the database", error: (error as Error).message }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
      console.log("Workshop database connection released.");
    }
  }
}

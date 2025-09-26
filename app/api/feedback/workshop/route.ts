import { NextRequest, NextResponse } from "next/server";
import { workshopPool } from "@/lib/db";

export async function POST(req: NextRequest) {
  // 1. Receive and parse the request body
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON in request body." }, { status: 400 });
  }

  const { workshopId, rating, message, name, isPrivate } = body;

  // 2. Validate the data
  if (!workshopId || typeof workshopId !== 'string') {
    return NextResponse.json({ message: "Invalid or missing workshopId." }, { status: 400 });
  }
  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    return NextResponse.json({ message: "Invalid or missing rating. Must be a number between 1 and 5." }, { status: 400 });
  }
  if (!message || typeof message !== 'string' || message.trim() === '') {
    return NextResponse.json({ message: "Invalid or missing message." }, { status: 400 });
  }

  // 3. Get a connection and insert into the database
  let connection;
  try {
    connection = await workshopPool.getConnection();
    const sql = `
      INSERT INTO workshop_feedback (workshopId, rating, message, name, isPrivate)
      VALUES (?, ?, ?, ?, ?)
    `;
    // Use boolean value for isPrivate, defaulting to false
    const isPrivateValue = isPrivate === true;
    await connection.execute(sql, [workshopId, rating, message, name || null, isPrivateValue]);

    return NextResponse.json({ success: true, message: "Feedback submitted successfully." }, { status: 201 });

  } catch (error) {
    console.error("Database error while inserting workshop feedback:", error);
    return NextResponse.json({ message: "An error occurred while submitting your feedback.", error: (error as Error).message }, { status: 500 });
  } finally {
    // 4. Release the connection
    if (connection) {
      connection.release();
    }
  }
}

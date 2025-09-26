import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import fs from "fs/promises";
import path from "path";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  charset: process.env.DB_CHARSET,
});

const logDir = path.resolve(process.cwd(), "logs");
const logFile = path.join(logDir, "newsletter_debug.log");

async function logAttempt(email: string, source: string, success: boolean) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - Email: ${email}, Source: ${source}, Success: ${success}\n`;
  try {
    // Ensure logs directory exists
    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(logFile, logMessage);
  } catch (error) {
    console.error("Failed to write to log file:", error);
  }
}


export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  try {
    const { email, source } = await req.json();

    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      await logAttempt(email, source, false);
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    try {
      const [result] = await pool.execute(
        "INSERT IGNORE INTO newsletter_subscribers (email, source) VALUES (?, ?)",
        [email, source]
      );

      if ((result as any).affectedRows > 0) {
        await logAttempt(email, source, true);
        return NextResponse.json(
          { success: true, message: "Thank you for subscribing!" },
          { status: 200 }
        );
      } else {
        await logAttempt(email, source, true);
        return NextResponse.json(
          { success: true, message: "You are already subscribed." },
          { status: 200 }
        );
      }
    } catch (error) {
      console.error(error);
      await logAttempt(email, source, false);
      return NextResponse.json(
        { message: `Database error: ${error}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}

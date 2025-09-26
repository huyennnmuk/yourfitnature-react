'use strict';
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

export const dynamic = 'force-dynamic';

const pool = mysql.createPool({
  host: process.env.DB_FEEDBACK_HOST,
  port: Number(process.env.DB_FEEDBACK_PORT),
  database: process.env.DB_FEEDBACK_NAME,
  user: process.env.DB_FEEDBACK_USER,
  password: process.env.DB_FEEDBACK_PASS,
  charset: process.env.DB_CHARSET,
  connectionLimit: 10,
});

const logDir = path.resolve(process.cwd(), "logs");
const analyticsLog = path.join(logDir, "analytics.log");

async function appendAnalytics(line: string) {
  try {
    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(analyticsLog, line + "\n", "utf8");
  } catch (e) {
    console.error("Failed to write analytics log:", e);
  }
}

function hash(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex").slice(0, 16);
}

function validVoteType(v: unknown): v is "helpful" | "not_helpful" {
  return v === "helpful" || v === "not_helpful";
}

// POST /api/blogs/[blogId]/feedback
export async function POST(req: NextRequest, { params }: { params: { blogId: string } }) {
  const blogId = params.blogId;
  console.log(`--- POST /api/feedback/${blogId} ---`);

  console.log("--- DATABASE CONNECTION DEBUG ---");
  console.log("DB_FEEDBACK_HOST:", process.env.DB_FEEDBACK_HOST);
  console.log("DB_FEEDBACK_PORT:", process.env.DB_FEEDBACK_PORT);
  console.log("DB_FEEDBACK_NAME:", process.env.DB_FEEDBACK_NAME);
  console.log("DB_FEEDBACK_USER:", process.env.DB_FEEDBACK_USER);
  console.log("--- END DATABASE CONNECTION DEBUG ---");

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const vote_type = body?.vote_type;
  const user_key = body?.user_key; // supply from cookie/session on client
  const source = body?.source ?? "blog_page";

  if (!blogId || typeof blogId !== "string" || blogId.length > 191) {
    return NextResponse.json({ message: "Invalid blog_id" }, { status: 400 });
  }
  if (!validVoteType(vote_type)) {
    return NextResponse.json({ message: "Invalid vote_type" }, { status: 400 });
  }
  if (!user_key || typeof user_key !== "string" || user_key.length > 191) {
    return NextResponse.json({ message: "Missing user_key" }, { status: 400 });
  }

  const userHash = hash(user_key);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ipHash = ip ? hash(ip) : "";

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [rows]: [any[], any] = await conn.execute(
      "SELECT vote_type FROM blog_feedback_votes WHERE blog_id = ? AND user_key = ? FOR UPDATE",
      [blogId, user_key]
    );
    
    const [sumRows]: [any[], any] = await conn.execute(
        "SELECT helpful_count, not_helpful_count FROM blog_feedback_summary WHERE blog_id = ?",
        [blogId]
    );
    const counts = sumRows[0] ?? { helpful_count: 0, not_helpful_count: 0 };

    let result: "created" | "updated" | "noop" = "created";
    
    if (rows.length === 0) {
      await conn.execute(
        "INSERT INTO blog_feedback_votes (blog_id, user_key, vote_type) VALUES (?, ?, ?)",
        [blogId, user_key, vote_type]
      );
      if (vote_type === "helpful") {
        await conn.execute(
          "INSERT INTO blog_feedback_summary (blog_id, helpful_count, not_helpful_count) VALUES (?, 1, 0) ON DUPLICATE KEY UPDATE helpful_count = helpful_count + 1",
          [blogId]
        );
        counts.helpful_count++;
      } else {
        await conn.execute(
          "INSERT INTO blog_feedback_summary (blog_id, helpful_count, not_helpful_count) VALUES (?, 0, 1) ON DUPLICATE KEY UPDATE not_helpful_count = not_helpful_count + 1",
          [blogId]
        );
        counts.not_helpful_count++;
      }
      result = "created";
    } else {
      const current = rows[0].vote_type as "helpful" | "not_helpful";
      if (current === vote_type) {
        result = "noop";
      } else {
        await conn.execute(
          "UPDATE blog_feedback_votes SET vote_type = ? WHERE blog_id = ? AND user_key = ?",
          [vote_type, blogId, user_key]
        );
        if (vote_type === "helpful") {
          await conn.execute(
            "UPDATE blog_feedback_summary SET helpful_count = helpful_count + 1, not_helpful_count = GREATEST(not_helpful_count - 1, 0) WHERE blog_id = ?",
            [blogId]
          );
          counts.helpful_count++;
          counts.not_helpful_count--;
        } else {
          await conn.execute(
            "UPDATE blog_feedback_summary SET not_helpful_count = not_helpful_count + 1, helpful_count = GREATEST(helpful_count - 1, 0) WHERE blog_id = ?",
            [blogId]
          );
          counts.not_helpful_count++;
          counts.helpful_count--;
        }
        result = "updated";
      }
    }
    
    await conn.commit();
    
    await appendAnalytics(
      `${new Date().toISOString()} - feedback_vote - blog_id=${blogId} vote_type=${vote_type} result=${result} user_hash=${userHash} ip_hash=${ipHash} source=${source}`
    );
    
    return NextResponse.json({
      success: true,
      message: result === "noop" ? "No change" : "Vote recorded",
      data: {
        helpful: counts.helpful_count,
        not_helpful: counts.not_helpful_count,
        user_vote: vote_type
      }
    });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    await appendAnalytics(
      `${new Date().toISOString()} - feedback_vote_error - blog_id=${blogId} user_hash=${userHash} error=${String(error)}`
    );
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  } finally {
    conn.release();
  }
}

// GET /api/blogs/[blogId]/feedback
export async function GET(req: NextRequest, { params }: { params: { blogId: string } }) {
  const blogId = params.blogId;
  //console.log(`--- GET /api/feedback/${blogId} ---`);

  if (!blogId || typeof blogId !== "string" || blogId.length > 191) {
    console.log("Invalid blog_id received.");
    return NextResponse.json({ message: "Invalid blog_id" }, { status: 400 });
  }

  try {
    //console.log(`Executing query: SELECT helpful_count, not_helpful_count FROM blog_feedback_summary WHERE blog_id = '${blogId}'`);
    const [rows]: [any[], any] = await pool.execute(
      "SELECT helpful_count, not_helpful_count FROM blog_feedback_summary WHERE blog_id = ?",
      [blogId]
    );
    
    
    //console.log("Raw rows from database:", rows);

    const counts = rows[0] ?? { helpful_count: 0, not_helpful_count: 0 };
    //console.log("Processed counts:", counts);

    return NextResponse.json({ helpful: counts.helpful_count, not_helpful: counts.not_helpful_count }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      }
    });
  } catch (error) {
    //console.error("Database error in GET handler:", error);
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}

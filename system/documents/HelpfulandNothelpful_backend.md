<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Yes please extend the prd when including and combining my existing approaches

Great — I’ll extend the PRD and incorporate your existing approaches from the attached Next.js route handlers, aligning the Helpful/Not Helpful feature with:

- An event logging endpoint that writes to server-side logs (analytics.log)
- A MySQL-backed POST route pattern with input validation, pooled connections, logging to a file (newsletter_debug.log), idempotent inserts, and structured responses

Below is the updated PRD with concrete API specs, DB schema, validation, logging, and operational patterns that fit your current stack.

Product Requirements Document (PRD)
Feature: Helpful / Not Helpful Feedback on Blog Pages
Owner: [Your Name]
Version: 1.1
Last Updated: 12 Aug 2025

1) Overview
Implement a lightweight binary feedback mechanism on each blog page with:

- Durable storage of per-post votes (helpful/not helpful) in MySQL
- Idempotent, per-user constraint (session/IP/cookie/user_id)
- Fast counts retrieval with caching
- Server-side file logging for analytics and debugging, following your existing patterns
- Clear, consistent Next.js route handlers with pooled DB connections, validation, and structured responses

2) Goals

- Allow exactly one active vote per user per blog post (allow toggling/change).
- Persist votes and aggregate counts efficiently.
- Provide a read endpoint for current counts.
- Add low-friction analytics logging to file (append-only) for observability.
- Keep parity with existing code conventions (Next.js App Router, route.ts, mysql2/promise pool, fs logging).

3) Non-Goals

- Text comments/qualitative feedback.
- Realtime websockets; counts update via API responses and periodic polling.
- Complex auth; use session/cookie/IP unless your app has user auth already.

4) User Stories

- Reader can mark a post as Helpful or Not Helpful.
- Reader can switch their vote.
- Admin/analytics can see aggregate trends from DB and raw log files.

5) Architecture and Data Model
5.1 Entities

- Blog post: identified by blog_id (string/UUID/slug).
- Voter identity: one of user_id (if authenticated), or anonymous_token (cookie), plus optional IP fingerprint.
- Vote: vote_type ∈ {helpful, not_helpful}.

5.2 Database Schema (MySQL)
Tables

blog_feedback_votes

- id: BIGINT PK AUTO_INCREMENT
- blog_id: VARCHAR(191) NOT NULL
- user_key: VARCHAR(191) NOT NULL  // derived: user_id | anon_token | ip (configurable strategy)
- vote_type: ENUM('helpful','not_helpful') NOT NULL
- created_at: DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
- updated_at: DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
- UNIQUE KEY uniq_blog_user (blog_id, user_key)
- INDEX idx_blog_id (blog_id)
- INDEX idx_blog_vote (blog_id, vote_type)

blog_feedback_summary (optional but recommended)

- blog_id: VARCHAR(191) PK
- helpful_count: INT UNSIGNED NOT NULL DEFAULT 0
- not_helpful_count: INT UNSIGNED NOT NULL DEFAULT 0
- updated_at: DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)

Daily rollup (optional for long-term analysis)
blog_feedback_daily

- blog_id: VARCHAR(191)
- day: DATE
- helpful_count: INT UNSIGNED NOT NULL DEFAULT 0
- not_helpful_count: INT UNSIGNED NOT NULL DEFAULT 0
- PRIMARY KEY (blog_id, day)

Notes

- user_key creation policy:
    - If authenticated: user_id
    - Else: an anonymous cookie value (UUIDv4) set client-side and sent to server
    - Fallback IP-based throttling only (don’t use IP as user_key unless acceptable)
- For MySQL idempotency and quick writes, rely on UNIQUE(blog_id, user_key) and INSERT ... ON DUPLICATE KEY UPDATE.

6) API Design (Next.js route.ts, consistent with your patterns)
6.1 Common Dependencies

- mysql2/promise pool (like your newsletter route)
- fs/promises and append-only logging to logs/analytics.log
- Input validation and structured JSON responses
- Rate limiting/throttling at the edge or simple in-route checks as needed

6.2 Endpoints
A) Submit or Update Vote

- Method/Path: POST /api/blogs/[blogId]/feedback
- Request body:
{
"vote_type": "helpful" | "not_helpful",
"user_key": "<required if no auth>",    // from cookie/session
"source": "blog_page|...optional"
}
- Behavior:
    - Validate blogId param and vote_type enum.
    - Derive final user_key:
        - If authenticated user exists → use user_id from session.
        - Else require user_key param; if missing, generate and set cookie upstream on client.
    - Upsert vote:
        - If row exists and vote_type changes → update vote_type.
        - If same → no-op (idempotent).
    - Update summary atomically:
        - Strategy 1 (transactional):
            - If existing row changed helpful→not_helpful or vice versa, decrement and increment accordingly.
            - If new row, increment the new bucket.
        - Strategy 2 (recompute):
            - After upsert, compute counts via SELECT COUNT(*) WHERE blog_id \& vote_type, then UPDATE summary. Prefer for simplicity at low scale; optimize later.
    - Log to logs/analytics.log a structured, single-line event:
[ISO] feedback_vote {blog_id:..., user_key_hash:..., vote_type:..., result: created|updated|noop}
        - Never log raw user_key; log a hash.
- Responses:
200 OK
{
"success": true,
"message": "Vote recorded",
"data": {
"helpful": number,
"not_helpful": number,
"user_vote": "helpful" | "not_helpful"
}
}
400/405/429/500 as appropriate with message.

B) Get Counts

- Method/Path: GET /api/blogs/[blogId]/feedback
- Behavior:
    - Return counts from blog_feedback_summary if present.
    - If missing, compute on the fly and optionally seed summary.
    - Optional cache via Redis for extra speed; TTL 30–120s.
- Response:
{
"helpful": number,
"not_helpful": number
}

C) Optional: Remove Vote

- Method/Path: DELETE /api/blogs/[blogId]/feedback
- Behavior:
    - Identify user_key.
    - If row exists, delete it and decrement the respective summary counter; return updated counts.
- Response:
{
"success": true,
"helpful": number,
"not_helpful": number
}

6.3 Validation and Errors

- Enforce POST only, return 405 otherwise (as in your newsletter route).
- Validate vote_type strictly; reject unknown values with 400.
- Rate limit: e.g., 5 POSTs/min/user_key; 50/min/IP.
- On DB failure, log and return 500 with message "Database error".

7) Logging and Observability (aligning with your existing approaches)
File Logging

- Use fs/promises with logs directory, ensure mkdir recursive like in your newsletter route.
- Single analytics log file: logs/analytics.log
- On every POST:
    - Log: timestamp, event name ("feedback_vote"), blog_id, vote_type, result, hash(user_key), ip_truncated (/24), user_agent_hash.
- On every GET:
    - Optional: log "feedback_counts_read" with blog_id.

Example line
2025-08-12T05:55:00.123Z - feedback_vote - blog_id=how-to-x user_key_hash=ab12... vote_type=helpful result=updated

Debug Logging

- Use a separate logs/feedback_debug.log for detailed error stack traces if needed, mirroring newsletter_debug.log style.

8) Security, Privacy, Abuse Mitigation

- Do not log raw user identifiers; hash them (e.g., SHA-256).
- CSRF protection for POST if invoked from browsers (Next.js middleware or per-route).
- Add a lightweight bot check for anonymous votes (e.g., header token or simple proof-of-work if abuse detected).
- Throttle by user_key and IP.
- Input validation: strict enum, blog_id length checks.
- GDPR: user_key cookie should be non-PII random UUID; provide a way to delete vote (DELETE endpoint).

9) Performance and Scalability

- Writes:
    - Use INSERT ... ON DUPLICATE KEY UPDATE for upsert.
    - Wrap summary adjustments in a transaction to keep counters consistent.
- Reads:
    - Serve counts from summary, optionally cache in Redis.
    - Fallback to computing counts if summary missing or suspected stale.
- Background tasks (optional):
    - Periodic job to verify summary integrity by recomputing counts.
    - Daily aggregator to write blog_feedback_daily.

10) Frontend Integration Notes

- On first interaction, ensure an anon UUID cookie exists; include it as user_key in POST.
- Optimistically update UI with returned counts.
- Disable the buttons during the request; display current selection state.
- Poll counts periodically or fetch on page show.

11) Acceptance Criteria

- User can cast and toggle vote per blog post; only one active choice.
- Duplicate POSTs with the same vote_type are idempotent.
- GET returns accurate counts after any change.
- Summary remains consistent in concurrent scenarios.
- Logs are written for both success and error paths.
- Rate limiting blocks abusive bursts.

12) Example Next.js route.ts (sketch aligned with your code style)
Note: Illustrative only; adapt names and utils.

TypeScript

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

const pool = mysql.createPool({
host: process.env.DB_HOST,
port: Number(process.env.DB_PORT),
database: process.env.DB_NAME,
user: process.env.DB_USER,
password: process.env.DB_PASS,
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
if (req.method !== "POST") {
return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}

const blogId = params.blogId;
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
const ip = req.headers.get("x-forwarded-for")?.split(",")?.trim() ?? "";
const ipHash = ip ? hash(ip) : "";

const conn = await pool.getConnection();
try {
await conn.beginTransaction();

    // Check existing vote
    const [rows] = await conn.execute(
      "SELECT vote_type FROM blog_feedback_votes WHERE blog_id = ? AND user_key = ? FOR UPDATE",
      [blogId, user_key]
    );
    let result: "created" | "updated" | "noop" = "created";
    
    if ((rows as any[]).length === 0) {
      await conn.execute(
        "INSERT INTO blog_feedback_votes (blog_id, user_key, vote_type) VALUES (?, ?, ?)",
        [blogId, user_key, vote_type]
      );
      if (vote_type === "helpful") {
        await conn.execute(
          "INSERT INTO blog_feedback_summary (blog_id, helpful_count, not_helpful_count) VALUES (?, 1, 0) ON DUPLICATE KEY UPDATE helpful_count = helpful_count + 1"
        , [blogId]);
      } else {
        await conn.execute(
          "INSERT INTO blog_feedback_summary (blog_id, helpful_count, not_helpful_count) VALUES (?, 0, 1) ON DUPLICATE KEY UPDATE not_helpful_count = not_helpful_count + 1"
        , [blogId]);
      }
      result = "created";
    } else {
      const current = (rows as any[]).vote_type as "helpful" | "not_helpful";
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
        } else {
          await conn.execute(
            "UPDATE blog_feedback_summary SET not_helpful_count = not_helpful_count + 1, helpful_count = GREATEST(helpful_count - 1, 0) WHERE blog_id = ?",
            [blogId]
          );
        }
        result = "updated";
      }
    }
    
    // Get fresh counts
    const [sumRows] = await conn.execute(
      "SELECT helpful_count, not_helpful_count FROM blog_feedback_summary WHERE blog_id = ?",
      [blogId]
    );
    const counts = (sumRows as any[]) ?? { helpful_count: 0, not_helpful_count: 0 };
    
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
export async function GET(_req: NextRequest, { params }: { params: { blogId: string } }) {
const blogId = params.blogId;
if (!blogId || typeof blogId !== "string" || blogId.length > 191) {
return NextResponse.json({ message: "Invalid blog_id" }, { status: 400 });
}

try {
const [rows] = await pool.execute(
"SELECT helpful_count, not_helpful_count FROM blog_feedback_summary WHERE blog_id = ?",
[blogId]
);
const c = (rows as any[]) ?? { helpful_count: 0, not_helpful_count: 0 };
return NextResponse.json({ helpful: c.helpful_count, not_helpful: c.not_helpful_count });
} catch (error) {
console.error(error);
return NextResponse.json({ message: "Database error" }, { status: 500 });
}
}

13) Migration SQL (example)

- blog_feedback_votes

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

- blog_feedback_summary

CREATE TABLE IF NOT EXISTS blog_feedback_summary (
blog_id VARCHAR(191) NOT NULL,
helpful_count INT UNSIGNED NOT NULL DEFAULT 0,
not_helpful_count INT UNSIGNED NOT NULL DEFAULT 0,
updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
PRIMARY KEY (blog_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

14) Ops/DevEx Notes

- Mirror your newsletter route’s pool and logging setup for consistency.
- Consider wrapping logging calls so failures don’t block the request path.
- Add simple runtime config toggles: ENABLE_FEEDBACK_LOGS, RATE_LIMITS_ON, etc.
- Add integration tests for:
    - First vote, toggle vote, duplicate same vote.
    - Summary integrity under concurrency (2 clients toggling quickly).
    - Error handling paths.

If you want, I can:

- Provide a client-side hook/useFeedback(blogId) that handles cookie-based user_key, POST/GET calls, and optimistic UI.
- Add a small middleware to ensure an anonymous UUID cookie is present for unauthenticated users.

<div style="text-align: center">⁂</div>

[^1]: route.ts

[^2]: route.ts


import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getRoadmapProgress, updateRoadmapProgress } from "@/lib/roadmap-db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  // The user id is cast as any for now, will be fixed with a next-auth.d.ts file
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const progress = await getRoadmapProgress(userId);

  if (progress) {
    return NextResponse.json(progress);
  } else {
    // If no progress, create a default one
    const defaultProgress = {
      userId: userId,
      currentPhase: 1,
      completedPhases: [],
    };
    await updateRoadmapProgress(userId, defaultProgress);
    return NextResponse.json(defaultProgress);
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const userId = (session?.user as any)?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { currentPhase, completedPhases } = body;

  const progress = await updateRoadmapProgress(userId, { currentPhase, completedPhases });

  if (progress) {
    return NextResponse.json(progress);
  } else {
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}

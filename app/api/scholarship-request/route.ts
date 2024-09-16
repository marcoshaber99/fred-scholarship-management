import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ScholarshipFormData } from "@/types/scholarship";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: ScholarshipFormData & { isDraft: boolean } = await req.json();
    const { isDraft, ...data } = body;

    const existingRequest = await db.scholarshipRequest.findFirst({
      where: {
        userId: session.user.id,
        status: { not: "DRAFT" },
      },
    });

    if (existingRequest && !isDraft) {
      return NextResponse.json(
        { error: "A scholarship request already exists" },
        { status: 400 }
      );
    }

    const existingDraft = await db.scholarshipRequest.findFirst({
      where: {
        userId: session.user.id,
        status: "DRAFT",
      },
    });

    let scholarshipRequest;
    if (existingDraft) {
      scholarshipRequest = await db.scholarshipRequest.update({
        where: { id: existingDraft.id },
        data: {
          ...data,
          status: isDraft ? "DRAFT" : "PENDING",
        },
      });
    } else {
      scholarshipRequest = await db.scholarshipRequest.create({
        data: {
          ...data,
          userId: session.user.id,
          status: isDraft ? "DRAFT" : "PENDING",
        },
      });
    }

    return NextResponse.json(scholarshipRequest);
  } catch (error) {
    console.error("Error creating/updating scholarship request:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const scholarshipRequests = await db.scholarshipRequest.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(scholarshipRequests);
  } catch (error) {
    console.error("Error fetching scholarship requests:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

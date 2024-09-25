import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user || user.role !== "ADMIN" || !user.isApproved) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const scholarshipRequests = await db.scholarshipRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(scholarshipRequests);
  } catch (error) {
    console.error("[SCHOLARSHIP_REQUESTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

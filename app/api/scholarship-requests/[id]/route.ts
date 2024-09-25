import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();

    if (!user || user.role !== "ADMIN" || !user.isApproved) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const scholarshipRequest = await db.scholarshipRequest.findUnique({
      where: { id: params.id },
    });

    if (!scholarshipRequest) {
      return new NextResponse("Scholarship request not found", { status: 404 });
    }

    return NextResponse.json(scholarshipRequest);
  } catch (error) {
    console.error("[SCHOLARSHIP_REQUEST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

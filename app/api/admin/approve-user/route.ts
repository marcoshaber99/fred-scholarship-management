import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user || user.role !== "ADMIN" || !user.isApproved) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { userId } = await req.json();

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { isApproved: true },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[APPROVE_USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user || user.role !== "ADMIN" || !user.isApproved) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const pendingUsers = await db.user.findMany({
      where: {
        isApproved: false,
        role: {
          in: ["ADMIN", "MANAGER"],
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(pendingUsers);
  } catch (error) {
    console.error("[PENDING_USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

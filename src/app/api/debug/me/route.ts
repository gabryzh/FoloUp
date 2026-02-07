import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { userId, orgId } = auth();
    const user = await currentUser();
    return NextResponse.json({ userId, orgId, user });
}

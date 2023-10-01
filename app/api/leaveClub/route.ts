import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

import getDb from "@/helpers/getDb";
const { db } = getDb();

export async function DELETE(request: Request) {
  const body = await request.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.oneOrNone(`SELECT * FROM users WHERE id = $1`, body.id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.sub !== session.user.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Delete the user
  const res = await db.none(`DELETE FROM "users" WHERE id = $1`, body.id);

  return NextResponse.json({ deleted: true });
}

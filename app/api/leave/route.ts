import { NextResponse } from "next/server";

import getDb from "@/helpers/getDb";
const { db } = getDb();

export async function POST(request: Request) {
  const body = await request.json();

  const user = await db.oneOrNone(
    `SELECT * FROM users WHERE sub = $1`,
    body.sub
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Delete the user from the session
  const res = await db.none(
    `DELETE FROM sessions_users WHERE "session" = $1 AND "user" = $2`,
    [body.id, user.id]
  );

  return NextResponse.json({ success: true });
}

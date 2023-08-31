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

  const res = await db.one(
    `INSERT INTO sessions_users ("session", "user") VALUES ($1, $2) RETURNING *`,
    [body.id, user.id]
  );

  return NextResponse.json(res);
}

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import getDb from "@/helpers/getDb";
const { db } = getDb();

export async function POST(request: Request) {
  const body = await request.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.oneOrNone(
    `SELECT * FROM users WHERE sub = $1`,
    (session.user as any).sub
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const res = await db.one(
    `INSERT INTO "problems" ("problem", "user") VALUES ($1, $2) RETURNING *`,
    [body.problem, user.id]
  );

  return NextResponse.json(res);
}

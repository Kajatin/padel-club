import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

import getDb from "@/helpers/getDb";
const { db } = getDb();

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const user = await db.oneOrNone(
    `SELECT * FROM users WHERE sub = $1`,
    (session.user! as any).sub
  );

  console.log(user);

  const res = await db.one(
    `INSERT INTO orders ("user", size) VALUES ($1, $2) RETURNING *`,
    [user.id, body.size]
  );

  return NextResponse.json(res);
}

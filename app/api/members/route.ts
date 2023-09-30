import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

import getDb from "@/helpers/getDb";
const { db } = getDb();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await db.any(
    `SELECT id, name, avatar FROM users ORDER BY created`
  );

  return NextResponse.json(res);
}

export interface Member {
  id: number;
  name: string;
  avatar: string | null;
}

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import getDb from "@/helpers/getDb";
const { db } = getDb();

export async function PUT(request: Request) {
  const body = await request.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.oneOrNone(
    `SELECT * FROM users WHERE sub = $1`,
    session.user.sub
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const newSession = await db.one(
    `INSERT INTO sessions (title, start, duration, location, price, booked, private, host)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
    [
      body.title,
      body.start,
      body.duration,
      body.location,
      body.price,
      body.booked,
      body.private,
      user.id,
    ]
  );

  // Add participants to the session
  await Promise.all(
    body.participants.map(async (participant: any) => {
      // Send email to participant
      // TODO: Send email to participant (https://www.kirandev.com/next-js-react-email-sending)

      await db.none(
        `INSERT INTO sessions_users (session, "user")
            VALUES ($1, $2)`,
        [newSession.id, participant]
      );
    })
  );

  return NextResponse.json(newSession);
}

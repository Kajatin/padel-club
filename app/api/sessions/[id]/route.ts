import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

import getDb from "@/helpers/getDb";
const { db } = getDb();

export async function POST(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;
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

  const updatedSession = await db.one(
    `UPDATE sessions
      SET title = $1, start = $2, duration = $3, location = $4, price = $5, booked = $6, private = $7
      WHERE id = $8
      RETURNING *`,
    [
      body.title,
      body.start,
      body.duration,
      body.location,
      body.price,
      body.booked,
      body.private,
      id,
    ]
  );

  const currentParticipants = await db.any(
    `SELECT "user" FROM sessions_users WHERE session = $1`,
    id
  );

  // Add participants to the session
  await Promise.all(
    body.participants.map(async (participant: any) => {
      // Send email to participant
      // TODO: Send email to participant (https://www.kirandev.com/next-js-react-email-sending)

      if (
        !currentParticipants.find(
          (currentParticipant: any) => currentParticipant.user === participant
        )
      ) {
        await db.none(
          `INSERT INTO sessions_users (session, "user")
              VALUES ($1, $2)`,
          [id, participant]
        );
      }
    })
  );

  // Remove participants from the session
  await Promise.all(
    currentParticipants.map(async (currentParticipant: any) => {
      if (
        !body.participants.find(
          (participant: any) => participant === currentParticipant.user
        )
      ) {
        await db.none(
          `DELETE FROM sessions_users WHERE session = $1 AND "user" = $2`,
          [id, currentParticipant.user]
        );
      }
    })
  );

  return NextResponse.json(updatedSession);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;

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

  const currentParticipants = await db.any(
    `SELECT "user" FROM sessions_users WHERE session = $1`,
    id
  );

  // Remove participants from the session
  await Promise.all(
    currentParticipants.map(async (currentParticipant: any) => {
      await db.none(
        `DELETE FROM sessions_users WHERE session = $1 AND "user" = $2`,
        [id, currentParticipant.user]
      );
    })
  );

  await db.none(`DELETE FROM sessions WHERE id = $1`, id);

  return NextResponse.json({ message: "Session deleted" });
}

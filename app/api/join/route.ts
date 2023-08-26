import { NextResponse } from "next/server";

import pb from "@/helpers/pocketbase";

export async function POST(request: Request) {
  const body = await request.json();

  const authData = await pb.collection("sessions").update(body.sessionId, {
    "participants+": body.user,
  });

  return NextResponse.json(authData);
}

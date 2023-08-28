import { NextResponse } from "next/server";

import pb from "@/helpers/pocketbase";

export async function POST(request: Request) {
  const body = await request.json();

  const authData = await pb.collection("sessions").update(body.id, {
    "participants+": body.userId,
  });

  return NextResponse.json(authData);
}

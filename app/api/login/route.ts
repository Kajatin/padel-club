import { NextResponse } from "next/server";

import pb from "@/helpers/pocketbase";

export async function POST(request: Request) {
  const body = await request.json();

  const authData = await pb
    .collection("users")
    .authWithPassword(body.email, body.password);

  return NextResponse.json(authData);
}

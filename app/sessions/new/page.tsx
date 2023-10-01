"use client";

import { useState } from "react";

import SessionForm from "./form";
import Navigation from "@/app/navigation";

export default function NewSession() {
  const [session, setSession] = useState({
    title: "Padel session",
    start: new Date(),
    duration: 60,
    location: "",
    price: 180,
    booked: false,
    private: false,
    participants: [] as number[],
  });

  return (
    <div className="flex flex-col gap-2 max-w-xl w-full">
      <Navigation />

      <div className="flex flex-row justify-between items-center mb-10">
        <div className="text-4xl text-yellow-400 font-bold">Create session</div>
      </div>

      <SessionForm session={session} setSession={setSession} edit={false} />
    </div>
  );
}

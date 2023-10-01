"use client";

import { useState } from "react";

import { SessionForm } from "../new/page";

export default function EditSession(props: { session: any }) {
  const { session } = props;

  const [sessionEdit, setSessionEdit] = useState({
    id: session.id,
    title: session.title,
    start: session.start,
    duration: session.duration,
    location: session.location,
    price: session.price,
    booked: session.booked,
    private: session.private,
    participants: session.participants.map((p: any) => p.id),
  });

  return (
    <SessionForm
      session={sessionEdit}
      setSession={setSessionEdit}
      edit={true}
    />
  );
}

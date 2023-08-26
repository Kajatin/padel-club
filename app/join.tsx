"use client";

import { Session } from "./events";

export default function JoinButton(props: {
  session: Session;
  sessionFull: boolean;
  sessionInPast: boolean;
}) {
  const { session, sessionFull, sessionInPast } = props;

  if (sessionInPast) return null;

  return (
    <button
      onClick={() => {
        if (sessionFull) return;

        alert("You joined the session!");
      }}
      className={
        "flex flex-row gap-2 items-center border-2 border-slate-800 px-4 py-2 rounded w-fit " +
        (sessionFull ? "" : "hover:bg-slate-800")
      }
      disabled={sessionFull}
    >
      {sessionFull ? (
        <p>Session full</p>
      ) : (
        <>
          <p className="font-medium">Join</p>
          <div className="text-sm border border-slate-800 rounded px-1 bg-slate-800">
            {session.price} DKK
          </div>
        </>
      )}
    </button>
  );
}

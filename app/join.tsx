"use client";

import { useRouter } from "next/navigation";

export default function JoinButton(props: {
  session: any;
  sessionFull: boolean;
  sessionInPast: boolean;
}) {
  const { session, sessionFull, sessionInPast } = props;
  const router = useRouter();

  if (sessionInPast) return null;

  return (
    <button
      onClick={() => {
        if (sessionFull) return;

        router.push(`/sessions/${session.id}`);
      }}
      className={
        "flex flex-row gap-2 items-center border-2 border-slate-800 px-4 py-2 rounded w-full sm:w-fit " +
        (sessionFull ? "" : "hover:bg-slate-800")
      }
      disabled={sessionFull}
    >
      {sessionFull ? (
        <div className="font-medium">Session full</div>
      ) : (
        <>
          <div className="font-medium">Join</div>
          <div className="text-sm border border-slate-800 rounded px-1 bg-slate-800">
            {session.price} DKK
          </div>
        </>
      )}
    </button>
  );
}

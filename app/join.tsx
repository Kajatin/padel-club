"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export default function JoinButton(props: {
  session: number;
  participants: any[];
}) {
  const { session, participants } = props;
  const router = useRouter();

  const [userSession, setUserSession] = useState<(Session | any) | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setUserSession(session);
    };
    fetchSession();
  }, []);

  const tentative = participants?.find(
    (participant) =>
      participant.sub === userSession?.user.sub && participant.tentative
  );
  const alreadyJoined = participants?.find(
    (participant) => participant.sub === userSession?.user.sub && !tentative
  );

  if (!userSession) return null;

  if (tentative) {
    return (
      <div className="flex flex-row gap-2">
        <button
          onClick={() => {
            if (userSession === null) return;

            fetch("/api/leave", {
              method: "POST",
              body: JSON.stringify({ sub: userSession.user.sub, id: session }),
            }).then(async (res) => {
              if (res.ok) {
                router.refresh();
              }
            });
          }}
          className="flex flex-row gap-2 items-center justify-center border-2 border-slate-800 px-4 py-2 rounded w-full sm:w-fit hover:bg-slate-800 transition-all"
        >
          <div className="font-medium">Decline</div>
        </button>
        <button
          onClick={() => {
            if (userSession === null) return;

            fetch("/api/join", {
              method: "POST",
              body: JSON.stringify({ sub: userSession.user.sub, id: session }),
            }).then(async (res) => {
              if (res.ok) {
                router.refresh();
              }
            });
          }}
          className="flex flex-row gap-2 items-center justify-center border-2 border-slate-800 px-4 py-2 rounded w-full sm:w-fit hover:bg-slate-800 transition-all"
        >
          <div className="font-medium">Accept</div>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        if (userSession === null) return;

        fetch(alreadyJoined ? "/api/leave" : "/api/join", {
          method: "POST",
          body: JSON.stringify({ sub: userSession.user.sub, id: session }),
        }).then(async (res) => {
          if (res.ok) {
            router.refresh();
          }
        });
      }}
      className="flex flex-row gap-2 items-center justify-center border-2 border-slate-800 px-4 py-2 rounded w-full sm:w-fit hover:bg-slate-800 transition-all"
    >
      <div className="font-medium">{alreadyJoined ? "Cancel" : "Join"}</div>
    </button>
  );
}

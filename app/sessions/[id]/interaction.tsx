"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import MobilePay from "./mobilepay";

export default function Interaction(props: {
  id: string;
  session: any;
  sessionFull: boolean;
}) {
  const { id, session, sessionFull } = props;

  const router = useRouter();

  const [userSession, setUserSession] = useState<(Session | any) | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setUserSession(session);
    };
    fetchSession();
  }, []);

  if (!userSession) return null;

  return (
    <>
      <div className="flex flex-col gap-2 border-t-2 border-slate-800 pt-3">
        {sessionFull ? (
          <div>This session is already full. Please join on another one.</div>
        ) : (
          <div className="flex flex-row gap-2 justify-between items-center">
            <div>
              Please send{" "}
              <div className="inline border border-slate-300 text-slate-300 rounded px-1">
                {session.price} DKK
              </div>{" "}
              to <span className="text-slate-300">20 73 00 65</span> to join the
              session. This is to cover the court and equipment rental.
            </div>
            <MobilePay />
          </div>
        )}

        <button
          onClick={() => {
            if (sessionFull || userSession === null) return;

            fetch("/api/join", {
              method: "POST",
              body: JSON.stringify({ sub: userSession.user.sub, id }),
            }).then(async (res) => {
              if (res.ok) {
                const data = await res.json();

                router.replace(`/`);
              }
            });
          }}
          className={
            "flex flex-row gap-2 items-center border-2 border-slate-800 px-4 py-2 rounded w-full font-medium justify-center " +
            (sessionFull ? "" : "hover:bg-slate-800")
          }
          disabled={sessionFull}
        >
          {sessionFull ? "Session full" : "Join"}
        </button>
      </div>
    </>
  );
}

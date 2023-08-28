"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { RecordModel } from "pocketbase";

import Login from "./login";
import Signup from "./signup";
import MobilePay from "./mobilepay";

export default function Interaction(props: {
  id: string;
  session: RecordModel;
  sessionFull: boolean;
}) {
  const { id, session, sessionFull } = props;

  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);

  return (
    <>
      {userId !== null ? (
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
                to <span className="text-slate-300">20 73 00 65</span> to join
                the session. This is to cover the court and equipment rental.
              </div>
              <MobilePay />
            </div>
          )}

          <button
            onClick={() => {
              if (sessionFull || userId === null) return;

              fetch("/api/join", {
                method: "POST",
                body: JSON.stringify({ userId, id }),
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
      ) : (
        <div className="flex flex-col gap-2 border-t-2 border-slate-800 pt-3">
          <p>You need to log in before you can join the session.</p>
          <Login setUserId={setUserId} />
          <Signup />
        </div>
      )}
    </>
  );
}

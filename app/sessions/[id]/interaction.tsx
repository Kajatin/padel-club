"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import MobilePay from "./mobilepay";

export default function Interaction(props: { id: string; session: any }) {
  const { id, session } = props;

  const router = useRouter();

  const [userSession, setUserSession] = useState<(Session | any) | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setUserSession(session);
    };
    fetchSession();
  }, []);

  const member = session.participants?.find(
    (participant: any) => participant.sub === userSession?.user.sub
  );
  const paid = member?.paid;

  if (!userSession || !member) return null;

  if (paid) {
    return (
      <>
        <div className="flex flex-col gap-2 border-t-2 border-slate-800 mt-2">
          <div className="flex flex-row gap-2 justify-between items-center">
            <div>
              <b>Thank you!</b> You have already paid for this session. See you
              on the next one.
            </div>
            <MobilePay />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 border-t-2 border-slate-800 mt-2">
        <div className="flex flex-row gap-2 justify-between items-center">
          <div>
            Please send{" "}
            <div className="inline border border-slate-300 text-slate-300 rounded px-1">
              {session.price / session.participants.length} DKK
            </div>{" "}
            to <span className="text-slate-300">20 73 00 65</span> to cover the
            court and equipment rental.
          </div>
          <MobilePay />
        </div>

        <button
          onClick={() => {
            if (userSession === null) return;

            fetch("/api/pay", {
              method: "POST",
              body: JSON.stringify({ sub: userSession.user.sub, id }),
            }).then(async (res) => {
              if (res.ok) {
                router.refresh();
              }
            });
          }}
          className="flex flex-row gap-2 items-center border-2 border-slate-800 px-4 py-2 rounded w-full font-medium justify-center hover:bg-slate-800 transition-all"
        >
          <div className="font-medium">Confirm payment</div>
        </button>
      </div>
    </>
  );
}

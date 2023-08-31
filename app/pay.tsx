"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export default function PayButton(props: {
  session: number;
  participants: any[];
  price: number;
}) {
  const { session, participants, price } = props;
  const router = useRouter();

  const [userSession, setUserSession] = useState<(Session | any) | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setUserSession(session);
    };
    fetchSession();
  }, []);

  const member = participants?.find(
    (participant) => participant.sub === userSession?.user.sub
  );
  const paid = member?.paid;

  if (!userSession || !member || paid) return null;

  return (
    <button
      onClick={() => {
        if (!userSession || !member || paid) {
          return;
        }

        router.push(`/sessions/${session}`);
      }}
      className="flex flex-row gap-2 items-center border-2 border-slate-800 px-4 py-2 rounded w-full sm:w-fit hover:bg-slate-800"
    >
      <div className="font-medium">Pay</div>
      <div className="inline border border-slate-400 text-slate-400 rounded text-sm px-1 py-0.5">
        {price} DKK
      </div>
    </button>
  );
}

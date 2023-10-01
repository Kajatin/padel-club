"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export default function EditButton(props: { session: number }) {
  const { session } = props;
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
    <button
      onClick={() => {
        if (userSession === null) return;

        router.push(`/sessions/${session}`);
      }}
      className="flex flex-row gap-2 items-center justify-center border-2 border-slate-800 px-4 py-2 rounded w-full sm:w-fit hover:bg-slate-800 transition-all"
    >
      <div className="font-medium">Edit</div>
    </button>
  );
}

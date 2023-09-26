"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import { generateMonogram, stringToColor } from "@/helpers/utils";

export default function Hero() {
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  const username = session?.user?.name || "";
  const sub = session?.user?.sub || "";

  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
      <div className="text-5xl text-yellow-400 font-bold">Padel Club</div>

      <Link href="/merch" className="text-slate-400 font-medium transition-all">
        <div className="hover:underline">MERCH</div>
      </Link>

      {session === null ? (
        <Link
          href="/api/auth/signin?callbackUrl=%2F"
          className="flex flex-row w-fit gap-1 items-center text-slate-400 font-medium transition-all"
        >
          <div className="hover:underline">Sign in</div>
        </Link>
      ) : (
        <div className="flex flex-row-reverse sm:flex-row gap-2 justify-end items-center">
          <button
            onClick={() => signOut()}
            className="flex flex-row w-fit gap-1 items-center text-slate-400 font-medium transition-all"
          >
            <div className="hover:underline">Sign out</div>
          </button>

          <Link
            href={`/users/${sub}`}
            className="hover:scale-105 transition-all"
          >
            {session?.user?.image ? (
              <Image
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
                src={session.user.image}
                alt={username}
              />
            ) : (
              <div
                className="flex w-8 h-8 rounded-full font-medium items-center justify-center"
                style={{
                  backgroundColor: stringToColor(username),
                }}
              >
                {generateMonogram(username)}
              </div>
            )}
          </Link>
        </div>
      )}
    </div>
  );
}

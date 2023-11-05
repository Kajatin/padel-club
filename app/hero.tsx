"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
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

      {session === null ? (
        <Link
          href="/api/auth/signin?callbackUrl=%2F"
          className="flex flex-row w-fit gap-1 items-center text-slate-400 font-medium transition-all"
        >
          <div className="hover:text-slate-300">Sign in</div>
        </Link>
      ) : (
        <div className="flex flex-row gap-3 items-center">
          <Link href="/merch" className="uppercase hover:underline">
            Merch
          </Link>

          <div className="opacity-70">|</div>

          <Link
            href={`/users/${sub}`}
            className="flex flex-row gap-2 items-center transition-all"
          >
            <div className="uppercase hover:underline">Profile</div>

            {session?.user?.image ? (
              <Image
                width={32}
                height={32}
                className="h-8 w-8 rounded-full hover:scale-105"
                src={session.user.image}
                alt={username}
              />
            ) : (
              <div
                className="flex w-8 h-8 rounded-full font-medium items-center justify-center hover:scale-105"
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

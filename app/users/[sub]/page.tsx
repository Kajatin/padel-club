import Image from "next/image";

import moment from "moment";
import { getServerSession } from "next-auth/next";

import Actions from "./actions";
import { generateMonogram, stringToColor } from "@/helpers/utils";

import Navigation from "../../navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import getDb from "@/helpers/getDb";
const { db } = getDb();

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function UserProfile({
  params,
}: {
  params: { sub: string };
}) {
  const { sub } = params;

  const session = await getServerSession(authOptions);

  const user = await db.one(
    "SELECT id, name, avatar, created, sub FROM users WHERE sub = $1",
    sub
  );

  if ((session?.user as any).sub !== user.sub) {
    return (
      <div className="flex flex-col gap-2 max-w-md w-full">
        <Navigation />
        <div className="text-lg mt-10">
          You don&apos;t have access to this page. ⛔️
        </div>
      </div>
    );
  }

  const numSessions = await db.one(
    `SELECT COUNT(*) FROM sessions_users WHERE "user" = $1`,
    user.id
  );

  return (
    <div className="flex flex-col gap-2 max-w-md w-full">
      <Navigation />

      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="text-4xl text-yellow-400 font-bold">{user.name}</div>
          <div className="text-lg">
            Joined {moment(user.created).format("LL")}
          </div>
        </div>

        {user.avatar ? (
          <Image
            width={96}
            height={96}
            className="h-24 w-24 rounded-full"
            src={user.avatar}
            alt={user.name}
          />
        ) : (
          <div
            className="flex w-24 h-24 rounded-full font-medium items-center justify-center"
            style={{ backgroundColor: stringToColor(user.name) }}
          >
            {generateMonogram(user.name)}
          </div>
        )}
      </div>

      {numSessions.count > 0 ? (
        <div className="text-lg mt-14">
          You&apos;ve been part of{" "}
          <div className="inline-flex text-2xl px-1 text-yellow-400 font-medium animate-bounce">
            {numSessions.count}
          </div>{" "}
          sessions. Way to go! 🥳
        </div>
      ) : (
        <div>
          <div className="text-lg mt-10">
            You haven&apos;t been part of any sessions yet. 😢
          </div>
        </div>
      )}

      <Actions userId={user.id} />
    </div>
  );
}

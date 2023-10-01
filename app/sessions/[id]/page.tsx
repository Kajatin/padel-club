import moment from "moment";

import PaySession from "./pay";
import Navigation from "@/app/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import getDb from "@/helpers/getDb";
import EditSession from "./edit";
const { db } = getDb();

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function SessionJoin({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const userSession = await getServerSession(authOptions);

  const session = await db.task(async (t) => {
    const session = await t.one(
      `SELECT * from sessions
      WHERE id = $1 AND (
        private = false OR (
          host = $2 OR id IN (
            SELECT session FROM sessions_users
            WHERE "user" = $2
          )
        )
      )`,
      [id, userSession?.user?.id]
    );

    if (!session) return null;

    const participants = await t.any(
      `SELECT u.id, u.name, u.avatar, u.sub, su.paid, su.tentative FROM sessions_users su
      INNER JOIN users u ON su.user = u.id
      WHERE su.session = $1
      ORDER BY su.created ASC`,
      [session.id]
    );

    const host = await t.oneOrNone(
      `SELECT id, name, avatar FROM users
          WHERE id = $1`,
      [session.host]
    );

    return { ...session, participants, host };
  });

  if (!session)
    return (
      <div className="flex flex-col gap-2 max-w-xl w-full">
        <Navigation />

        <h1 className="text-3xl text-slate-400 font-medium">Unavailable</h1>

        <div>You don&apos;t have access to this session.</div>
      </div>
    );

  const sessionInPast = moment(session.start).isBefore(moment());

  if (sessionInPast) {
    return <PaySession id={id} session={session} />;
  }

  if (userSession?.user.id !== session.host.id)
    return (
      <div className="flex flex-col gap-2 max-w-xl w-full">
        <Navigation />

        <h1 className="text-3xl text-slate-400 font-medium">Unavailable</h1>

        <div>You can&apos;t edit this session. Contact the host.</div>
      </div>
    );

  return (
    <div className="flex flex-col gap-2 max-w-xl w-full">
      <Navigation />

      <h1 className="text-3xl text-slate-400 font-medium mb-10">
        Edit session
      </h1>

      <EditSession session={session} />
    </div>
  );
}

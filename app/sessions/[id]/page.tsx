import moment from "moment";

import Address from "@/app/address";
import { Participants } from "@/app/events";
import Interaction from "./interaction";

import getDb from "@/helpers/getDb";
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

  const session = await db.task(async (t) => {
    const session = await t.one("SELECT * from sessions WHERE id = $1", id);

    const participants = await t.any(
      `SELECT u.name, u.avatar, u.sub, su.paid FROM sessions_users su
      INNER JOIN users u ON su.user = u.id
      WHERE su.session = $1
      ORDER BY su.created ASC`,
      [session.id]
    );

    return { ...session, participants };
  });

  const sessionInPast = moment(session.start).isBefore(moment());

  return (
    <div className="flex flex-col gap-2 max-w-md w-full">
      <h1 className="text-3xl text-slate-400 font-medium">Pay for session</h1>

      <div className="flex flex-col gap-1">
        <h2 className="text-xl text-slate-400 font-medium">{session.title}</h2>

        <Participants participants={session.participants} />

        <div className="flex flex-row gap-2 mt-2">
          {sessionInPast ? (
            <p className="bg-slate-400 text-slate-900 text-sm px-1 py-0.5 rounded">
              expired
            </p>
          ) : (
            <p
              className={
                "text-sm font-medium px-1 py-0.5 rounded " +
                (session.booked
                  ? "bg-yellow-400 text-yellow-900"
                  : "text-yellow-400 border border-yellow-400")
              }
            >
              {session.booked ? "booked" : "scheduled"}
            </p>
          )}
          <div className="inline border border-slate-400 text-slate-400 rounded text-sm px-1 py-0.5">
            {session.price} DKK
          </div>
          <p className="inline border border-slate-400 text-slate-400 rounded text-sm px-1 py-0.5">
            {session.duration} min
          </p>
        </div>

        <div>{moment(session.start).format("LLLL")}</div>

        <Address address={session.location} />
      </div>

      <Interaction id={id} session={session} />
    </div>
  );
}

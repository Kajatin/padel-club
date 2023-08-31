import Image from "next/image";

import moment from "moment";

import PayButton from "./pay";
import JoinButton from "./join";
import Address from "./address";
import { generateMonogram, stringToColor } from "@/helpers/utils";

import getDb from "@/helpers/getDb";
const { db } = getDb();

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default function Events() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-slate-400 font-medium">Sessions</h1>
      <p>Join us on our next session!</p>
      {/* @ts-expect-error Server Component */}
      <Sessions />
    </div>
  );
}

async function Sessions() {
  const sessions = await db.task(async (t) => {
    const sessions = await t.any("SELECT * FROM sessions");

    const sessionsWithParticipants = await Promise.all(
      sessions.map(async (session: any) => {
        const participants = await t.any(
          `SELECT u.name, u.avatar, u.sub, su.paid FROM sessions_users su
          INNER JOIN users u ON su.user = u.id
          WHERE su.session = $1
          ORDER BY su.created ASC`,
          [session.id]
        );

        return { ...session, participants };
      })
    );

    return sessionsWithParticipants;
  });

  return (
    <div className="flex flex-col divide-y-2 divide-slate-800">
      {sessions.map((session) => (
        <Session key={session.id} session={session} />
      ))}
    </div>
  );
}

function Session({ session }: { session: any }) {
  const sessionInPast = moment(session.start).isBefore(moment());

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 py-4 sm:py-2">
      <div
        className={"flex flex-col gap-1 " + (sessionInPast ? "opacity-70" : "")}
      >
        <h2 className="text-xl text-slate-400 font-medium">{session.title}</h2>

        <Participants participants={session.participants} />

        <div className="flex flex-row gap-2">
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

        {!sessionInPast && <Address address={session.location} />}
      </div>

      {!sessionInPast && (
        <JoinButton session={session.id} participants={session.participants} />
      )}
      {sessionInPast && (
        <PayButton
          session={session.id}
          participants={session.participants}
          price={session.price / session.participants.length}
        />
      )}
    </div>
  );
}

export function Participants({ participants }: { participants: any }) {
  return (
    <div
      className={
        "flex flex-row gap-2 items-center " +
        (participants.length > 0 && "mb-2")
      }
    >
      {participants.map((participant: any) => {
        return (
          <>
            {participant.avatar ? (
              <Image
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
                src={participant.avatar}
                alt={participant.name}
              />
            ) : (
              <div
                className="flex w-8 h-8 rounded-full font-medium items-center justify-center"
                style={{ backgroundColor: stringToColor(participant.name) }}
              >
                {generateMonogram(participant.name)}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}

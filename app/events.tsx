import Link from "next/link";
import Image from "next/image";

import moment from "moment";

import PayButton from "./pay";
import EditButton from "./edit";
import JoinButton from "./join";
import Address from "./address";
import LocalTime from "./components/localtime";
import { generateMonogram, stringToColor } from "@/helpers/utils";

import { Session, getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

import getDb from "@/helpers/getDb";
const { db } = getDb();

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default function Events() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-baseline">
        <h1 className="text-3xl text-slate-400 font-medium">Sessions</h1>
        <Link href="/sessions/new">
          <div className="text-slate-400 hover:text-slate-300">Create</div>
        </Link>
      </div>
      {/* @ts-expect-error Server Component */}
      <Sessions />
    </div>
  );
}

async function Sessions() {
  const userSession = await getServerSession(authOptions);

  const sessions = await db.task(async (t) => {
    const sessions = await t.any(
      `SELECT * FROM sessions
      WHERE (
        private = false
        OR (
          host = $1
          OR id IN (
            SELECT session FROM sessions_users
            WHERE "user" = $1
          )
        )
      ) AND (
        start > NOW() - interval '1 month'
        OR id IN (
          SELECT session FROM sessions_users
          WHERE "user" = $1 AND paid = false
        )
      )
      ORDER BY start DESC`,
      [userSession?.user?.id]
    );

    const sessionsWithParticipants = await Promise.all(
      sessions.map(async (session: any) => {
        const participants = await t.any(
          `SELECT u.name, u.avatar, u.sub, su.paid, su.tentative FROM sessions_users su
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
      })
    );

    return sessionsWithParticipants;
  });

  return (
    <div className="flex flex-col divide-y-2 divide-slate-800">
      {sessions.map((session) => (
        <Session key={session.id} session={session} userSession={userSession} />
      ))}
    </div>
  );
}

function Session({
  session,
  userSession,
}: {
  session: any;
  userSession: Session | null;
}) {
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
          {session.private && (
            <p className="inline bg-blue-400 text-blue-900 rounded text-sm px-1 py-0.5">
              private
            </p>
          )}
          <div className="inline border border-slate-400 text-slate-400 rounded text-sm px-1 py-0.5">
            {session.price} DKK
          </div>
          <p className="inline border border-slate-400 text-slate-400 rounded text-sm px-1 py-0.5">
            {session.duration} min
          </p>
        </div>

        <LocalTime event={session} />

        {!sessionInPast && <Address address={session.location} />}

        {session.host && <Host host={session.host} />}
      </div>

      {!sessionInPast && (
        <div className="flex flex-row gap-2">
          {userSession?.user.id === session.host.id && (
            <EditButton session={session.id} />
          )}
          <JoinButton
            session={session.id}
            participants={session.participants}
          />
        </div>
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
          <div
            key={participant.name}
            className={participant.tentative ? "grayscale opacity-70" : ""}
          >
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
          </div>
        );
      })}
    </div>
  );
}

export function Host(props: { host: any }) {
  const { host } = props;

  return (
    <div className="flex flex-row gap-2 items-center text-slate-300">
      <div>Hosted by {host.name}</div>
      {host.avatar ? (
        <Image
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
          src={host.avatar}
          alt={host.name}
        />
      ) : (
        <div
          className="flex w-8 h-8 rounded-full font-medium items-center justify-center"
          style={{ backgroundColor: stringToColor(host.name) }}
        >
          {generateMonogram(host.name)}
        </div>
      )}
    </div>
  );
}

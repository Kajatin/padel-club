import moment from "moment";

import pb from "@/helpers/pocketbase";
import Address from "@/app/address";
import { Participants } from "@/app/events";
import Interaction from "./interaction";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function SessionJoin({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const session = await pb.collection("sessions").getOne(id, {
    expand: "participants",
  });

  const sessionInPast = moment(session.start).isBefore(moment());
  const sessionFull = session.participants.length >= 4;

  return (
    <div className="flex flex-col gap-2 max-w-md w-full">
      <h1 className="text-3xl text-slate-400 font-medium">Join session</h1>

      <div
        className={
          "flex flex-row justify-between items-center gap-4 py-2 " +
          (sessionInPast ? "opacity-70" : "")
        }
      >
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2 items-center">
            <h2 className="text-xl text-slate-400 font-medium">
              {session.title}
            </h2>
            {sessionInPast ? (
              <p className="bg-slate-800 text-sm px-1 py-0.5 rounded">
                expired
              </p>
            ) : (
              <p
                className={
                  "text-sm px-1 py-0.5 rounded " +
                  (session.booked
                    ? "bg-yellow-400 text-yellow-900"
                    : "text-yellow-400 border border-yellow-400")
                }
              >
                {session.booked ? "booked" : "scheduled"}
              </p>
            )}
          </div>

          <Participants participants={session.expand?.participants || []} />

          <div className="flex flex-col sm:flex-row sm:gap-2 items-start sm:items-center">
            <p>{moment(session.start).format("LLLL")}</p>
            <p className="bg-slate-800 px-1 py-0.5 rounded">
              {session.duration} minutes
            </p>
          </div>

          <Address address={session.location} />
        </div>
      </div>

      <Interaction id={id} session={session} sessionFull={sessionFull} />
    </div>
  );
}

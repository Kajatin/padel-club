import moment from "moment";

import pb from "@/helpers/pocketbase";
import Address from "@/app/address";
import { Participants } from "@/app/events";
import Login from "./login";
import MobilePay from "./mobilepay";
import Join from "./join";
import Signup from "./signup";

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
              <p className="bg-yellow-400 text-yellow-900 text-sm px-1 py-0.5 rounded">
                upcoming
              </p>
            )}
          </div>

          <Participants participants={session.expand?.participants || []} />

          <div className="flex flex-row gap-2 items-center">
            <p>{moment(session.start).format("lll")}</p>
            <p className="bg-slate-800 px-1 py-0.5 rounded">
              {session.duration} minutes
            </p>
          </div>

          <Address address={session.location} />
        </div>
      </div>

      {pb.authStore.isValid ? (
        <div className="flex flex-col gap-2 border-t-2 border-slate-800 pt-3">
          {sessionFull ? (
            <div>This session is already full. Please join on another one.</div>
          ) : (
            <div className="flex flex-row gap-2 justify-between items-center">
              <div>
                Please send{" "}
                <div className="inline text-sm border border-slate-800 rounded px-1 bg-slate-800">
                  {session.price} DKK
                </div>
                to <span className="text-slate-300">20 73 00 65</span> to join
                the session. This is to cover the court and equipment rental.
              </div>
              <MobilePay />
            </div>
          )}

          <Join
            user={pb.authStore.model?.id || null}
            sessionId={id}
            sessionFull={sessionFull}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2 border-t-2 border-slate-800 pt-3">
          <p>You need to log in before you can join the session.</p>
          <Login />
          <Signup />
        </div>
      )}
    </div>
  );
}

import moment from "moment";
import Address from "./address";
import { generateMonogram, stringToColor } from "@/helpers/utils";
import JoinButton from "./join";
import pb from "@/helpers/pocketbase";
import { RecordModel } from "pocketbase";

export default function Events() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-slate-400 font-medium">Sessions</h1>
      <p>Join us on our next session!</p>
      <Sessions />
    </div>
  );
}

async function Sessions() {
  const sessions = await pb.collection("sessions").getFullList(10, {
    orderBy: "start",
    order: "desc",
    expand: "participants",
  });

  return (
    <div className="flex flex-col divide-y-2 divide-slate-800">
      {sessions.map((session) => (
        <Session key={session.id} session={session} />
      ))}
    </div>
  );
}

function Session({ session }: { session: RecordModel }) {
  const sessionInPast = moment(session.start).isBefore(moment());
  const sessionFull = session.participants.length >= 4;

  return (
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
            <p className="bg-slate-800 text-sm px-1 py-0.5 rounded">expired</p>
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

      <JoinButton
        session={session}
        sessionFull={sessionFull}
        sessionInPast={sessionInPast}
      />
    </div>
  );
}

function Participants({ participants }: { participants: any }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      {participants.map((participant: any) => {
        const avatar = pb.files.getUrl(participant, participant.avatar);

        return (
          <>
            {avatar ? (
              <img
                className="h-8 w-8 rounded-full"
                src={avatar}
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

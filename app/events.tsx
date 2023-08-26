import moment from "moment";
import Address from "./address";
import { Member } from "./members";
import { generateMonogram, stringToColor } from "@/helpers/utils";
import JoinButton from "./join";

export default function Events() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-slate-400 font-medium">Sessions</h1>
      <p>Join us on our next session!</p>
      <Sessions />
    </div>
  );
}

export interface Session {
  title: string;
  start: string;
  duration: number;
  participants: Member[];
  location: string;
  price: number;
}

function Sessions() {
  const sessions: Session[] = [
    {
      title: "Padel session",
      start: "2023-08-27T07:00:00Z",
      duration: 60,
      participants: [
        {
          name: "John Doe",
          avatar:
            "https://storage.jewheart.com/content/users/avatars/3746/avatar_3746_500.jpg?1558628223",
          joined: "2021-05-01T10:00:00Z",
        },
        {
          name: "Jane Doe",
          avatar: null,
          joined: "2021-05-01T10:00:00Z",
        },
        {
          name: "Jane Doe",
          avatar: null,
          joined: "2021-05-01T10:00:00Z",
        },
      ],
      location: "Match Padel, Kløvermarksvej 70, 2300 København",
      price: 89,
    },
    {
      title: "Padel session",
      start: "2021-05-01T10:00:00Z",
      duration: 60,
      participants: [
        {
          name: "Luís Silva",
          avatar: null,
          joined: "2021-05-01T10:00:00Z",
        },
        {
          name: "Julius Breitenstein",
          avatar: null,
          joined: "2021-05-01T10:00:00Z",
        },
      ],
      location: "Padel Club",
      price: 10,
    },
    {
      title: "Padel session",
      start: "2021-05-01T10:00:00Z",
      duration: 60,
      participants: [
        {
          name: "John Doe",
          avatar:
            "https://storage.jewheart.com/content/users/avatars/3746/avatar_3746_500.jpg?1558628223",
          joined: "2021-05-01T10:00:00Z",
        },
        {
          name: "Jane Doe",
          avatar:
            "https://storage.jewheart.com/content/users/avatars/3746/avatar_3746_500.jpg?1558628223",
          joined: "2021-05-01T10:00:00Z",
        },
      ],
      location: "Padel Club",
      price: 10,
    },
  ];

  return (
    <div className="flex flex-col divide-y-2 divide-slate-800">
      {sessions.map((session) => (
        <Session session={session} />
      ))}
    </div>
  );
}

function Session({ session }: { session: Session }) {
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

        <Participants participants={session.participants} />

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

function Participants({ participants }: { participants: Member[] }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      {participants.map((participant) => (
        <>
          {participant.avatar ? (
            <img
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
      ))}
    </div>
  );
}

import { generateMonogram, stringToColor } from "@/helpers/utils";

export default function Members() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-slate-400 font-medium">Members</h1>
      <MembersList />
    </div>
  );
}

export interface Member {
  name: string;
  avatar: string | null;
  joined: string;
}

function MembersList() {
  const members: Member[] = [
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
    {
      name: "Luís Silva",
      avatar: null,
      joined: "2021-05-01T10:00:00Z",
    },
    {
      name: "Luís Silva",
      avatar: null,
      joined: "2021-05-01T10:00:00Z",
    },
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
    {
      name: "Julius Breitenstein",
      avatar: null,
      joined: "2021-05-01T10:00:00Z",
    },
  ];

  return (
    <div className="flex flex-row flex-wrap justify-around gap-6 py-2">
      {members.map((member) => (
        <div className="flex flex-col items-center gap-2">
          {member.avatar ? (
            <img
              className="h-24 w-24 rounded-full"
              src={member.avatar}
              alt={member.name}
            />
          ) : (
            <div
              className="flex w-24 h-24 rounded-full font-medium text-2xl items-center justify-center"
              style={{ backgroundColor: stringToColor(member.name) }}
            >
              {generateMonogram(member.name)}
            </div>
          )}
          <p className="text-lg">{member.name}</p>
        </div>
      ))}
    </div>
  );
}

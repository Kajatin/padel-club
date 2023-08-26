import pb from "@/helpers/pocketbase";
import { generateMonogram, stringToColor } from "@/helpers/utils";

export default function Members() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-slate-400 font-medium">Members</h1>
      <MembersList />
    </div>
  );
}

async function MembersList() {
  const members = await pb.collection("users").getList(1, 500);

  return (
    <div className="flex flex-row flex-wrap justify-start gap-6 py-2">
      {members.items.map((member) => (
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

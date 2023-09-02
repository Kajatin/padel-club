import Image from "next/image";

import getDb from "@/helpers/getDb";
const { db } = getDb();

import { generateMonogram, stringToColor } from "@/helpers/utils";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default function Members() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-slate-400 font-medium">Members</h1>
      {/* @ts-expect-error Server Component */}
      <MembersList />
    </div>
  );
}

async function MembersList() {
  const members = await db.any(
    "SELECT id, name, avatar FROM users ORDER BY created"
  );

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-evenly items-start gap-6 py-2 px-2 sm:px-0">
      {members.map((member) => {
        return (
          <div
            key={member.id}
            className="flex flex-row sm:flex-col items-center gap-6 sm:gap-2 hover:scale-105 transition-all"
          >
            {member.avatar ? (
              <Image
                width={96}
                height={96}
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
        );
      })}
    </div>
  );
}

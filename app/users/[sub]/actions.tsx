"use client";

import { useRouter } from "next/navigation";

export default function Actions(props: { userId: number }) {
  const { userId } = props;

  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 mt-20 border border-slate-400 p-3 rounded-lg">
      <div className="text-slate-400">Danger zone</div>
      <button
        onClick={() => {
          fetch("/api/leaveClub", {
            method: "DELETE",
            body: JSON.stringify({ id: userId }),
          }).then(async (res) => {
            if (res.ok) {
              router.replace(`/`);
            }
          });
        }}
        className="flex flex-row gap-2 items-center border-2 border-red-500 px-4 py-2 rounded w-full font-medium justify-center hover:bg-red-500 transition-all"
      >
        <div className="font-medium">Leave the club</div>
      </button>
    </div>
  );
}

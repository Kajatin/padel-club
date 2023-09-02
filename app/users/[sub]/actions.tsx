"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Actions(props: { userId: number }) {
  const { userId } = props;

  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="flex flex-col gap-2 mt-10">
      <h1 className="text-3xl text-red-400 font-medium">Delete account</h1>
      <div className="text-slate-400">
        Revoke your membership from the Padel Club. This action removes you from
        all events too.
      </div>
      <div className="text-slate-400 font-medium">
        This action cannot be undone.
      </div>
      <div className="flex flex-row items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="w-5 h-5 sm:w-4 sm:h-4 border border-slate-400 rounded text-red-400"
        />
        <label className={confirmed ? "text-slate-300" : "text-slate-400"}>
          I understand the consequences
        </label>
      </div>
      <button
        onClick={() => {
          if (!confirmed) return;

          fetch("/api/leaveClub", {
            method: "DELETE",
            body: JSON.stringify({ id: userId }),
          }).then(async (res) => {
            if (res.ok) {
              router.replace(`/`);
            }
          });
        }}
        disabled={!confirmed}
        className={
          "flex flex-row gap-2 items-center border-2 border-slate-800 px-4 py-2 rounded w-full font-medium justify-center transition-all " +
          (confirmed ? "hover:bg-slate-800" : "opacity-70")
        }
      >
        <div className="font-medium">Leave the club, delete everything</div>
      </button>
    </div>
  );
}

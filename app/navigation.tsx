"use client";

import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(`/`);
      }}
      className="flex flex-row w-fit gap-1 items-center text-slate-400 font-medium transition-all"
    >
      <div className="material-symbols-outlined scale-125">chevron_left</div>
      <div className="hover:underline">Go back</div>
    </button>
  );
}

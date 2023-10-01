"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      onClick={() => signOut()}
      className="flex flex-row w-fit gap-1 items-center text-slate-400 hover:text-slate-300 font-medium transition-all"
    >
      <div>Sign out</div>
    </button>
  );
}

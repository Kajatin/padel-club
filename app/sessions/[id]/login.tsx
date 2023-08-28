"use client";

import { useState } from "react";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default function Login(props: { setUserId: (userId: string) => void }) {
  const { setUserId } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-slate-300">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-slate-700 bg-slate-800 outline-none rounded px-2 py-1"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-slate-300">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-slate-700 bg-slate-800 outline-none rounded px-2 py-1"
        />
      </label>
      <button
        className="border-2 border-slate-800 px-4 py-2 rounded hover:bg-slate-800"
        onClick={async (e) => {
          e.preventDefault();
          fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
          }).then(async (res) => {
            if (res.ok) {
              const data = await res.json();
              setUserId(data.record.id);
            }
          });
        }}
      >
        Login
      </button>
    </div>
  );
}

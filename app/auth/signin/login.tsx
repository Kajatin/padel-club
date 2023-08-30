"use client";

import { signIn } from "next-auth/react";

export default function Login(props: { providers: any }) {
  const { providers } = props;

  return (
    <div className="flex flex-col gap-10 max-w-xl w-full items-center justify-center">
      <div className="text-5xl text-yellow-400 font-bold">Padel Club</div>
      {Object.values(providers).map((provider: any) => (
        <button
          key={provider.name}
          className="rounded p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-all"
          onClick={() => signIn(provider.id)}
        >
          Sign in with {provider.name}
        </button>
      ))}
    </div>
  );
}

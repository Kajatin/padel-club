"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import { signupHandler } from "./handler";

export const revalidate = 0;

export default function Signup() {
  const formRef = useRef(null);
  const router = useRouter();

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (formRef.current === null) return;

    const data = new FormData(formRef.current);
    const response = await signupHandler(data);

    if (response && response.success) {
      router.replace("/");
    }
  }

  return (
    <div className="flex flex-col gap-2 max-w-md w-full">
      <h1 className="text-3xl text-slate-400 font-medium">Sign up</h1>
      <form
        ref={formRef}
        className="flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-300">Full Name</span>
          <input
            type="name"
            id="name"
            name="name"
            className="border-2 border-slate-700 bg-slate-800 outline-none rounded px-2 py-1"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-300">Email</span>
          <input
            type="email"
            id="email"
            name="email"
            className="border-2 border-slate-700 bg-slate-800 outline-none rounded px-2 py-1"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-300">Password</span>
          <input
            type="password"
            id="password"
            name="password"
            className="border-2 border-slate-700 bg-slate-800 outline-none rounded px-2 py-1"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-300">Avatar</span>
          <input
            type="file"
            id="avatar"
            name="avatar"
            className="outline-none rounded py-1"
          />
        </label>
        <button
          type="submit"
          className="border-2 border-slate-800 px-4 py-2 rounded hover:bg-slate-800"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

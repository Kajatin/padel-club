"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navigation from "../navigation";

export default function Problem() {
  const router = useRouter();
  const [problem, setProblem] = useState("");

  return (
    <div className="flex flex-col gap-2 max-w-xl w-full">
      <Navigation />

      <h1 className="text-3xl text-slate-400 font-medium mb-4">
        Report a problem
      </h1>
      <textarea
        className="border-2 border-slate-800 rounded p-2 bg-transparent !outline-none focus:border-slate-800 focus:ring-0"
        rows={5}
        placeholder="Describe the problem"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
      />
      <button
        className="flex flex-row gap-2 items-center border-2 border-slate-800 px-4 py-2 rounded w-full font-medium justify-center transition-all hover:bg-slate-800"
        onClick={() => {
          fetch("/api/problem", {
            method: "POST",
            body: JSON.stringify({ problem }),
          }).then(async (res) => {
            if (res.ok) {
              router.replace("/");
            }
          });
        }}
      >
        Report
      </button>
    </div>
  );
}

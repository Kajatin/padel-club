"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Navigation from "../navigation";

export default function Hero() {
  const [session, setSession] = useState<any | null>(null);

  const [size, setSize] = useState("large");

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  return (
    <div className="flex flex-col gap-2 max-w-xl w-full">
      <Navigation />

      <div className="flex flex-row justify-between items-center mb-10">
        <div className="flex flex-col gap-2">
          <div className="text-4xl text-yellow-400 font-bold">MERCH</div>
          <div className="text-lg">Now available for purchase!</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center">
        <Image
          width={300}
          height={300}
          className="rounded-lg hover:scale-105 transition-all"
          src="/merch.png"
          alt="Padel Club merch"
        />

        <div className="flex flex-row font-medium items-baseline gap-2 mb-2">
          <div className="text-xl">Padel Club Tee</div>
          <div className="text-slate-400">white</div>
        </div>

        <select
          className="border-2 border-slate-800 px-4 py-2 rounded w-full hover:bg-slate-800 transition-all bg-transparent focus:ring-transparent"
          name="size"
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="xlarge">X-Large</option>
        </select>

        <button
          onClick={() => {
            fetch("/api/order", {
              method: "POST",
              body: JSON.stringify({
                size: "small",
              }),
            }).then(async (res) => {
              if (res.ok) {
                // router.replace(`/`);
              }
            });
          }}
          className="flex flex-row gap-2 items-center border-2 border-slate-800 px-4 py-2 rounded w-full hover:bg-slate-800 transition-all"
        >
          <div className="font-medium">Purchase</div>
          <div className="inline border border-slate-400 text-slate-400 rounded text-sm px-1 py-0.5">
            100 DKK
          </div>
        </button>
      </div>
    </div>
  );
}

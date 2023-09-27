"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import MobilePay from "../../sessions/[id]/mobilepay";

export default function Hero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const size = searchParams.get("size");

  return (
    <div className="flex flex-col gap-2 max-w-xl w-full">
      <button
        onClick={() => {
          router.back();
        }}
        className="flex flex-row w-fit gap-1 items-center text-slate-400 font-medium transition-all"
      >
        <div className="material-symbols-outlined scale-125">chevron_left</div>
        <div className="hover:underline">Go back</div>
      </button>

      <div className="flex flex-row justify-between items-center mb-10">
        <div className="flex flex-col gap-2">
          <div className="text-4xl text-yellow-400 font-bold">MERCH</div>
          <div className="text-lg">Official Padel Club merch!</div>
        </div>
      </div>

      <div className="flex flex-row gap-2 justify-start items-center">
        <Image
          width={100}
          height={100}
          className="rounded-lg hover:scale-105 transition-all"
          src="/merch.png"
          alt="Padel Club merch"
        />

        <div className="flex flex-row font-medium items-baseline gap-2">
          <div className="text-xl">Padel Club Tee</div>
          <div className="text-slate-400">white</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t-2 border-slate-800 mt-2">
        <div className="flex flex-row gap-2 justify-between items-center">
          <div>
            Please send{" "}
            <div className="inline border border-slate-300 text-slate-300 rounded px-1">
              270 DKK
            </div>{" "}
            to <span className="text-slate-300">20 73 00 65</span> to finalize
            your order.
          </div>
          <MobilePay />
        </div>

        <button
          onClick={() => {
            fetch("/api/order", {
              method: "POST",
              body: JSON.stringify({
                size: size,
              }),
            }).then(async (res) => {
              if (res.ok) {
                router.replace(`/`);
              }
            });
          }}
          className="flex flex-row gap-2 items-center border-2 border-slate-800 px-4 py-2 rounded w-full font-medium justify-center hover:bg-slate-800 transition-all"
        >
          <div className="font-medium">Confirm payment</div>
        </button>
      </div>
    </div>
  );
}

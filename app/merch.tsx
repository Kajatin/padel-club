import Link from "next/link";

export default function Merch() {
  return (
    <div className="flex flex-col gap-2">
      <Link
        href="/merch"
        className="flex flex-row gap-2 items-center justify-between border-2 border-slate-800 px-4 py-2 rounded w-full hover:bg-slate-800 transition-all -mb-5"
      >
        <div className="flex flex-row gap-4 items-center">
          <div className="text-sm font-medium px-1 py-0.5 rounded bg-yellow-400 text-yellow-900">
            NEW
          </div>
          <div>Check out the official merchandise</div>
        </div>
        <span className="material-symbols-outlined scale-125">
          chevron_right
        </span>
      </Link>
    </div>
  );
}

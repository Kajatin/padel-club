import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-row justify-between text-slate-400 border-t-2 border-slate-800 pt-3">
      <Link href="/problem" className="hover:underline">
        Report a problem
      </Link>
      <div className="inline-flex items-center gap-1">
        Made with{" "}
        <span className="inline-flex material-symbols-outlined text-yellow-400 rounded-lg self-center">
          favorite
        </span>{" "}
        by{" "}
        <Link
          href="https://github.com/Kajatin/padel-club"
          className="hover:underline"
        >
          Roland Kajatin
        </Link>
      </div>
    </div>
  );
}

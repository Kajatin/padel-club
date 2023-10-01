import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-between text-slate-400 border-t-2 border-slate-800 pt-3">
      <Link href="/problem" className="hover:text-slate-300">
        Report a problem
      </Link>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/Kajatin/padel-club"
        className="inline-flex items-center gap-1 hover:text-slate-300"
      >
        Made with{" "}
        <span className="inline-flex material-symbols-outlined text-yellow-400 rounded-lg self-center">
          favorite
        </span>{" "}
        by Roland Kajatin
      </a>
    </div>
  );
}

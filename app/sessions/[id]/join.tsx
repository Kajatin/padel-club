"use client";

import { useRouter } from "next/navigation";

export default function Join(props: {
  user: string | null;
  sessionId: string;
  sessionFull: boolean;
}) {
  const { user, sessionId, sessionFull } = props;

  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (sessionFull || user === null) return;

        fetch("/api/join", {
          method: "POST",
          body: JSON.stringify({ user, sessionId }),
        }).then(async (res) => {
          if (res.ok) {
            const data = await res.json();

            router.replace(`/`);
          }
        });
      }}
      className={
        "flex flex-row gap-2 items-center border-2 border-slate-800 px-4 py-2 rounded w-full font-medium justify-center " +
        (sessionFull ? "" : "hover:bg-slate-800")
      }
      disabled={sessionFull}
    >
      {sessionFull ? "Session full" : "Join"}
    </button>
  );
}

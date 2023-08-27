"use client";

import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-2">
      <div>Don&apos;t have an account?</div>
      <button
        onClick={() => {
          router.push("/signup");
        }}
        className="text-yellow-400 hover:underline transition-all"
      >
        Sign up
      </button>
    </div>
  );
}

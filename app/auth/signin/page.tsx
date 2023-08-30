import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Login from "./login";

export default async function SignIn({ searchParams }: { searchParams: any }) {
  const session = await getServerSession(authOptions);

  if (session) {
    // if session is valid, redirect
    redirect(`${searchParams?.callbackUrl || "/"}`);
  }

  const providers = await getProviders();

  return (
    <div className="fixed top-0 left-0 z-50 flex justify-center w-screen h-screen">
      <Login providers={providers} />
    </div>
  );
}

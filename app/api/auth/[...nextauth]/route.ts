import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Configure Google provider
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // https://next-auth.js.org/configuration/options#pages
  pages: {
    signIn: "/auth/signin",
    // error: "/auth/error",
  },
  // https://next-auth.js.org/configuration/options#session
  session: {
    maxAge: 4 * 60 * 60, // 4 hours
  },
  // https://next-auth.js.org/configuration/callbacks
  // callbacks: {
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

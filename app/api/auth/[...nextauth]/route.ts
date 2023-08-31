import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import getDb from "@/helpers/getDb";
const { db } = getDb();

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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await db.none(
          `INSERT INTO users (sub, name, email, avatar, verified)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (sub) DO UPDATE SET name = $2, email = $3, avatar = $4, verified = $5`,
          [
            user.id,
            user.name,
            user.email,
            user.image,
            (profile as any).email_verified,
          ]
        );
      } catch (e) {
        console.error("Failed to insert user into database", e);
        return false;
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

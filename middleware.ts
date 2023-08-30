export { default } from "next-auth/middleware";

// Match all routes except /api/auth, /auth, and /public
export const config = {
  matcher: ["/", "/((?!auth|public|api\\/public\\/).*)(.+)"],
};
export { default } from "next-auth/middleware";

// Match all routes except /api/auth, /auth, and /public
export const config = {
  matcher: ["/sessions", "/api", "/users", "/((?!auth).*)(.+)"],
};

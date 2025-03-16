// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"], // Only allow public access to the home page
  ignoredRoutes: [], // Don't ignore any routes (Clerk should check auth everywhere)
});

export const config = {
  matcher: "/((?!_next|api|trpc|static|.*\\..*).*)",
};

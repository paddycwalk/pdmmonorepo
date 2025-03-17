import { createAuthMiddleware } from "@repo/global-functions/Middleware/createAuthMiddleware";

export default createAuthMiddleware({
  protectedRoutes: ["/", "/privacyPolicy"],
  publicRoutes: ["/watchdog", "/maintenance"],
});

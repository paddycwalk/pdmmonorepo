import { createAuthMiddleware } from "@repo/global-functions/Middleware/createAuthMiddleware";

export default createAuthMiddleware({
  protectedRoutes: ["/"],
  publicRoutes: [
    "/login",
    "/forgotPassword",
    "/setNewPassword",
    "/privacyPolicy",
    "/watchdog",
    "/maintenance",
  ],
});

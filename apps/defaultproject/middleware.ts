import { createAuthMiddleware } from "@repo/global-functions/Middleware/createAuthMiddleware";

export default createAuthMiddleware({
  protectedRoutes: ["/dashboard"],
  publicRoutes: ["/login", "/"],
});

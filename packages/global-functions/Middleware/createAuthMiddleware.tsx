import { NextRequest, NextResponse } from "next/server";
import { PORTAL_URL } from "../Config/globalConfig";

export const createAuthMiddleware = ({
  protectedRoutes = [],
  publicRoutes = [],
}: {
  protectedRoutes: string[];
  publicRoutes: string[];
}) => {
  return async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public

    const path = req.nextUrl.pathname;
    // console.log("path", path);
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // 3. Decrypt the session from the cookie
    const cookie = req.cookies.get("token")?.value;
    // console.log("cookie", cookie);
    const session = cookie;

    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session) {
      return NextResponse.redirect(new URL(`${PORTAL_URL}/login`, req.nextUrl));
    }

    // // 5. Redirect to /dashboard if the user is authenticated
    // if (isPublicRoute && session && !req.nextUrl.pathname.startsWith("/login")) {
    //   return NextResponse.redirect(new URL("/", req.nextUrl));
    // }

    // 6. Redirect to /setNewPassword if the user must change the password
    const mustChangePassword = req.cookies.get("isMustChangePassword")?.value;
    if (
      session &&
      mustChangePassword &&
      !req.nextUrl.pathname.startsWith("/setNewPassword")
    ) {
      // return NextResponse.redirect(
      //   new URL(`${PORTAL_URL}/setNewPassword`, req.nextUrl),
      // );
    }
    return NextResponse.next();
  };
};

// Routes Middleware sollte nicht auf diese Pfade angewendet werden
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

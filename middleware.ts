import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = (req.nextauth.token as { role?: string } | undefined)?.role;
    const path = req.nextUrl.pathname;

    const roleMap: Record<string, string[]> = {
      "/dashboard": ["ADMIN", "DOCTOR", "RECEPTIONIST", "LAB_TECH"],
      "/patients": ["ADMIN", "DOCTOR", "RECEPTIONIST"],
      "/doctors": ["ADMIN", "RECEPTIONIST"],
      "/staff": ["ADMIN", "RECEPTIONIST"],
      "/appointments": ["ADMIN", "DOCTOR", "RECEPTIONIST"],
      "/pharmacy": ["ADMIN", "RECEPTIONIST", "LAB_TECH"],
      "/billing": ["ADMIN", "RECEPTIONIST"],
      "/lab": ["ADMIN", "LAB_TECH", "DOCTOR"],
      "/equipment": ["ADMIN", "RECEPTIONIST"],
      "/inpatients": ["ADMIN", "DOCTOR"],
    };

    for (const [prefix, allowed] of Object.entries(roleMap)) {
      if (path.startsWith(prefix) && !allowed.includes(role ?? "")) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token),
    },
    pages: { signIn: "/auth/login" },
  },
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/patients/:path*",
    "/doctors/:path*",
    "/staff/:path*",
    "/appointments/:path*",
    "/pharmacy/:path*",
    "/billing/:path*",
    "/lab/:path*",
    "/equipment/:path*",
    "/inpatients/:path*",
  ],
};

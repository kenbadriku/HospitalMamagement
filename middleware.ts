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
      "/appointments": ["ADMIN", "DOCTOR", "RECEPTIONIST"],
      "/inpatients": ["ADMIN", "DOCTOR"],
      "/lab": ["ADMIN", "LAB_TECH", "DOCTOR"],
      "/billing": ["ADMIN", "RECEPTIONIST"],
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
    "/appointments/:path*",
    "/inpatients/:path*",
    "/lab/:path*",
    "/billing/:path*",
  ],
};

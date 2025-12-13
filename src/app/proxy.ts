import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const session = await auth(req);
  const url = req.nextUrl.clone();
  if (url.pathname.startsWith("/dashboard")) {
    if (!session?.user) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
  if (url.pathname.startsWith("/admin")) {
    if (session?.user?.role !== "ADMIN") {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

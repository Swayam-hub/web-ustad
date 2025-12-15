import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const host = req.headers.get("host") ?? "";
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "";
  const searchParams = url.searchParams.toString();
  const pathWithSearchParams = `${url.pathname}${
    searchParams ? `?${searchParams}` : ""
  }`;

  // ---------------------------
  // Subdomain Routing (Proxy)
  // ---------------------------
  const subdomain = host
    .replace(`.${rootDomain}`, "")
    .replace(rootDomain, "");

  if (subdomain && subdomain !== "www") {
    return NextResponse.rewrite(
      new URL(`/${subdomain}${pathWithSearchParams}`, req.url)
    );
  }

  // ---------------------------
  // Auth Page Normalization
  // ---------------------------
  if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
    return NextResponse.redirect(new URL("/agency/auth", req.url));
  }

  // ---------------------------
  // Public Website
  // ---------------------------
  if (url.pathname === "/" || url.pathname === "/site") {
    return NextResponse.rewrite(new URL("/", req.url));
  }

  // ---------------------------
  // Protected Routes
  // ---------------------------
  if (
    url.pathname.startsWith("/agency") ||
    url.pathname.startsWith("/subaccount")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/agency/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/site",
    "/sign-in",
    "/sign-up",
    "/agency/:path*",
    "/dashboard/:path*",
  ],
};

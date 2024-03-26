import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  let cookie = req.cookies.has("next-auth.session-token");

  // check login
  if (req.nextUrl.pathname.startsWith("/login")) {
    if (!cookie) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  //  check dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      return NextResponse.next();
    }
  }
}

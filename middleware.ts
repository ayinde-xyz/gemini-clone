import NextAuth from "next-auth";
import authOptions from "@/authConfig";
import { NextResponse } from "next/server";
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";

const { auth } = NextAuth(authOptions);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedin = !!req.auth;
  // console.log(req.auth);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedin) {
      return NextResponse.redirect(new URL("/chat", nextUrl));
    }
    return;
  }

  if (!isLoggedin && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    // const encodedUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(new URL(`/auth/signup`, nextUrl));
    // return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

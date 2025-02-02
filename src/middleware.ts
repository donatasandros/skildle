import type { auth } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

type Session = typeof auth.$Infer.Session;

function createRouteMatcher(patterns: string[]) {
  return (route: string): boolean => {
    return patterns.some((pattern) => {
      const regex = new RegExp("^" + pattern.replace(/(:[a-zA-Z0-9_]+)/g, "([^/]+)") + "$");
      return regex.test(route);
    });
  };
}

const isPublicRoute = createRouteMatcher([
  "/",
  "/auth/login(.*)",
  "/auth/sign-up(.*)",
  "/api(.*)",
  "/courses/:courseId/lessons/:lessonId",
  "/products(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const isAuthRoute = createRouteMatcher(["/auth(.*)"]);

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  if (isAuthRoute(request.nextUrl.pathname) && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminRoute(request.nextUrl.pathname)) {
    if (session?.user.role !== "admin") {
      return new NextResponse(null, { status: 404 });
    }
  }

  if (!isPublicRoute(request.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

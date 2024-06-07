import createMiddleware from "next-intl/middleware"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { locales } from "./i18n"
import { NextResponse } from "next/server"

const intl = createMiddleware({
	locales,
	defaultLocale: locales[0],
})

const isProtectedRoute = createRouteMatcher([
	`/(${locales.join("|")})/callback`,
	`/(${locales.join("|")})/register`,
])

const isApiProtectedRoute = createRouteMatcher([
	"/api/uploadthing(.*)",
])

export default clerkMiddleware((auth, req) => {
	req.headers.set("x-pathname", req.nextUrl.pathname)

	if (isProtectedRoute(req)) auth().protect()

	if (isApiProtectedRoute(req)) return NextResponse.next()

	return intl(req)
}, {
	signInUrl: "/sign-in",
	signUpUrl: "/sign-up",
	afterSignInUrl: "/callback",
	afterSignUpUrl: "/callback",
})

export const config = {
	// Match only internationalized pathnames
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/(en-US|pt-BR)/:path*"],
}
import createMiddleware from "next-intl/middleware"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { locales } from "./i18n"

const intl = createMiddleware({
	locales: locales,
	defaultLocale: locales[0],
})

const isProtectedRoute = createRouteMatcher([
	`/(${locales.join("|")})/callback`,
	`/(${locales.join("|")})/register`,
]);

export default clerkMiddleware((auth, req) => {
	req.headers.set("x-pathname", req.nextUrl.pathname)

	if (isProtectedRoute(req)) auth().protect();
  
	return intl(req);
}, {
	signInUrl: "/sign-in",
	signUpUrl: "/sign-up",
	afterSignInUrl: "/callback",
	afterSignUpUrl: "/callback",
})

export const config = {
	// Match only internationalized pathnames
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", `/(en-US|pt-BR)/:path*`],
}
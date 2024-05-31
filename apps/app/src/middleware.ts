import createMiddleware from "next-intl/middleware"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const languages = ["en-US", "pt-BR"]

const intl = createMiddleware({
	locales: languages,
	defaultLocale: languages[0],
})

const isProtectedRoute = createRouteMatcher([
	'dashboard/(.*)',
]);

export default clerkMiddleware((auth, req) => {
	if (isProtectedRoute(req)) auth().protect();
  
	return intl(req);
}, {
	signInUrl: "/sign-in"
})

export const config = {
	// Match only internationalized pathnames
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/(de|en)/:path*"],
}
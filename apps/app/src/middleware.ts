import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { Ratelimit } from "@upstash/ratelimit";
import { ipAddress } from "@vercel/edge";
import { kv } from "@vercel/kv";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { locales } from "./i18n";

/**
 * MARK: Route matchers
 */

const isAssetRoute = createRouteMatcher(["/(images|logo|locales|_next)/(.*)"]);

const isProtectedRoute = createRouteMatcher([
	`/(${locales.join("|")})/callback`,
	`/(${locales.join("|")})/register`,
]);

const isApiProtectedRoute = createRouteMatcher(["/api/uploadthing(.*)"]);

/**
 * MARK: Middlewares
 */

const intl = createMiddleware({
	locales,
	defaultLocale: locales[0],
});

const ratelimit = new Ratelimit({
	redis: kv,
	// 5 requests from the same IP in 10 seconds
	limiter: Ratelimit.slidingWindow(5, "10 s"),
});

const clerk = clerkMiddleware(
	async (auth, req) => {
		req.headers.set("x-pathname", req.nextUrl.pathname);

		// assets are always public and not internacionalized
		if (isAssetRoute(req)) return NextResponse.next();

		const ip = ipAddress(req) || "127.0.0.1";
		const { success } = await ratelimit.limit(ip);

		// make sure the user is not rate limited or not in the rate limit screen
		if (!success && !req.nextUrl.pathname.includes("/block"))
			return NextResponse.redirect(new URL("/block", req.url));

		// make sure the user is authenticated
		if (isProtectedRoute(req)) auth().protect();

		// api handles their own authentication
		if (isApiProtectedRoute(req)) return NextResponse.next();

		return intl(req);
	},
	{
		signInUrl: "/sign-in",
		signUpUrl: "/sign-up",
		afterSignInUrl: "/callback",
		afterSignUpUrl: "/callback",
	},
);

/**
 * MARK: Config
 */

export default clerk;

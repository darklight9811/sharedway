import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { Ratelimit } from "@upstash/ratelimit";
import { ipAddress } from "@vercel/edge";
import { kv } from "@vercel/kv";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { generate } from "./app/manifest";
import { locales } from "./i18n";

/**
 * MARK: Route matchers
 */

const isAssetRoute = createRouteMatcher([
	"/post.png",
	"/(images|logo|locales|_next)/(.*)",
	"(.*).js.map",
	"/sitemap.xml",
	"/robots.txt",
	"/manifest.webmanifest",
]);

const isProtectedRoute = createRouteMatcher([
	`/(${locales.join("|")})/callback`,
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
	limiter: Ratelimit.slidingWindow(60, "60 s"),
});

const clerk = clerkMiddleware(
	async (auth, req) => {
		const ip = ipAddress(req) || "127.0.0.1";
		req.headers.set("x-pathname", req.nextUrl.pathname);
		req.headers.set("x-ip", ip);

		// we generate the webmanifest dinamically to allow internacionalization
		if (req.nextUrl.pathname === "/manifest.webmanifest") {
			const preferredLanguage = req.headers.get("Accept-Language");
			if (!preferredLanguage) return NextResponse.json(generate("en-US"));
			const favoriteLanguages = preferredLanguage.split(",");
			const locale = favoriteLanguages.find((t) =>
				locales.includes(t.split(";")[0] as (typeof locales)[number]),
			);
			return NextResponse.json(await generate(locale || "en-US"));
		}

		// assets are always public and not internacionalized
		if (isAssetRoute(req)) return NextResponse.next();

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

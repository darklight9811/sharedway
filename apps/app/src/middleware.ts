import createMiddleware from "next-intl/middleware"
import { authMiddleware } from "@clerk/nextjs"
import { chain } from "./lib/middleware"

export default chain([
	chain.start(),
	chain.middleware(async function localeMiddleware(next, req, event) {
		const response = await createMiddleware({
			// A list of all locales that are supported
			locales: ["pt-BR", "en-US"],

			// Used when no locale matches
			defaultLocale: "en-US",
		})(req)

		return next(req, event, response)
	}),
	chain.middleware(async function authenticationMiddleware(next, req, event) {
		const response = await authMiddleware({
			publicRoutes: [
				"/(pt-BR|en-US)",
			],
		})(req, event)

		return next(req, event, response as any)
	}),
])

export const config = {
	// Match only internationalized pathnames
	matcher: ["/", "/(en-US|pt-BR)/:path*", "/((?!.+\\.[\\w]+$|_next).*)"],
}
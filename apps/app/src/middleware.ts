import createMiddleware from "next-intl/middleware"
import { authMiddleware } from "@clerk/nextjs"
import { chain } from "./lib/middleware"

export default chain([
	function localeMiddleware () {
		return createMiddleware({
			// A list of all locales that are supported
			locales: ["pt-BR", "en-US"],

			// Used when no locale matches
			defaultLocale: "en-US",
		})
	},
	// function authenticationMiddleware () {
	// 	return authMiddleware({
	// 		ignoredRoutes: [
	// 			"/api/*",
	// 		],
	// 	})
	// },
])

export const config = {
	// Match only internationalized pathnames
	matcher: ["/", "/(en-US|pt-BR)/:path*"],
}
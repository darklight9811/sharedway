import createMiddleware from "next-intl/middleware"

export default createMiddleware({
	// A list of all locales that are supported
	locales: ["pt-BR", "en-US"],

	// Used when no locale matches
	defaultLocale: "en-US",
})

export const config = {
	// Match only internationalized pathnames
	matcher: ["/", "/(en-US|pt-BR)/:path*"],
}
import createMiddleware from "next-intl/middleware"
import { authMiddleware } from "@clerk/nextjs"

const languages = ["en-US", "pt-BR"]

const intl = createMiddleware({
	locales: languages,
	defaultLocale: languages[0],
})

export default authMiddleware({
	beforeAuth(request) {
		return intl(request)
	},

	publicRoutes: ["/:locale", "/:locale/sign-in", "/:locale/sign-up"],
	signInUrl: "/sign-in",
})

export const config = {
	// Match only internationalized pathnames
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
}
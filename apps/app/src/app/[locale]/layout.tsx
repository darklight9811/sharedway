import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { cn } from "@repo/ds/utils"
import { ClerkProvider } from "@clerk/nextjs"
import { getLocale, getTranslations } from "next-intl/server"
import { ptBR, enUS } from "@clerk/localizations"
import { base } from "../../lib/url"
import { auth } from "@clerk/nextjs/server"
import userService from "@repo/services/user"
import parallel from "../../lib/parallel"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata (params: { locale: string }) {
	const [t, locale] = await Promise.all([
		getTranslations({ locale: params.locale, namespace: "metadata" }),
		getLocale(),
	])

	return {
		metadataBase: new URL(base()),
		robots: "/robots.txt",
		alternates: {
			canonical: "/",
			languages: {
				"en-US": "/en-US",
				"pt-BR": "/pt-BR",
			},
		},
		title: {
			default: t("title"),
			template: `%s | ${t("title")}`,
		},
		description: t("description"),
		keywords: t("keywords").split(","),
		icons: {
			icon: [
				{
					media: "(prefers-color-scheme: light)",
					url: "/logo/favicon.svg",
					href: "/logo/favicon.svg",
				},
				{
					media: "(prefers-color-scheme: dark)",
					url: "/logo/favicon-light.svg",
					href: "/logo/favicon-light.svg",
				},
			],
		},
		authors: [
			{
				name: "yamiassu",
			},
		],
		openGraph: {
			title: t("title"),
			description: t("description"),
			url: base(),
			siteName: t("title"),
			type: "website",
			locale: locale,
			images: ["/opengraph-image.png"],
			alternateLocale: ["pt_BR", "en_US"],
		},
		creator: "Yamiassu Softworks",
		twitter: {
			card: "summary_large_image",
			site: base(),
			title: t("title"),
			description: t("description"),
			images: ["/opengraph-image.png"],
			creator: "@darklight9811",
		},
		manifest: "/site.webmanifest",
	} satisfies Metadata
}

export async function generateViewport () {
	return {
		themeColor: [
			{ media: "(prefers-color-scheme: light)", color: "#FEFEFE" },
			{ media: "(prefers-color-scheme: dark)", color: "#1A2634" },
		],
	} satisfies Viewport
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const { userId } = auth()
	const pathname = headers().get("x-pathname")!
	const [user] = await parallel(
		userService.show(userId),
	)

	if (userId && !user && !pathname.includes("/callback")) {
		return redirect("/callback?redirect" + pathname)
	}

	return (
		<html className="h-full" lang={params.locale}>
			<body className={cn(inter.className, "flex flex-col h-full")}>
				<ClerkProvider
					localization={{ "pt-BR": ptBR, "en-US": enUS }[params.locale]}
					signInUrl={`/${params.locale}/sign-in`}
					signUpUrl={`/${params.locale}/sign-up`}
				>
					<div className="flex-grow w-full flex flex-col child:animate-fade-in">
						{children}
					</div>
				</ClerkProvider>
			</body>
		</html>
	)
}

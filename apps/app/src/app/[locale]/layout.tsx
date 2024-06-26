import "./globals.css";
import { currentUser } from "@/modules/user/loaders";
import { enUS, ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { cn } from "@repo/ds/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import parallel from "../../lib/parallel";
import { baseUrl } from "../../lib/url";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(params: { locale: string }) {
	const [t, locale] = await Promise.all([
		getTranslations({ locale: params.locale, namespace: "metadata" }),
		getLocale(),
	]);

	return {
		metadataBase: new URL(baseUrl()),
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
					url: "/images/logo/favicon.svg",
					href: "/images/logo/favicon.svg",
				},
				{
					media: "(prefers-color-scheme: dark)",
					url: "/images/logo/favicon-light.svg",
					href: "/images/logo/favicon-light.svg",
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
			url: baseUrl(),
			siteName: t("title"),
			type: "website",
			locale,
			images: ["/opengraph-image.png"],
			alternateLocale: ["pt_BR", "en_US"],
		},
		creator: "Yamiassu Softworks",
		twitter: {
			card: "summary_large_image",
			site: baseUrl(),
			title: t("title"),
			description: t("description"),
			images: ["/opengraph-image.png"],
			creator: "@darklight9811",
		},
		manifest: "/site.webmanifest",
	} satisfies Metadata;
}

export async function generateViewport() {
	return {
		themeColor: [
			{ media: "(prefers-color-scheme: light)", color: "#FEFEFE" },
			{ media: "(prefers-color-scheme: dark)", color: "#1A2634" },
		],
	} satisfies Viewport;
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const { userId } = auth();
	const pathname = headers().get("x-pathname") || "/";
	const [user, messages] = await parallel(currentUser(), getMessages());

	if (userId && !user && !pathname.includes("/callback")) {
		return redirect(`/callback?redirect=${pathname}`);
	}

	return (
		<html className="h-full" lang={params.locale}>
			<body className={cn(inter.className, "flex flex-col h-full")}>
				<NextIntlClientProvider messages={messages}>
					<ClerkProvider
						polling={false}
						localization={{ "pt-BR": ptBR, "en-US": enUS }[params.locale]}
						signInUrl={`/${params.locale}/sign-in`}
						signUpUrl={`/${params.locale}/sign-up`}
					>
						<SpeedInsights />
						<Analytics />

						<div className="flex-grow w-full h-screen flex flex-col child:animate-fade-in">
							{children}
						</div>
					</ClerkProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}

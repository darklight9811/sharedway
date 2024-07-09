import { currentUser } from "@/modules/user/loaders";
import { auth } from "@clerk/nextjs/server";
import { cn } from "@repo/ds/utils";
import type { Metadata, Viewport } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import parallel from "../../lib/parallel";
import { baseUrl } from "../../lib/url";
import ClientProvider from "./_components/client-provider";
import ServerProvider from "./_components/server-provider";

import "./globals.css";

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
			canonical: `./${locale}/`,
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
			images: ["/post.png"],
			alternateLocale: ["pt_BR", "en_US"],
		},
		creator: "Yamiassu Softworks",
		twitter: {
			card: "summary_large_image",
			site: baseUrl(),
			title: t("title"),
			description: t("description"),
			images: ["/post.png"],
			creator: "@darklight9811",
		},
		manifest: "/site.webmanifest",
	} satisfies Metadata;
}

export async function generateViewport() {
	return {
		themeColor: [
			{ media: "(prefers-color-scheme: light)", color: "#E9F6FE" },
			{ media: "(prefers-color-scheme: dark)", color: "#E9F6FE" },
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
	const [user] = await parallel(currentUser());

	if (userId && !user && !pathname.includes("/callback")) {
		return redirect(`/callback?redirect=${pathname}`);
	}

	return (
		<html className="h-full scroll-smooth" lang={params.locale}>
			<body className={cn(inter.className, "flex flex-col h-full")}>
				<ServerProvider locale={params.locale}>
					<ClientProvider>
						<div className="grow w-full flex h-screen pt-[5vh]">
							<div
								id="content"
								className="flex flex-col w-full grow relative *:animate-fade-in"
							>
								{children}
							</div>
						</div>
					</ClientProvider>
				</ServerProvider>
			</body>
		</html>
	);
}

import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "@repo/ds/utils"
import { ClerkProvider } from "@clerk/nextjs"
import { getTranslations } from "next-intl/server"
import { ptBR, enUS } from "@clerk/localizations"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata (params: { locale: string }) {
	const t = await getTranslations({ locale: params.locale, namespace: "metadata" })

	return {
		title: t("title"),
	} satisfies Metadata
}

export default function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: string };
}): JSX.Element {
	return (
		<html className="h-full" lang={params.locale}>
			<body className={cn(inter.className, "flex flex-col h-full")}>
				<ClerkProvider
					localization={{ "pt-BR": ptBR, "en-US": enUS }[params.locale]}
					signInUrl={`/${params.locale}/sign-in`}
					signUpUrl={`/${params.locale}/sign-up`}
				>
					{children}
				</ClerkProvider>
			</body>
		</html>
	)
}

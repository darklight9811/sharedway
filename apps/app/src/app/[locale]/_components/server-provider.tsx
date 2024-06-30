import { enUS, ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function ServerProvider({
	children,
	locale,
}: { children: React.ReactNode; locale: string }) {
	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			<ClerkProvider
				polling={false}
				localization={{ "pt-BR": ptBR, "en-US": enUS }[locale]}
				signInUrl={`/${locale}/sign-in`}
				signUpUrl={`/${locale}/sign-up`}
			>
				<SpeedInsights />
				<Analytics />

				{children}
			</ClerkProvider>
		</NextIntlClientProvider>
	);
}

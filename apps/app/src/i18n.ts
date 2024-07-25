import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getLocaleContent } from "./lib/locale";

// Can be imported from a shared config
export const locales = ["en-US", "pt-BR"] as const;
export const localePrefix = "always";

export default getRequestConfig(async () => {
	// Validate that the incoming `locale` parameter is valid
	const locale = getLocaleContent(headers().get("Accept-Language"));

	if (!locale) return notFound();

	return {
		locale,
		messages: (await import(`../public/locales/${locale}.json`)).default,
	};
});

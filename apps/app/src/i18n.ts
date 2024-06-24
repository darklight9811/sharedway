import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
export const locales = ["en-US", "pt-BR"] as const;
export const localePrefix = "always";

export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale as "pt-BR")) notFound();

	return {
		messages: (await import(`../public/locales/${locale}.json`)).default,
	};
});

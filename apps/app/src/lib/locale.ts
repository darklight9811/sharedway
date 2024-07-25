import { locales } from "@/i18n";

export function getLocaleContent(txt?: string | null) {
	if (!txt) return null;
	const favoriteLanguages = txt.split(",");
	return favoriteLanguages.find((t) =>
		locales.includes(t.split(";")[0] as (typeof locales)[number]),
	);
}

import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const [t] = await Promise.all([getTranslations({ namespace: "metadata" })]);

	return {
		name: t("title"),
		short_name: t("title"),
		description: t("description"),
		start_url: "/",
		display: "standalone",
		background_color: "#DFF2FD",
		theme_color: "#62B0F4",
		icons: [
			{
				src: "/images/logo/favicon.svg",
				sizes: "any",
				type: "image/x-icon",
			},
		],
	};
}

import type { MetadataRoute } from "next";

import { baseUrl } from "@/lib/url";
import { env } from "@repo/env";
// languages
import enUS from "../../public/locales/en-US.json";
import ptBR from "../../public/locales/pt-BR.json";

export async function generate(lang: string) {
	const file = { enUS, ptBR }[lang.replace("-", "")];

	function t(key: string, fallback = "") {
		return file?.metadata[key as keyof typeof file.metadata] || fallback;
	}

	return {
		id: `?sharedway=${env.APP_ENV}`,
		name: `${t("title")}${env.APP_ENV === "production" ? "" : " (dev)"}`,
		short_name: `${t("title")}${env.APP_ENV === "production" ? "" : " (dev)"}`,
		description: t("description"),
		start_url: "/",
		display: "browser",
		background_color: "#3a506b",
		theme_color: "#3a506b",
		orientation: "portrait",
		dir: "ltr",
		scope: baseUrl(),
		icons: [
			{
				src: "/images/logo/favicon.svg",
				sizes: "any",
				type: "image/x-icon",
				purpose: "any",
			},
			{
				src: "/images/logo/favicon.svg",
				sizes: "512x512",
				type: "image/x-icon",
				purpose: "any",
			},
		],
		lang: lang,
		categories: t("keywords").split(","),
	} satisfies MetadataRoute.Manifest;
}

export default function manifest(): Promise<
	Partial<Record<keyof MetadataRoute.Manifest, unknown>>
> {
	return generate("en-US");
}

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
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#68D8EE",
		orientation: "portrait",
		dir: "ltr",
		scope: baseUrl(),
		screenshots: [
			{
				src: "/screenshot.png",
				form_factor: "wide",
				sizes: "1331x710"
			},
			{
				src: "/screenshot_mobile.png",
				form_factor: "narrow",
				sizes: "410x648"
			},
		],
		icons: [
			{
				src: "/images/logo/favicon.svg",
				sizes: "256x256",
				purpose: "any",
			},
			{
				src: "/images/logo/ico.ico",
				sizes: "256x256",
				type: "image/x-icon",
				purpose: "any",
			},
		],
		lang: lang,
		categories: t("keywords").split(","),
	};
}

export default function manifest(): Promise<
	Partial<Record<keyof MetadataRoute.Manifest, unknown>>
> {
	return generate("en-US");
}

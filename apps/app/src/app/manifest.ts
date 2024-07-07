import type { MetadataRoute } from "next";

// languages
import enUS from "../../public/locales/en-US.json";
import ptBR from "../../public/locales/pt-BR.json";

export async function generate(lang: string) {
	const file = { enUS, ptBR }[lang.replace("-", "")];

	function t(key: string) {
		return file?.metadata[key as keyof typeof file.metadata];
	}

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

export default function manifest(): Promise<
	Partial<Record<keyof MetadataRoute.Manifest, unknown>>
> {
	return generate("en-US");
}

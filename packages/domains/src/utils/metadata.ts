import { i18n } from "@repo/ds/lib/i18n";
import type { LoaderFunction, MetaFunction } from "react-router";

import { env } from "../domains/app";

type ConfigValue = {
	title?: string;
	description?: string;
};

export function metadata<Loader extends LoaderFunction>(
	config: ConfigValue | (() => ConfigValue),
): MetaFunction<Loader> {
	return () => {
		const data = typeof config === "function" ? config() : config;
		const title = data.title ? `${env.name} - ${data.title}` : env.name;
		const url = "https://sharedway.org";
		const creator = "@darklight9811";

		return [
			{
				title,
			},
			...(data.description
				? [
						{ property: "description", content: data.description },
						{ property: "og:description", content: data.description },
						{ name: "twitter:description", content: data.description },
					]
				: []),
			/**
			 * ### MARK: OG Metadata
			 */
			{
				property: "og:title",
				content: title,
			},
			{
				property: "og:site_name",
				content: env.name,
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:url",
				content: url,
			},
			{
				property: "og:creator",
				content: creator,
			},
			/**
			 * ### MARK: Apple Metadata
			 */
			{
				name: "mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "apple-mobile-web-app-title",
				content: env.name,
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "default",
			},
			/**
			 * ### MARK: Twitter Metadata
			 */
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: title,
			},
			{
				name: "twitter:site",
				content: url,
			},
			{
				name: "twitter:creator",
				content: creator,
			},
			/**
			 * ### MARK: Language Metadata
			 */
			...i18n.supportedLngs.map((lng) => ({ property: "og:locale:alternate", content: lng })),
			/**
			 * ### MARK: General Metadata
			 */
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0, maximum-scale=1, viewport-fit=cover",
			},
		];
	};
}

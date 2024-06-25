import { baseUrl } from "@/lib/url";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const url = baseUrl();
	const modified = new Date();

	return [
		{
			url,
			lastModified: modified,
			changeFrequency: "weekly",
			priority: 1,
			alternates: {
				languages: {
					br: `${url}/pt-BR`,
				},
			},
		},
	];
}

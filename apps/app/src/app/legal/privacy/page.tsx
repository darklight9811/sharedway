import { baseUrl } from "@/lib/url";
import { getLocale } from "next-intl/server";

export default async function Page() {
	const locale = await getLocale();

	return fetch(`${baseUrl()}/legal/${locale}/privacy.md`, {
		next: {
			revalidate: false,
		},
	})
		.then((t) => t.text())
		.then((t) =>
			t.split("\n").map((line) => {
				if (line.startsWith("##"))
					return <h1 className="text-xl mt-4">{line.replace("## ", "")}</h1>;
				if (line.startsWith("#"))
					return (
						<h1 className="font-bold text-xl">{line.replace("# ", "")}</h1>
					);

				// biome-ignore lint/correctness/useJsxKeyInIterable: RSC
				return <p>{line}</p>;
			}),
		);
}

import { promises as fs } from "node:fs";
import { getLocale } from "next-intl/server";

export default async function Page() {
	const locale = await getLocale();
	const file = await fs.readFile(
		`${process.cwd()}/src/app/[locale]/(legal)/privacy/_locales/${locale.replace("-", "")}.txt`,
		{ encoding: "utf-8" },
	);

	return file.split("\n").map((line, i) => {
		if (line.startsWith("##"))
			return <h1 className="text-xl mt-4">{line.replace("## ", "")}</h1>;
		if (line.startsWith("#"))
			return <h1 className="font-bold text-xl">{line.replace("# ", "")}</h1>;

		// biome-ignore lint/correctness/useJsxKeyInIterable: RSC
		return <p>{line}</p>;
	});
}

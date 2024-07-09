import { useTranslations } from "next-intl";

export default function Page() {
	const t = useTranslations("legal");

	return t("terms")
		.split("\n")
		.map((line, i) => {
			if (line.startsWith("##"))
				return <h1 className="text-xl mt-4">{line.replace("## ", "")}</h1>;
			if (line.startsWith("#"))
				return <h1 className="font-bold text-xl">{line.replace("# ", "")}</h1>;

			// biome-ignore lint/correctness/useJsxKeyInIterable: RSC
			return <p>{line}</p>;
		});
}

import { readFile, readdir } from "node:fs/promises";

async function main() {
	// fetch locales
	const locales = await readdir("../../public/locales").then((t) =>
		t.map((x) => x.split(".")[0]),
	);

	// fetch locale contents
	const contents = await Promise.all(
		locales.map((locale) =>
			readFile(`../../public/locales/${locale}.json`, {
				encoding: "utf-8",
			}).then((content) => [locale, JSON.parse(content)]),
		),
	);

	// gather all keys
	const keys = new Set<string>();
	for (let i = 0; i < contents.length; i++) {
		const [, content] = contents[i];

		extract_keys(content, keys);
	}

	// compare keys
	let has_errors = false;

	for (let i = 0; i < contents.length; i++) {
		const [locale, content] = contents[i];

		// biome-ignore lint/complexity/noForEach: <explanation>
		keys.forEach((key) => {
			if (!extract(content, key.split("."))) {
				has_errors = true;
				console.log(
					`- \x1b[31merror\x1b[0m: key '${key}' was not found in locale ${locale}`,
				);
			}
		});
	}

	if (has_errors) process.exit(1);
}

main();

function extract_keys(
	obj: Record<string, unknown>,
	set: Set<string>,
	ctx: string[] = [],
) {
	const keys = Object.keys(obj);

	for (let i = 0; i < keys.length; i++) {
		if (typeof obj[keys[i]] === "string") set.add([...ctx, keys[i]].join("."));
		else
			extract_keys(obj[keys[i]] as Record<string, unknown>, set, [
				...ctx,
				keys[i],
			]);
	}
}

function extract(obj: Record<string, unknown>, path: string[]) {
	return path.reduce((prev: any, curr) => (prev ? prev[curr] : undefined), obj);
}

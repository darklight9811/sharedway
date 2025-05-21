import { readdir, readFile } from "node:fs/promises";

async function main() {
	// fetch locales
	const locales = await readdir("../public/locales").then((t) => t.map((x) => x.split(".")[0]));

	// fetch all files for each locale and filter them
	const contexts = await Promise.all(
		locales.map(async (locale) => {
			const files = await readdir(`../public/locales/${locale}`);
			return files.filter((file) => file.endsWith(".json"));
		}),
	)
		.then((results) => {
			if (
				!results.every(
					(arr) => arr.length === results[0].length && arr.every((file, index) => file === results[0][index]),
				)
			) {
				throw new Error("Not all locales have the same contexts");
			}
			return results;
		})
		.then((results) => results.flat())
		.then((files) => [...new Set(files)]);

	// fetch locale contents
	const contents = await Promise.all(
		locales.flatMap((locale) =>
			contexts.map((context) =>
				readFile(`../public/locales/${locale}/${context}`, { encoding: "utf-8" }).then(
					(content) => [locale, context, JSON.parse(content) as Record<string, unknown>] as const,
				),
			),
		),
	);

	// gather all keys
	const contextKeys = new Map<string, Set<string>>();
	for (let i = 0; i < contents.length; i++) {
		const [, context, content] = contents[i];

		if (!contextKeys.has(context)) contextKeys.set(context, new Set());
		extract_keys(content, contextKeys.get(context)!);
	}

	// compare keys
	let has_errors = false;

	for (let i = 0; i < contents.length; i++) {
		const [locale, contextKey, content] = contents[i];

		contextKeys.get(contextKey)!.forEach((key) => {
			if (!extract(content, key.split("."))) {
				has_errors = true;
				console.log(
					`- \x1b[31merror\x1b[0m: key '${key}' on file '${contextKey}' was not found in locale ${locale}`,
				);
			}
		});
	}

	if (has_errors) process.exit(1);
	else console.log("\x1b[32msuccess\x1b[0m: all keys are present");
}

main();

function extract_keys(obj: Record<string, unknown>, set: Set<string>, ctx: string[] = []) {
	const keys = Object.keys(obj);

	for (let i = 0; i < keys.length; i++) {
		if (typeof obj[keys[i]] === "string") set.add([...ctx, keys[i]].join("."));
		else extract_keys(obj[keys[i]] as Record<string, unknown>, set, [...ctx, keys[i]]);
	}
}

function extract(obj: Record<string, unknown>, path: string[]) {
	return path.reduce(
		// biome-ignore lint/suspicious/noExplicitAny: For the sake of simplification
		(prev: any, curr) => (prev ? prev[curr] : undefined),
		obj,
	);
}

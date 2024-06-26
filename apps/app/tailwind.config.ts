import sharedConfig from "@repo/ds/tw";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
	content: [
		"./src/app/**/*.tsx",
		"./src/modules/**/*.tsx",
		"./src/components/**/*.tsx",
		"../../packages/ds/src/**/*.tsx",
	],
	presets: [sharedConfig],
};

export default config;

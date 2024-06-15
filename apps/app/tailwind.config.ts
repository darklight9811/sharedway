import type { Config } from "tailwindcss"
import sharedConfig from "@repo/ds/tw"

const config: Pick<Config, "content" | "presets"> = {
	content: [
		"./src/app/**/*.tsx",
		"./src/modules/**/*.tsx",
		"../../packages/ds/src/**/*.tsx",
	],
	presets: [sharedConfig],
}

export default config

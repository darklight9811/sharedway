// tailwind config is required for editor support

import type { Config } from "tailwindcss"
import sharedConfig from "@repo/ds/tw"
import { withUt } from "uploadthing/tw"

const config: Pick<Config, "content" | "presets"> = withUt({
	content: ["./src/app/**/*.tsx", "../../packages/ds/src/**/*.tsx"],
	presets: [sharedConfig],
})

export default config

// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "../../packages/ds/tailwind.config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/app/**/*.tsx", "../../packages/ds/src/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;

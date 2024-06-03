const { resolve } = require("node:path");
const rules = require("./rules");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
	extends: [
		...[
			"@vercel/style-guide/eslint/node",
			"@vercel/style-guide/eslint/browser",
			"@vercel/style-guide/eslint/react",
			"@vercel/style-guide/eslint/next",
			"eslint-config-turbo",
		].map(require.resolve),
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
	],
	globals: {
		React: true,
		JSX: true,
	},
	settings: {
		"import/resolver": {
			typescript: {
				project,
			},
			node: {
				extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
	ignorePatterns: ["node_modules/", "dist/"],
	// add rules configurations here
	rules,
};

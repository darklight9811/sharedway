const { resolve } = require("node:path")

const project = resolve(process.cwd(), "apps/app/tsconfig.json")

module.exports = {
	extends: ["../../packages/config/eslint/next.js"],
	parserOptions: {
		project,
	},
	settings: {
		"import/resolver": {
			typescript: {
				project,
			},
		},
	},
}

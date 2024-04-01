module.exports = {
	"import/order": "off",
    "import/no-default-export": "off",
	"@next/next/no-html-link-for-pages": "off",

	// Eslint
	"no-inner-declarations": 0,
	"import/no-anonymous-default-export": 0,
	"no-empty": 0,
	"semi": ["error", "never"],
	"quotes": ["error", "double"],
	"no-mixed-spaces-and-tabs": "error",
	"no-tabs": 0,
	"no-prototype-builtins": 0,
	"no-trailing-spaces": "error",
	"comma-dangle": ["error", "always-multiline"],
	"indent": 0,

	// Typescript eslint
	"@typescript-eslint/ban-ts-comment": 0,
	"@typescript-eslint/ban-types": 0,
	"@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
	"@typescript-eslint/no-var-requires": 0,
	"@typescript-eslint/explicit-module-boundary-types": 0,
	"@typescript-eslint/no-misused-new": 0,
	"@typescript-eslint/no-empty-function": 0,
	"@typescript-eslint/member-delimiter-style": ["error"],
	"@typescript-eslint/no-explicit-any": 0,
	"@typescript-eslint/no-non-null-assertion": 0,
	"@typescript-eslint/indent": [
		"error",
		"tab", {
			SwitchCase: 1,
		},
	],
	"@typescript-eslint/no-unused-vars": [
		"warn",
		{
			varsIgnorePattern: "(^_|^h$|^Fragment$)",
			argsIgnorePattern: "^_",
			args: "all",
		},
	],

	// React eslint
	"react/no-unescaped-entities": [0],
	"react/no-array-index-key": "off",
}
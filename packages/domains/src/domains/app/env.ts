import v from "@repo/ds/v";

const schema = v.object({
	name: v.string(),
	secret: v.string().default("secret"),

	type: v.enum(["dev", "prod"]).default("dev"),

	app_url: v.string().url().default("http://localhost:3000"),
});

export const env = schema.parse({
	name: "sharedway",
	secret: import.meta.env.KEY_SECRET,

	app_url: import.meta.env.VITE_APP_URL,
});

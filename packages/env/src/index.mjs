import { z } from "zod";

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({
	APP_NAME: z.string(),
	APP_SECRET: z.string(),
	APP_ENV: z.enum(["preview", "production"]).default("preview"),
	VERCEL_URL: z.string().optional(),
	PORT: z.coerce.number().default(3000),
	DATABASE_URL: z.string().url(),
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),

	UPLOADTHING_SECRET: z.string().min(1),
	UPLOADTHING_APP_ID: z.string().min(1),

	KV_URL: z.string().min(1),
	KV_REST_API_URL: z.string().min(1),
	KV_REST_API_TOKEN: z.string().min(1),
	KV_REST_API_READ_ONLY_TOKEN: z.string().min(1),
});

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
	// NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
	APP_NAME: process.env.APP_NAME,
	APP_SECRET: process.env.APP_SECRET,
	VERCEL_URL: process.env.VERCEL_URL,
	APP_ENV: process.env.APP_ENV,
	PORT: process.env.PORT,
	DATABASE_URL: process.env.DATABASE_URL,

	NODE_ENV: process.env.NODE_ENV,

	UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
	UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,

	KV_URL: process.env.KV_URL,
	KV_REST_API_URL: process.env.KV_REST_API_URL,
	KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
	KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
};

// Don't touch the part below
// --------------------------

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

if (Boolean(process.env.SKIP_ENV_VALIDATION) === false) {
	const isServer = typeof window === "undefined";

	const parsed = /** @type {MergedSafeParseReturn} */ (
		isServer
			? merged.safeParse(processEnv) // on server we can validate all env vars
			: client.safeParse(processEnv) // on client we can only validate the ones that are exposed
	);

	if (parsed.success === false) {
		console.error(
			"❌ Invalid environment variables:",
			parsed.error.flatten().fieldErrors,
		);
		throw new Error("Invalid environment variables");
	}

	env = new Proxy(parsed.data, {
		get(target, prop) {
			if (typeof prop !== "string") return undefined;
			// Throw a descriptive error if a server-side env var is accessed on the client
			// Otherwise it would just be returning `undefined` and be annoying to debug
			if (!isServer && !prop.startsWith("NEXT_PUBLIC_")) {
				throw new Error(
					process.env.NODE_ENV === "production"
						? "❌ Attempted to access a server-side environment variable on the client"
						: `❌ Attempted to access server-side environment variable '${prop}' on the client`,
				);
			}
			return target[/** @type {keyof typeof target} */ (prop)];
		},
	});
}

export { env };

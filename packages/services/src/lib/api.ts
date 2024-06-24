// Types
import type { ZodSchema, z } from "zod";
import type Metadata from "../types/metadata";

// -------------------------------------------------
// MARK: Types
// -------------------------------------------------

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Config<Bind extends Record<string, any>> = {
	/**
	 * ### Bind
	 *
	 * Add utility methods to the request object
	 */
	bind?: Bind;
};

export type PrepareApi<
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	Bound extends Record<string, any> = Record<string, any>,
	Input = void,
	Output = Input,
	Service = Bound & { input: Input },
> = {
	/**
	 * ### Parse
	 *
	 * Run the piped value
	 */
	(
		data: Input,
	): Promise<
		| { data: Output; ok: true; errors: undefined }
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		| { errors: any; ok: false; data: undefined }
	>;

	/**
	 * ### Auth
	 *
	 * Make sure authentication is according to type
	 */
	auth(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		callback: (data: Service) => Promise<any | undefined>,
	): PrepareApi<Bound, Input, Output>;

	/**
	 * ### ZOD
	 *
	 * Parse data coming through the last item in the pipe
	 */
	zod<Schema extends ZodSchema, Result = z.infer<Schema>>(
		schema: Schema,
	): PrepareApi<Bound, Input extends void ? Result : Input, Result>;

	/**
	 * ### Map
	 *
	 * Run code without delivering it to API
	 */
	map<
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		Callback extends (data: Service) => Promise<any>,
		Result = Awaited<ReturnType<Callback>>,
	>(cb: Callback): PrepareApi<Bound, Result, Result>;

	/**
	 * ### Action
	 *
	 * Run code as a server action
	 */
	action<
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		Callback extends (data: Service) => Promise<any>,
		Result = Awaited<ReturnType<Callback>>,
	>(cb: Callback): PrepareApi<Bound, Input, Result>;

	/**
	 * ### Service
	 *
	 * Run code as a server action
	 */
	service<
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		Callback extends (data: Output) => (metadata: Metadata) => Promise<any>,
		Result = Awaited<ReturnType<ReturnType<Callback>>>,
	>(
		cb: Callback,
		metadataBuilder: () => Metadata | Promise<Metadata>,
	): PrepareApi<Bound, Input, Result>;
};

// -------------------------------------------------
// MARK: Main
// -------------------------------------------------

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function createApi<Bind extends Record<string, any>>(
	config: Config<Bind>,
) {
	const bound = (config.bind || {}) as Bind;

	function prepare<Input = void, Output = Input>(
		cb: (input: { input: Input } & Bind) => Promise<Output> = async (t) =>
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			t as any,
	): PrepareApi<Bind, Input, Output> {
		const parse: PrepareApi<Bind, Input, Output> = async function parse(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			data: any,
		): Promise<Output> {
			return Promise.resolve(cb({ ...bound, input: data }))
				.then((data) => ({ ok: true, data }))
				.catch((err) => {
					if (["ZodError", "AuthError"].includes(err.name)) {
						return {
							ok: false,
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
							errors: err.errors.map((error: any) => ({
								field: error.path,
								message: error.message,
							})),
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						} as any;
					}

					// we want to unexpected errors to throw the app flow so the dev can fix them
					throw err;
				});
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as any;

		parse.zod = function zod(schema: ZodSchema) {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			return prepare<any, z.infer<typeof schema>>(async (data) =>
				schema.parse(data.input),
			);
		};

		parse.map = (callback) =>
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			prepare<any, any>((data) =>
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				Promise.resolve(callback({ ...bound, input: data as any })).then(
					(response) => cb({ ...bound, input: response }),
				),
			);

		parse.action = (callback) =>
			prepare((data) =>
				cb(data).then((response) =>
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					callback({ ...bound, input: response as any }),
				),
			);

		parse.auth = (callback) =>
			prepare((data) =>
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				callback(data as any).then((response) => {
					if (response) {
						throw {
							name: "AuthError",
							errors: [response],
						};
					}

					return cb(data);
				}),
			);

		parse.service = (callback, metadata) =>
			prepare((data) =>
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				Promise.all([cb(data as any), metadata()]).then(
					([response, metadata]) => callback(response)(metadata),
				),
			);

		return parse as PrepareApi<typeof bound, Input, Output>;
	}

	return prepare();
}

// -------------------------------------------------
// MARK: Helpers
// -------------------------------------------------

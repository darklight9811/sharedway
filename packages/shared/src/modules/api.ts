// Types
import type { ZodSchema, z } from "zod";

// -------------------------------------------------
// MARK: Types
// -------------------------------------------------

type Config<Bind extends Record<string, any>> = {
	/**
	 * ### Bind
	 *
	 * Add utility methods to the request object
	 */
	bind?: Bind;
};

export type PrepareApi<
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
		| { errors: any; ok: false; data: undefined }
	>;

	/**
	 * ### Auth
	 *
	 * Make sure authentication is according to type
	 */
	auth(
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
		Callback extends (data: Service) => Promise<any>,
		Result = Awaited<ReturnType<Callback>>,
	>(cb: Callback): PrepareApi<Bound, Result, Result>;

	/**
	 * ### Action
	 *
	 * Run code as a server action
	 */
	action<
		Callback extends (data: Service) => Promise<any>,
		Result = Awaited<ReturnType<Callback>>,
	>(cb: Callback): PrepareApi<Bound, Input, Result>;
};

// -------------------------------------------------
// MARK: Main
// -------------------------------------------------

export default function createApi<Bind extends Record<string, any>>(
	config: Config<Bind>,
) {
	const bound = (config.bind || {}) as Bind;

	function prepare<Input = void, Output = Input>(
		cb: (input: { input: Input } & Bind) => Promise<Output> = async (t) =>
			t as any,
	): PrepareApi<Bind, Input, Output> {
		const parse: PrepareApi<Bind, Input, Output> = async function parse(
			data: any,
		): Promise<Output> {
			return Promise.resolve(cb({ ...bound, input: data }))
				.then((data) => ({ ok: true, data }))
				.catch((err) => {
					if (["ZodError", "AuthError"].includes(err.name)) {
						return {
							ok: false,
							errors: err.errors.map((error: any) => ({
								field: error.path,
								message: error.message,
							})),
						} as any;
					}

					// we want to unexpected errors to throw the app flow so the dev can fix them
					throw err;
				});
		} as any;

		parse.zod = function zod(schema: ZodSchema) {
			return prepare<any, z.infer<typeof schema>>(async (data) =>
				schema.parse(data.input),
			);
		};

		parse.map = (callback) =>
			prepare<any, any>((data) =>
				Promise.resolve(callback({ ...bound, input: data as any })).then(
					(response) => cb({ ...bound, input: response }),
				),
			);

		parse.action = (callback) =>
			prepare((data) =>
				cb(data).then((response) =>
					callback({ ...bound, input: response as any }),
				),
			);

		parse.auth = (callback) =>
			prepare((data) =>
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

		return parse as PrepareApi<typeof bound, Input, Output>;
	}

	return prepare();
}

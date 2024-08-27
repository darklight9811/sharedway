// Types
import type { ZodSchema, z } from "zod";
import type { Prettify } from "../types/prettify";
import type { Payload } from "./payload";
import payload from "./payload";

// -------------------------------------------------
// MARK: Types
// -------------------------------------------------

type Config<Bind extends Record<string, any>> = {
	/**
	 * ### Bind
	 *
	 * Add utility methods to the request object. If you pass a method, it will
	 * be invoked when starting the API to prepare the bind service
	 */
	bind?: Bind | (() => Promise<Bind> | Bind);

	/**
	 * ### Handle
	 *
	 * Method that is invoked in case the api throws. If you don't
	 * rethrow, it will return the method response instead
	 */
	handle?: (err: unknown, service: Bind) => any;
};

export type PrepareApi<
	/** Services bound to the method */
	Bound extends Record<string, any> = {},
	/** Input required to start the api method */
	Input = void,
	/** The current input coming from the context pipe */
	Pipe = Input,
	/** The api methods response */
	Output = Pipe,
	Service = Bound & { input: Pipe },
> = {
	/**
	 * ### Parse
	 *
	 * Run the piped value
	 */
	<Error = unknown>(data: Input): Promise<Payload<Output, Error>>;

	/**
	 * ### Auth
	 *
	 * Make sure authentication is according to type
	 */
	auth(
		callback: (data: Service) => Promise<any | undefined>,
	): PrepareApi<Bound, Input, Pipe, Output>;

	/**
	 * ### ZOD
	 *
	 * Parse data coming through the last item in the pipe
	 */
	zod<Schema extends ZodSchema, Result = z.infer<Schema>>(
		schema: Schema,
	): PrepareApi<Bound, Input extends void ? Result : Input, Result, Result>;

	/**
	 * ### Map
	 *
	 * Run code without delivering it to API
	 */
	map<
		Callback extends (data: Service) => Promise<any>,
		Result = Awaited<ReturnType<Callback>>,
	>(cb: Callback): PrepareApi<Bound, Input, Result, Result>;

	/**
	 * ### Action
	 *
	 * Run code as a server action
	 */
	action<
		Callback extends (data: Service) => Promise<any>,
		Result = Awaited<ReturnType<Callback>>,
	>(cb: Callback): PrepareApi<Bound, Input, Result, Result>;
};

// -------------------------------------------------
// MARK: Main
// -------------------------------------------------

export default function createApi<Bind extends Record<string, any>>(
	config: Config<Bind>,
) {
	function prepare<Input = void, Output = Input>(
		cb: (input: { input: Input } & Bind) => Promise<Output> = async (t) =>
			t as any,
	): Prettify<PrepareApi<Bind, Input, Output>> {
		const parse = async function parse(
			data: any,
		): Promise<Payload<Output, any>> {
			const bound: Bind =
				typeof config.bind === "function"
					? await config.bind()
					: config.bind || ({} as Bind);

			return Promise.resolve(cb({ ...bound, input: data }))
				.then((data) => payload(data))
				.catch((err) => {
					if (config.handle) return config.handle(err, bound);

					if (["ZodError", "AuthError"].includes(err.name)) {
						return payload(undefined, {
							errors: err.errors.map((error: any) => ({
								field: error.path,
								message: error.message,
							})),
						});
					}

					return payload(undefined, err);
				});
		} as any;

		parse.zod = function zod(schema: ZodSchema) {
			return prepare<any, any>(async (data) => schema.parse(data.input));
		};

		parse.map = (callback: any) =>
			prepare<any, any>((data) =>
				Promise.resolve(callback(data)).then((response) =>
					cb({ ...data, input: response }),
				),
			);

		parse.action = (callback: any) =>
			prepare((data: any) =>
				cb(data).then((response) => callback({ ...data, input: response })),
			);

		parse.auth = (callback: any) =>
			prepare((data: any) =>
				callback(data).then((response: any) => {
					if (response) {
						throw {
							name: "AuthError",
							errors: [response],
						};
					}

					return cb(data);
				}),
			);

		return parse;
	}

	return prepare();
}

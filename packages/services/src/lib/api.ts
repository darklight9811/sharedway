// Types
import type { ZodSchema, z } from "zod"
import type Metadata from "../types/metadata"

// -------------------------------------------------
// Type
// -------------------------------------------------

type Config<Bind extends Record<string, any>> = {
	/**
	 * ### Bind
	 *
	 * Add utility methods to the request object
	 */
	bind?: Bind;
}

export type PrepareApi<
	Bound extends Record<string, any> = {},
	Input = void,
	Output = Input,
	Service = Bound & { input: Input }
> = {
	/**
	 * ### Parse
	 *
	 * Run the piped value
	 */
	(data: Input): Promise<{ data: Output; ok: true; errors: void } | { errors: any; ok: false; data: void }>;

	/**
	 * ### Auth
	 *
	 * Make sure authentication is according to type
	 */
	auth(callback: (data: Service) => Promise<any | void>): PrepareApi<Bound, Input, Output>;

	/**
	 * ### ZOD
	 *
	 * Parse data coming through the last item in the pipe
	 */
	zod<Schema extends ZodSchema, Result = z.infer<Schema>>(
		schema: Schema
	): PrepareApi<
	Bound,
	Input extends void ? Result : Input,
	Result
	>;

	/**
	 * ### Map
	 *
	 * Run code without delivering it to API
	 */
	map<Callback extends (data: Service) => Promise<any>, Result = Awaited<ReturnType<Callback>>>(
		cb: Callback
	): PrepareApi<
	Bound,
	Result,
	Result
	>;

	/**
	 * ### Action
	 *
	 * Run code as a server action
	 */
	action<Callback extends (data: Service) => Promise<any>, Result = Awaited<ReturnType<Callback>>>(
		cb: Callback
	): PrepareApi<
	Bound,
	Input,
	Result
	>;

	/**
	 * ### Service
	 *
	 * Run code as a server action
	 */
	service<Callback extends (data: Output) => (metadata: Metadata) => Promise<any>, Result = Awaited<ReturnType<ReturnType<Callback>>>>(
		cb: Callback,
		metadataBuilder: () => Metadata | Promise<Metadata>,
	): PrepareApi<
	Bound,
	Result,
	Result
	>;
};

// -------------------------------------------------
// Main
// -------------------------------------------------

export default function createApi<Bind extends Record<string, any>>(config: Config<Bind>) {
	const bound = (config.bind || {}) as Bind

	function prepare<Input = void, Output = Input>(
		cb: (input: { input: Input } & Bind) => Promise<Output> = async (t) => t as any,
	): PrepareApi<Bind, Input, Output> {
		const parse: PrepareApi<Bind, Input, Output> = async function parse(
			data: any,
		): Promise<Output> {
			return Promise.resolve(cb({ ...bound, input: data }))
				.then(function (data) {
					return { ok: true, data }
				})
				.catch(function (err) {
					if (
						["ZodError", "AuthError"].includes(err.name)
					) {
						return {
							ok: false,
							errors: err.errors.map((error: any) => ({
								field: error.path,
								message: error.message,
							})),
						} as any
					}


					// we want to unexpected errors to throw the app flow so the dev can fix them
					throw err
				})
		} as any

		parse.zod = function zod(schema: ZodSchema) {
			return prepare<any, z.infer<typeof schema>>(async function (data) {
				return schema.parse(data.input)
			})
		}

		parse.map = function (callback) {
			return prepare<any, any>(function (data) {
				return Promise.resolve(callback({ ...bound, input: data as any })).then(function (response) {
					return cb({ ...bound, input: response })
				})
			})
		}

		parse.action = function (callback) {
			return prepare(function (data) {
				return cb(data).then(function (response) {
					return callback({ ...bound, input: response as any })
				})
			})
		}

		parse.auth = function (callback) {
			return prepare(function (data) {
				return callback(data as any).then(function (response) {
					if (response) {
						throw {
							name: "AuthError",
							errors: [response],
						}
					}

					return cb(data)
				})
			})
		}

		parse.service = function (callback, metadata) {
			return prepare(function (data) {
				return Promise.all([
					cb(data as any),
					metadata(),
				]).then(function ([response, metadata]) {
					return callback(response)(metadata)
				})
			})
		}

		return parse as PrepareApi<typeof bound, Input, Output>
	}

	return prepare()
}
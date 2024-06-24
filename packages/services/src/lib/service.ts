import type Metadata from "../types/metadata";

export default function service<
	T extends Record<
		string,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(properties: any, metadata: Metadata) => unknown
	>,
>(props: T) {
	return Object.fromEntries(
		Object.entries(props).map(([key, value]) => [
			key,
			(prop) => (metadata) => value(prop, metadata),
		]),
	) as {
		[key in keyof T]: (
			props: Partial<Parameters<T[key]>[0]>,
		) => (metadata: Metadata) => ReturnType<T[key]>;
	};
}

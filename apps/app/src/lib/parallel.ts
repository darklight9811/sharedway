import { currentUser } from "@/modules/user/loaders";
import type Metadata from "@repo/services/types/metadata";

export async function buildMetadata() {
	return {
		user: await currentUser(),
	} satisfies Metadata;
}

export default async function parallel<T extends unknown[]>(...props: T) {
	const metadata = await buildMetadata();

	return Promise.all(
		props.map((prop) => (typeof prop === "function" ? prop(metadata) : prop)),
	) as {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		[key in keyof T]: T[key] extends (...args: any) => any
			? Awaited<ReturnType<T[key]>>
			: Awaited<T[key]>;
	};
}

import { currentUser } from "@/modules/user/loaders";
import type Metadata from "@repo/services/types/metadata";
import { headers } from "next/headers";

export async function buildMetadata() {
	return {
		user: await currentUser(),
		ip: headers().get("x-ip") as string,
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

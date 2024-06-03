import { auth } from "@clerk/nextjs/server"

export default function parallel <T extends any[]>(...props: T) {
	const metadata = {
		auth: auth(),
	}

	return Promise.all(props.map(prop => prop(metadata))) as {
		[key in keyof T]: Awaited<ReturnType<Awaited<T[key]>>>
	}
}
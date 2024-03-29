import type Metadata from "../types/metadata"

export default function service<
	T extends Record<string, (properties: any, metadata: Metadata) => any>
>(props: T) {
	return Object.fromEntries(Object.entries(props).map(([key, value]) => [key, (metadata) => (prop) => value(prop, metadata)])) as {
		[key in keyof T]: (props: Partial<Parameters<T[key]>[0]>) => (metadata: Metadata) => ReturnType<T[key]>
	}
}
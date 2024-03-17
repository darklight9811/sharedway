export default function service<T extends Record<string, (...args: any[]) => any>>(props: T) {
	return props
}
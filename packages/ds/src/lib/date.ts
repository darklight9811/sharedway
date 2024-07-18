export function isDate(value: unknown): value is Date {
	return value instanceof Date;
}

function parse(date?: Date) {
	if (!date) return "";

	return date.toLocaleDateString("en").replace(/\//g, "_");
}

export function stringifyDate(value?: Date | { from?: Date; to?: Date }) {
	if (!value || !(value as { from?: string }).from) return "";
	if (isDate(value)) return parse(value as Date);
	if (!value.to) return parse(value.from);
	return `${parse(value.from)}-${parse(value.to)}`;
}

export function parseToDate(value?: string) {
	if (!value) return new Date();
	const [a, b] = value.replace(/\_/g, "/").split("-");
	return { from: a && new Date(a), to: b && new Date(b) };
}

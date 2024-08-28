import type { Prettify } from "../types/prettify";

export type Payload<Data, Error> = Prettify<
	Pick<[error: NonNullable<Error>, data: NonNullable<Data>], 0 | 1> &
		(
			| { ok: true; data: Data; error: never }
			| { ok: false; error: Error; data: never }
		)
>;

export default function payload<Data, Error>(data?: Data, error?: Error) {
	const p = [error, data] as unknown as Payload<Data, Error>;
	p.ok = !error;
	if (data) p.data = data;
	if (error) p.error = error;

	return p;
}

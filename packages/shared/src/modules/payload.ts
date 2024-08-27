export type Payload<Data = undefined, Error = undefined> = Pick<
	[error: Error, data: Data],
	0 | 1
> &
	(
		| { ok: true; data: Data; error: never }
		| { ok: false; error: Error; data: never }
	);

export default function payload<Data = undefined, Error = undefined>(
	data?: Data,
	error?: Error,
) {
	const p = [error, data] as unknown as Payload<Data, Error>;
	p.ok = !error;
	if (data) p.data = data;
	if (error) p.error = error;

	return p;
}

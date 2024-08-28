export type ServiceResponse<
	Metadata,
	Callback extends (arg1: any, arg2: Metadata) => Promise<any>,
> = (
	arg1: Parameters<Callback>[0],
	optMetadata?: Metadata,
) => Metadata extends never
	? ReturnType<Callback>
	: (metadata: Metadata) => ReturnType<Callback>;

export default function createServiceFactory<Metadata = {}>() {
	return function service<
		T extends Record<
			string,
			(properties: any, metadata: Metadata) => Promise<unknown>
		>,
	>(props: T) {
		return Object.fromEntries(
			Object.entries(props).map(([key, value]) => [
				key,
				(prop: any, optMetadata: Metadata) => {
					if (optMetadata) return value(prop, optMetadata);

					return (metadata: Metadata) => value(prop, metadata);
				},
			]),
		) as unknown as {
			[key in keyof T]: ServiceResponse<Metadata, T[key]>;
		};
	};
}

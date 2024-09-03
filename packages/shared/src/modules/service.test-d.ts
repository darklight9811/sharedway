import { describe, expectTypeOf, test } from "vitest";
import createServiceFactory from "./service";

describe("service type tests", () => {
	test("expect argument type to match if passed", () => {
		type Metadata = { ip: string };

		const factory = createServiceFactory<Metadata>();
		const service = factory({ async test(_: string) {} });

		expectTypeOf(service.test).parameter(0).toMatchTypeOf<string>();
	});

	test("expect no arguments if none are passed", () => {
		type Metadata = { ip: string };

		const factory = createServiceFactory<Metadata>();
		const service = factory({ async test() {} });

		expectTypeOf(service.test).parameter(0).toMatchTypeOf<undefined>();
	});

	test("expect metadata to match on arguments", () => {
		type Metadata = { ip: string };

		const factory = createServiceFactory<Metadata>();
		const service = factory({ async test() {} });

		expectTypeOf(service.test)
			.parameter(1)
			.toMatchTypeOf<Metadata | undefined>();
	});

	test("expect metadata to match on currying", () => {
		type Metadata = { ip: string };

		const factory = createServiceFactory<Metadata>();
		const service = factory({ async test(_: string) {} });

		expectTypeOf(service.test("")).parameter(0).toMatchTypeOf<Metadata>();
	});
});

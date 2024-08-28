import { describe, expect, test } from "vitest";

import createServiceFactory from "./service";

describe("service tests", () => {
	test("expect to not throw declaration", () => {
		expect(createServiceFactory).toBeDefined();
	});

	test("expect to not throw on factory", () => {
		expect(createServiceFactory()).toBeDefined();
	});

	test("expect to not throw when curried call", async () => {
		const factory = createServiceFactory();
		const service = factory({
			async test(_: string) {
				return "response";
			},
		});

		expect(await service.test("")({})).toBe("response");
	});

	test("expect to not throw when arguments call", async () => {
		const factory = createServiceFactory();
		const service = factory({
			async test() {
				return "response";
			},
		});

		expect(await service.test(undefined, {})).toBe("response");
	});
});

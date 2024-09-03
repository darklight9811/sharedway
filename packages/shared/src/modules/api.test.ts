import { describe, expect, test } from "vitest";
import { z } from "zod";

import createApi from "./api";

describe("api tests", () => {
	test("expect to not throw declaration", () => {
		expect(createApi).toBeDefined();
	});

	test("expect to not throw implementation", () => {
		expect(createApi({})).toBeDefined();
	});

	test("expect to contain bind information by object", async () => {
		const api = createApi({ bind: { test: "data" } });
		const method = api.action(async ({ test }) => test);
		const response = await method();

		expect(response[1]).toBe("data");
	});

	test("expect to contain bind information by async function", async () => {
		const api = createApi({
			async bind() {
				return { test: "data" };
			},
		});
		const method = api.action(async ({ test }) => test);
		const response = await method();

		expect(response[1]).toBe("data");
	});

	test("expect to proper pipe method 'zod'", async () => {
		const api = createApi({});
		const method = api.zod(z.string());
		const response = await method("response");

		expect(response[1]).toBe("response");
	});

	test("expect to proper handle throw 'zod'", async () => {
		const api = createApi({});
		const method = api.zod(z.string());
		const response = await method({} as any);

		expect(response[1]).toBeUndefined();
		expect(response[0]).toHaveProperty("errors");
	});

	test("expect to proper pipe method 'map'", async () => {
		const api = createApi({});
		const method = api.map(async () => "response");
		const response = await method();

		expect(response[1]).toBe("response");
	});

	test("expect to proper pipe method 'action'", async () => {
		const api = createApi({});
		const method = api.action(async () => "response");
		const response = await method();

		expect(response[1]).toBe("response");
	});

	test("expect to proper handle throw 'action'", async () => {
		const api = createApi({});
		const method = api.action(async () => {
			throw new Error();
		});
		const response = await method();

		expect(response[1]).toBeUndefined();
		expect(response[0]).toBeDefined();
	});
});

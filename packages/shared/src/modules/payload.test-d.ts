import { describe, expectTypeOf, test } from "vitest";

import payload from "./payload";

describe("payload type tests", () => {
	test("expect to return correct tuple response", () => {
		expectTypeOf(payload("data")[1]).toMatchTypeOf<string>();
	});

	test("expect to return correct tuple error", () => {
		expectTypeOf(payload(undefined, "error")[0]).toMatchTypeOf<string>();
	});

	test("expect to return correct object response", () => {
		expectTypeOf(payload("data").data).toMatchTypeOf<string>();
	});

	test("expect to return correct object error", () => {
		expectTypeOf(payload(undefined, "error").error).toMatchTypeOf<string>();
	});

	test("expect ok to be boolean", () => {
		expectTypeOf(payload("data").ok).toMatchTypeOf<boolean>();
	});
});

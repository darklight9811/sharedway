import { describe, expect, test } from "vitest";

import payload from "./payload";

describe("payload tests", () => {
	test("expect to not throw declaration", () => {
		expect(payload).toBeDefined();
	});

	test("expect to not throw on response", () => {
		expect(payload()).toBeDefined();
	});

	test("expect to return correct tuple response", () => {
		expect(payload("data")[1]).toBe("data");
	});

	test("expect to return correct tuple error", () => {
		expect(payload(undefined, "error")[0]).toBe("error");
	});

	test("expect to return correct object response", () => {
		expect(payload("data").data).toBe("data");
	});

	test("expect to return correct object error", () => {
		expect(payload(undefined, "error").error).toBe("error");
	});

	test("expect ok to be true with data", () => {
		expect(payload("data").ok).toBe(true);
	});

	test("expect ok to be false with error", () => {
		expect(payload(undefined, "error").ok).toBe(false);
	});
});

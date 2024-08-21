import { expect, test } from "vitest";

test("Expect env variables to load", async () => {
	await expect(import("./index.mjs")).toBeDefined();
});

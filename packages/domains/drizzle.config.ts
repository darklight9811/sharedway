import zlib from "node:zlib";

import { defineConfig } from "drizzle-kit";

class CompressionStream {
	readable;
	writable;
	constructor(format: "deflate" | "deflate-raw" | "gzip") {
		const handle =
			format === "deflate"
				? zlib.createDeflate()
				: format === "gzip"
					? zlib.createGzip()
					: zlib.createDeflateRaw();
		this.readable = new ReadableStream({
			start(controller) {
				handle.on("data", (chunk) => controller.enqueue(chunk));
				handle.once("end", () => controller.close());
			},
		});
		this.writable = new WritableStream({
			write: (chunk) => {
				handle.write(chunk);
			},
			close: () => {
				handle.end();
			},
		});
	}
}

globalThis.CompressionStream ??= CompressionStream;
globalThis.DecompressionStream ??= CompressionStream;

export default defineConfig({
	out: "./drizze",
	schema: ["./src/domains/*/sql/table.server.ts"],
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
	},
});

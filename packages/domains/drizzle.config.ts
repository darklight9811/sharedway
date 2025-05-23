import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizze",
	schema: ["./src/domains/*/sql/table.server.ts"],
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
	},
});

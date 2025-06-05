import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Hono } from "hono";
import { createHonoServer } from "react-router-hono-server/bun";

import { appRouter, createTRPCContext } from "@repo/domains/server";

const apiRoutes = new Hono().all("/trpc/*", async (c) => {
	const response = await fetchRequestHandler({
		endpoint: "/api/trpc",
		req: c.req.raw,
		router: appRouter,
		onError({ error, path }) {
			console.error(`>>> tRPC Error on '${path}'`, error);
		},
		createContext: () =>
			createTRPCContext({
				headers: c.req.raw.headers,
				req: c.req.raw,
			}),
	});

	for (const [key, value] of c.req.raw.headers) {
		if (["set-cookie"].includes(key.toLowerCase())) response.headers.append(key, value);
	}

	return response;
});

export default await createHonoServer<{}>({
	beforeAll(app) {
		// @ts-ignore
		app.route("/api", apiRoutes);
	},
});

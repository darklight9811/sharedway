import { appRouter, createTRPCContext } from "@repo/domains/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

export const loader = async (args: LoaderFunctionArgs) => {
	return handleRequest(args);
};

export const action = async (args: ActionFunctionArgs) => {
	return handleRequest(args);
};

async function handleRequest(args: LoaderFunctionArgs | ActionFunctionArgs) {
	const response = await fetchRequestHandler({
		endpoint: "/api/trpc",
		req: args.request,
		router: appRouter,
		createContext: () =>
			createTRPCContext({
				headers: args.request.headers,
				req: args.request,
			}),
	});

	for (const [key, value] of args.request.headers) {
		if (["set-cookie"].includes(key.toLowerCase())) response.headers.append(key, value);
	}

	return response;
}

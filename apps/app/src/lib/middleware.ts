import type { NextMiddlewareResult } from "next/dist/server/web/types";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export type CustomMiddleware = (
	request: NextRequest,
	event: NextFetchEvent,
	response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

export function chain(
	functions: MiddlewareFactory[],
	index = 0,
): CustomMiddleware {
	const current = functions[index];

	if (current) {
		const next = chain(functions, index + 1);
		return current(next);
	}

	return (
		_request: NextRequest,
		_event: NextFetchEvent,
		response: NextResponse,
	) => {
		return response;
	};
}

chain.middleware = function middleware(
	handler: (
		next: CustomMiddleware,
		request: NextRequest,
		event: NextFetchEvent,
		response: NextResponse,
	) => Promise<NextMiddlewareResult> | NextMiddlewareResult,
) {
	return function handle(next: CustomMiddleware) {
		return async function handleRunner(
			request: NextRequest,
			event: NextFetchEvent,
			response: NextResponse,
		) {
			return handler(next, request, event, response);
		};
	};
};

chain.start = function start() {
	return chain.middleware(function startMiddleware(next, req, event) {
		return next(req, event, NextResponse.next());
	});
};

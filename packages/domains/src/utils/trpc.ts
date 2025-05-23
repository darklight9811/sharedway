import { initTRPC, TRPCError } from "@trpc/server";
import cookie from "cookie";
import superjson from "superjson";
import { ZodError } from "zod";

import { auth } from "../domains/auth/helpers/auth.server";
import type { UserSchema } from "../domains/users/schema";

export const createTRPCContext = async (opts: { headers: Headers; req: Request }) => {
	const authSession = await auth.api.getSession({
		headers: opts.headers,
	});

	return {
		...opts,
		user: authSession?.user as unknown as UserSchema | undefined,
		cookie: {
			set(name: string, value: string) {
				opts.headers.append(
					"Set-Cookie",
					cookie.serialize(name, value, {
						path: "/",
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
					}),
				);
			},
			get(name: string) {
				const cookieString = opts.headers.get("Cookie");
				if (!cookieString) return null;

				const match = cookie.parse(cookieString);

				return match[name] || null;
			},
			remove(name: string) {
				opts.headers.append(
					"Set-Cookie",
					cookie.serialize(name, "", {
						maxAge: 0,
						path: "/",
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
					}),
				);
			},
		},
	};
};
type Context = Awaited<ReturnType<typeof createTRPCContext>>;
const trpc = initTRPC.context<Context>().create({
	transformer: superjson,
	errorFormatter: ({ shape, error }) => ({
		...shape,
		data: {
			...shape.data,
			zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
		},
	}),
});

export const createCallerFactory = trpc.createCallerFactory;
export const createTRPCRouter = trpc.router;
export const publicProcedure = trpc.procedure;

export const protectedProcedure = trpc.procedure.use(({ ctx, next }) => {
	if (!ctx.user?.id) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	return next({
		ctx: {
			user: ctx.user,
		},
	});
});

export const t = {
	router: trpc.router,
	route: trpc.procedure,
	protected: protectedProcedure,
};

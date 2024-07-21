import { PrismaClient } from "@prisma/client";

import type { Prisma } from "@prisma/client";
import type { Paginated } from "../types/paginated";

import { env } from "@repo/env";

// -------------------------------------------------
// Types
// -------------------------------------------------

type PaginationArgs<
	Input,
	Output extends Record<string, unknown> = Record<string, unknown>,
> = {
	page?: number;
	limit?: number;

	map?: (data: Input) => Output | Promise<Output>;
};

// -------------------------------------------------
// Methods
// -------------------------------------------------

function getPrisma() {
	return new PrismaClient({
		log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
	}).$extends({
		name: "paginate",
		model: {
			$allModels: {
				async paginate<
					T,
					Args,
					Result extends Prisma.Result<T, Args, "findMany">,
					Options extends PaginationArgs<Result[number]>,
				>(
					this: T,
					args: Prisma.Exact<
						Args,
						Omit<Prisma.Args<T, "findMany">, "cursor" | "take" | "skip">
					> &
						Options,
				) {
					const {
						page = 1,
						limit = 25,
						select,
						where,
						orderBy,
					} = (args || {}) as any;

					return Promise.all([
						(this as any)
							.findMany({
								select,
								where,
								skip: (page - 1) * limit,
								take: limit,
								orderBy,
							})
							.then(function x(result: any) {
								return args.map ? Promise.all(result.map(args.map)) : result;
							}),
						(this as any)
							.aggregate({
								_count: { id: true },
								select: { _count: true },
								where,
							})
							.then((response: any) => ({
								page,
								pages: Math.ceil(response._count.id / limit),
								total: response._count.id,
								limit,
							})),
					]) as Promise<
						[
							Options["map"] extends (...args: any[]) => any
								? Awaited<ReturnType<Options["map"]>>[]
								: Result,
							Omit<Paginated, "data">,
						]
					>;
				},
			},
		},
	});
}

const globalForPrisma = globalThis as unknown as {
	db: ReturnType<typeof getPrisma>;
};

export const db = globalForPrisma.db || getPrisma();

if (env.NODE_ENV !== "production") globalForPrisma.db = db;

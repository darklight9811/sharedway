import { z } from "zod";

const pagination = z.object({
	page: z.coerce.number().default(1).optional(),
	limit: z.coerce.number().default(25).optional(),
	order: z.coerce.string().optional(),
	sort: z.enum(["asc", "desc"]).default("asc").optional(),

	q: z.coerce.string().optional(),
});

export default pagination;

export type Pagination = z.infer<typeof pagination>;

export const entityPagination = pagination.extend({
	user: z.string().optional(),
	date_disappeared: z
		.string()
		.transform((t) => {
			const [a, b] = t.replace(/\_/g, "/").split("-");

			return {
				from: a && new Date(a),
				to: b && new Date(b),
			};
		})
		.optional(),
});

export type EntityPagination = z.infer<typeof entityPagination>;

import { z } from "zod";

const pagination = z.object({
	page: z.coerce.number().optional().default(1),
	limit: z.coerce.number().optional().default(16),
	order: z.coerce.string().optional(),
	sort: z.enum(["asc", "desc"]).optional().default("asc"),

	q: z.coerce.string().optional(),
});

export default pagination;

export type Pagination = z.infer<typeof pagination>;

export const profilePagination = pagination.extend({
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

export type ProfilePagination = z.infer<typeof profilePagination>;

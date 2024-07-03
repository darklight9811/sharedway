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

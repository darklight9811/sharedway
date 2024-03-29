import { z } from "zod"

const pagination = z.object({
	page: z.coerce.number().default(1),
	limit: z.coerce.number().default(25),
	order: z.coerce.string().optional(),
	sort: z.enum(["asc", "desc"]).default("asc"),

	q: z.coerce.string().optional(),
}).default({})

export default pagination

export type Pagination = z.infer<typeof pagination>
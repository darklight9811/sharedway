import { z } from "zod"

const pagination = z.object({
	page: z.coerce.number().default(1),
	limit: z.coerce.number().default(25),
	order: z.coerce.string().nullable(),
	sort: z.enum(["asc", "desc"]).default("asc"),

	q: z.coerce.string().nullable(),
})

export default pagination

export type Pagination = z.infer<typeof pagination>
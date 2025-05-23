import { v, type ZodType } from "@repo/ds/v";

export const paginationSchema = v
	.object({
		page: v.coerce.number().default(1),
		limit: v.coerce.number().default(25),
		q: v.coerce.string().optional(),
	})
	.default({});

export type PaginationSchema = v.infer<typeof paginationSchema>;

export function paginatedSchema<Response extends ZodType>(schema: Response) {
	return v
		.object({
			data: v.array(schema),
			pages: v.number(),
			items: v.number(),
		})
		.and(paginationSchema);
}

export function dataSchema<Response extends ZodType>(schema: Response) {
	return v
		.object({
			data: schema,
		})
		.transform((d) => d.data);
}

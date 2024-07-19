import { z } from "zod";

const report = z.object({
	reason: z.enum(["offensive", "not_missing", "ownership", "other"]),
	description: z.string().optional(),
});

export default report;

export type Report = z.infer<typeof report>;

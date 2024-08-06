import { z } from "zod";
import { zfd } from "zod-form-data";

const report = zfd.formData({
	reason: z.enum(["offensive", "not_missing", "ownership", "other"]),
	description: z.string().optional(),

	id_profile: z.string().cuid().optional(),
	id_user: z.string().cuid().optional(),
});

export default report;

export type Report = z.infer<typeof report>;

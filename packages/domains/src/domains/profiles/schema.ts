import v from "@repo/ds/lib/v/index";

export const insertProfileSchema = v.object({
	type: v.enum(["human", "animal"]).default("human"),
	name: v.string().min(1),
	description: v.string().optional(),
	disappearedAt: v.coerce.date(),
	data: v.object({
		age: v.coerce.number(),
		race: v.string().optional(),
		gender: v.enum(["male", "female", "other"]),
	}),
	contact: v.object({
		options: v.array(
			v.object({
				type: v.enum(["email", "phone", "whatsapp", "facebook", "instagram"]),
				value: v.string().min(1),
			}),
		),
		description: v.string().optional(),
	}),
});
export type InsertProfileSchema = v.infer<typeof insertProfileSchema>;

export const updateProfileSchema = insertProfileSchema.partial();
export type UpdateProfileSchema = v.infer<typeof updateProfileSchema>;

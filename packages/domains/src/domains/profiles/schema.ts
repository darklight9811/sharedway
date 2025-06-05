import v from "@repo/ds/lib/v/index";

export const insertProfileSchema = v.object({
	type: v.enum(["human", "animal"]).default("human").optional(),
	name: v.string().min(1),
	description: v.string().optional(),
	disappearedAt: v.date(),

	data: v.object({
		age: v.coerce.number(),
		race: v.string().optional(),
		gender: v.enum(["male", "female", "other"]),
	}),

	addresses: v.array(
		v.object({
			district: v.string().min(1),
			city: v.string().min(1),
			state: v.string().min(1),
			zipCode: v.string().min(1),
			country: v.string().min(1),
		}),
	),

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

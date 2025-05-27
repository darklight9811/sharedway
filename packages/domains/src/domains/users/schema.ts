import { v } from "@repo/ds/v";

export const userFormSchema = v.formData({
	type: v.enum(["user", "admin", "dev"]).default("user"),
	name: v.string(),
	image: v.string().optional().nullable(),
	email: v.string().email(),
	email_verified: v.boolean().default(false),
});

export type UserFormSchema = v.infer<typeof userFormSchema>;

export const userSchema = v.formData(
	v
		.object({
			id: v.id(),
		})
		.and(userFormSchema),
);

export type UserSchema = v.infer<typeof userSchema>;

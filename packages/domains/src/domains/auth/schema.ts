import { v } from "@/ds/v";

export const registerSchema = v.object({
	name: v.string().min(2).optional(),
	email: v.string().email(),
	password: v.string(),
});

export type RegisterSchema = v.infer<typeof registerSchema>;

export const loginSchema = v.object({
	email: v.string().email().min(5),
	password: v.string().min(8),
});

export type LoginSchema = v.infer<typeof loginSchema>;

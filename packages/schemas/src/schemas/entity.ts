import { z } from "zod"
import { zfd } from "zod-form-data"

const entityData = z.object({
	id: z.string().cuid(),
	age: z.coerce.number(),
	race: z.string(),
	gender: z.enum(["male", "female", "other"]),
})

const address = z.object({
	id: z.string().cuid(),
	district: z.string(),
	city: z.string(),
	state: z.string(),
})

const entity = z.object({
	name: z.string(),

	data: entityData.omit({ id: true }),

	description: z.string().default(""),

	pictures: zfd.repeatableOfType(z.any().transform(t => t as File)),

	addresses: z.array(address),
})

export default entity

export type EntitySchema = z.infer<typeof entity>

export const entityStoreSchema = zfd.formData({
	name: z.string(),

	data: entityData.omit({ id: true }),

	description: z.string().default(""),

	pictures: zfd.repeatableOfType(z.any().transform(t => t as File)),

	addresses: z.array(address.omit({ id: true })),
})

export type EntityStoreSchema = z.infer<typeof entityStoreSchema>

export const entityUpdateSchema = zfd.formData(z.object({
	name: z.string(),

	data: entityData.omit({ id: true }),

	description: z.string().default(""),

	pictures: zfd.repeatableOfType(z.any().transform(t => t as File | { id: string; remove: boolean })),

	addresses: z.array(address),
}).partial())

export type EntityUpdateSchema = z.infer<typeof entityUpdateSchema>
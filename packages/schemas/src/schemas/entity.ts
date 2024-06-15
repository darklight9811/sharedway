import { z } from "zod"
import { zfd } from "zod-form-data"

const entity = z.object({
	type: z.enum(["person", "animal"]).default("person"),
	name: z.string(),
	description: z.string().default(""),
})

export default entity

export type EntitySchema = z.infer<typeof entity>

export const entityStoreSchema = zfd.formData({
	name: z.string(),

	data: z.object({
		age: z.coerce.number(),
		race: z.string(),
		gender: z.enum(["male", "female", "other"]),
	}),

	description: z.string().default(""),

	images: zfd.repeatableOfType(z.any().transform(t => t as File)),

	addresses: z.array(z.object({
		district: z.string(),
		city: z.string(),
		state: z.string(),
	})),
})

export type EntityStoreSchema = z.infer<typeof entityStoreSchema>
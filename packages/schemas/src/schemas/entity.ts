import { z } from "zod"

const entity = z.object({
	type: z.enum(["person", "animal"]).default("person"),
	name: z.string(),
	description: z.string().default(""),
})

export default entity

export type Entity = z.infer<typeof entity>
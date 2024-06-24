import { z } from "zod";

const user = z.object({
	id: z.string().cuid(),
	name: z.string(),
	email: z.string().email(),
});

export default user;

export type User = z.infer<typeof user>;

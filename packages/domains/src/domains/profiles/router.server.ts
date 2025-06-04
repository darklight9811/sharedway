import v from "@repo/ds/lib/v/index";

import { t } from "../../utils/trpc";
import { paginationSchema } from "../app/schema";
import { insertProfileSchema, updateProfileSchema } from "./schema";
import { profileService } from "./service.server";

export const profilesRouter = t.router({
	index: t.route.input(paginationSchema).query(({ ctx, input }) => profileService.index(input, ctx.user)),

	store: t.protected.input(insertProfileSchema).mutation(({ ctx, input }) => profileService.store(input, ctx.user)),

	show: t.route
		.input(v.object({ id: v.string() }))
		.query(({ ctx, input }) => profileService.show(input.id, ctx.user)),

	update: t.protected
		.input(v.object({ id: v.string(), data: updateProfileSchema }))
		.mutation(({ ctx, input }) => profileService.update(input.id, input.data, ctx.user)),

	delete: t.protected
		.input(v.object({ id: v.string() }))
		.mutation(({ ctx, input }) => profileService.delete(input.id, ctx.user)),
});

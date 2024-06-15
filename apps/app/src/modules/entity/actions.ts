"use server"

import api from "@/lib/api"
import { buildMetadata } from "@/lib/parallel"
import { entityStoreSchema } from "@repo/schemas/entity"
import entityService from "@repo/services/entity"

export const register = api
	.zod(entityStoreSchema)
	.service(entityService.store, buildMetadata)
	.action(async function ({ input }) {
		return {
			redirect: `/entities/${input.id}`,
		}
	})
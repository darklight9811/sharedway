"use server";

import { z } from "zod";
import api from "@/lib/api";
import { buildMetadata } from "@/lib/parallel";
import { entityStoreSchema, entityUpdateSchema } from "@repo/schemas/entity";
import entityService from "@repo/services/entity";

export const store = api
	.zod(entityStoreSchema)
	.service(entityService.store, buildMetadata)
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	.action(async ({ input }: any) => ({
		redirect: `/entities/${input.id}`,
	}));

export const update = api
	.zod(z.object({ id: z.string().cuid(), data: entityUpdateSchema }))
	.service(entityService.update, buildMetadata)
	.action(async () => ({
		reload: true,
	}));

export const remove = api
	.zod(z.string())
	.service(entityService.delete, buildMetadata)
	.action(async () => ({
		redirect: "/",
		message: "Apagado com sucesso",
	}));

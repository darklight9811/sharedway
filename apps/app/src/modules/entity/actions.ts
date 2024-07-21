"use server";

import api from "@/lib/api";
import { buildMetadata } from "@/lib/parallel";
import { entityStoreSchema, entityUpdateSchema } from "@repo/schemas/entity";
import pagination from "@repo/schemas/pagination";
import entityService from "@repo/services/entity";
import { z } from "zod";

export const index = api
	.zod(pagination)
	.service(entityService.index, buildMetadata);

export const store = api
	.zod(entityStoreSchema)
	.service(entityService.store, buildMetadata)
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

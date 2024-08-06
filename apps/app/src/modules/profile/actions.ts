"use server";

import api from "@/lib/api";
import { buildMetadata } from "@/lib/parallel";
import pagination from "@repo/schemas/pagination";
import { profileStoreSchema, profileUpdateSchema } from "@repo/schemas/profile";
import profileService from "@repo/services/profile";
import { z } from "zod";

export const index = api
	.zod(pagination)
	.service(profileService.index, buildMetadata);

export const store = api
	.zod(profileStoreSchema)
	.service(profileService.store, buildMetadata)
	.action(async ({ input }: any) => ({
		redirect: `/profiles/${input.id}`,
	}));

export const update = api
	.zod(z.object({ id: z.string().cuid(), data: profileUpdateSchema }))
	.service(profileService.update, buildMetadata)
	.action(async () => ({
		reload: true,
	}));

export const remove = api
	.zod(z.string())
	.service(profileService.delete, buildMetadata)
	.action(async () => ({
		redirect: "/",
		message: "Apagado com sucesso",
	}));

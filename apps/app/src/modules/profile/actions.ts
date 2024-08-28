"use server";

import api, { apiService } from "@/lib/api";
import pagination from "@repo/schemas/pagination";
import { profileStoreSchema, profileUpdateSchema } from "@repo/schemas/profile";
import profileService from "@repo/services/profile";
import { z } from "zod";

export const index = api
	.zod(pagination)
	.action(apiService(profileService.index));

export const store = api
	.zod(profileStoreSchema)
	.action(apiService(profileService.store))
	.action(async ({ input }) => ({
		redirect: `/profiles/${input!.id}`,
	}));

export const update = api
	.zod(z.object({ id: z.string().cuid(), data: profileUpdateSchema }))
	.action(apiService(profileService.update))
	.action(async () => ({
		reload: true,
	}));

export const remove = api
	.zod(z.string())
	.action(apiService(profileService.delete))
	.action(async () => ({
		redirect: "/",
		message: "Apagado com sucesso",
	}));

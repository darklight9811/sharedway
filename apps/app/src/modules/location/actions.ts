"use server";

import api, { apiService } from "@/lib/api";
import pagination from "@repo/schemas/pagination";
import locationService from "@repo/services/location";

export const states = api
	.zod(pagination)
	.action(apiService(locationService.state));

"use server";

import api from "@/lib/api";
import { buildMetadata } from "@/lib/parallel";
import pagination from "@repo/schemas/pagination";
import locationService from "@repo/services/location";

export const states = api
	.zod(pagination)
	.service(locationService.state, buildMetadata);

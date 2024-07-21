"use server";

import api from "@/lib/api";
import { buildMetadata } from "@/lib/parallel";
import report from "@repo/schemas/report";
import reportService from "@repo/services/report";

export const store = api
	.zod(report)
	.service(reportService.store, buildMetadata)
	.action(async () => ({
		replace: true,
	}));

"use server";

import api, { apiService } from "@/lib/api";
import report from "@repo/schemas/report";
import reportService from "@repo/services/report";

export const store = api
	.zod(report)
	.action(apiService(reportService.store))
	.action(async () => ({
		replace: true,
	}));

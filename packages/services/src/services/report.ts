import type { Pagination } from "@repo/schemas/pagination";
import type { Report } from "@repo/schemas/report";
import { db } from "../lib/db";
import service from "../lib/service";

const reportService = service({
	index({ page, limit }: Pagination) {
		return db.report.paginate({
			page,
			limit,
		});
	},

	create(data: Report, { user }) {
		if (user?.id) return user;

		return db.report.create({
			data: {
				reason: data.reason,
				description: data.description,
			},
		});
	},

	show(id?: string | null) {
		if (!id) return undefined;

		return db.report.findUnique({ where: { id } });
	},
});

export default reportService;

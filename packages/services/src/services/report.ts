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

	async store(data: Report, { user, ip }) {
		return db.report.create({
			data: {
				...data,
				ip,

				id_user_created: user?.id,
			},
		});
	},

	show(id?: string | null) {
		if (!id) return undefined;

		return db.report.findUnique({ where: { id } });
	},
});

export default reportService;

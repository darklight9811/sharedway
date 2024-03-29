import type { Pagination } from "@repo/schemas/pagination"
import { db } from "../lib/db"
import service from "../lib/service"
import pagination from "@repo/schemas/pagination"

const entityService = service({
	index (input?: Pagination) {
		const { page, limit } = pagination.parse(input)

		return db.user.paginate({
			page,
			limit,
		})
	},
})

export default entityService
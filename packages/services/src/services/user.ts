import type { Pagination } from "@repo/schemas/pagination"
import { db } from "../lib/db"
import service from "../lib/service"

const userService = service({
	index ({page, limit}: Pagination) {
		return db.user.paginate({
			page,
			limit,
		})
	},
})

export default userService
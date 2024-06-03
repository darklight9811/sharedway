import type { Pagination } from "@repo/schemas/pagination"
import type { User } from "@repo/schemas/user"
import { db } from "../lib/db"
import service from "../lib/service"

const userService = service({
	index ({page, limit}: Pagination) {
		return db.user.paginate({
			page,
			limit,
		})
	},

	create (data: User) {
		return db.user.create({
			data: {
				name: data.name,
				email: data.email,

				auth_provider: "clerk",
				auth_value: data.id,
			},
		})
	},

	show (id?: string | null) {
		if (!id) return undefined

		return db.user.findUnique({ where: { id } })
	},
})

export default userService
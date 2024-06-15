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

	create (data: User & { emailVerified: Date }, { user }) {
		if (user?.id) return user

		return db.user.create({
			data: {
				name: data.name,
				email: data.email,
				emailVerified: data.emailVerified,

				auth_provider: "clerk",
				auth_value: data.id,
			},
		})
	},

	show (id?: string | null) {
		if (!id) return undefined

		return db.user.findUnique({ where: { id } })
	},

	byProvider ({ provider, value }: { provider: string; value: string }) {
		if (!value) return undefined

		return db.user.findFirst({
			where: {
				auth_provider: provider,
				auth_value: value,
			},

			select: {
				id: true,
				name: true,
				email: true,
				emailVerified: true,
			},
		})
	},
})

export default userService
import type { Pagination } from "@repo/schemas/pagination"
import type { Entity } from "@repo/schemas/entity"
import { db } from "../lib/db"
import service from "../lib/service"
import pagination from "@repo/schemas/pagination"
import entity from "@repo/schemas/entity"

const entityService = service({
	index (input?: Pagination) {
		const { page, limit } = pagination.parse(input)

		return db.entity.paginate({
			page,
			limit,
			map(entry) {
				return {
					...entry,
					img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Tabby_Kitten_on_Blue_Throw.jpg/220px-Tabby_Kitten_on_Blue_Throw.jpg",
				}
			},
		})
	},

	async store (input: Entity, { user }) {
		const data = entity.parse(input)
		const response = await db.entity.create({
			data: {
				...data,
				user_created: {
					connect: {
						id: user,
					},
				},
			},
		})

		return response
	},

	show (id: string) {
		return db.entity.findUnique({
			where: { id },
		}).then(t => t ? ({
			...t,
			img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Tabby_Kitten_on_Blue_Throw.jpg/220px-Tabby_Kitten_on_Blue_Throw.jpg",
		}) : null)
	},
})

export default entityService
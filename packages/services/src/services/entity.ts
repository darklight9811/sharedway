import type { Pagination } from "@repo/schemas/pagination"
import type { EntityStoreSchema } from "@repo/schemas/entity"
import { db } from "../lib/db"
import service from "../lib/service"
import pagination from "@repo/schemas/pagination"
import { entityStoreSchema } from "@repo/schemas/entity"
import uploader from "../lib/uploader"

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

	async store (input: EntityStoreSchema, { user }) {
		const data = entityStoreSchema.parse(input)

		const files = await uploader.uploadFiles(data.images)

		const response = await db.entity.create({
			data: {
				name: data.name,
				type: "person",
				description: data.description,
				user_created: {
					connect: {
						id: user!.id,
					},
				},
				data: {
					create: {
						age: data.data.age,
						gender: data.data.gender,
						race: data.data.race,
					},
				},
				addresses: {
					createMany: {
						data: data.addresses,
					},
				},
				pictures: {
					createMany: {
						data: files.filter(t => t).map(function (file) {
							return {
								url: file.data!.url,
							}
						}),
					},
				},
			},

			select: {
				id: true,
			},
		})

		return response
	},

	show (id: string) {
		return db.entity.findUnique({
			where: { id },
			select: {
				id: true,
				date_created: true,
				name: true,
				type: true,
				user_created: {
					select: {
						id: true,
						name: true,
					},
				},
				description: true,
				data: true,
				addresses: {
					take: 10,
				},
				pictures: {
					take: 10,
				},
			},
		})
	},
})

export default entityService
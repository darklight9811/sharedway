import type { Pagination } from "@repo/schemas/pagination";
import type {
	EntityStoreSchema,
	EntityUpdateSchema,
} from "@repo/schemas/entity";
import { db } from "../lib/db";
import service from "../lib/service";
import pagination from "@repo/schemas/pagination";
import { entityStoreSchema } from "@repo/schemas/entity";
import uploader from "../lib/uploader";

const entityService = service({
	/**
	 * ### MARK: Index
	 *
	 * Display a paginable list of entities
	 *
	 * @param input
	 * @returns
	 */
	index(input?: Pagination) {
		const { page, limit } = pagination.parse(input);

		return db.entity.paginate({
			page,
			limit,
			select: {
				id: true,
				date_created: true,
				name: true,
				pictures: {
					take: 1,
				},
			},
		});
	},

	/**
	 * ### MARK: Store
	 *
	 * Stores an entity with all information on it
	 *
	 * @param input
	 * @param metadata
	 * @returns
	 */
	async store(input: EntityStoreSchema, { user }) {
		const data = entityStoreSchema.parse(input);
		if (!user) return null;

		// TODO remove hardlimit into a feature flag
		const count = await db.entity.count({
			where: { id_user_created: user.id },
		});
		if (count >= 5) {
			throw new Error("Max entity quantity created");
		}

		const files = await uploader.uploadFiles(data.pictures);

		const response = await db.entity.create({
			data: {
				name: data.name,
				type: "person",
				description: data.description,
				user_created: {
					connect: {
						id: user.id,
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
						data: files
							.filter((t) => t?.data)
							.map((file) => ({
								key: file.data?.key || "",
								url: file.data?.url || "",
							})),
					},
				},
			},

			select: {
				id: true,
			},
		});

		return response;
	},

	/**
	 * ### MARK: Show
	 *
	 * Display full information about an entity
	 */
	show(id: string) {
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
		});
	},

	/**
	 * ### MARK: Update
	 *
	 * Update parts of the field of the entity
	 */
	async update(payload: { id: string; data: Partial<EntityUpdateSchema> }) {
		const add_files: File[] = [];
		const remove_files: { id: string; remove: boolean }[] = [];

		if (payload.data.pictures) {
			for (let i = 0; i < payload.data.pictures.length; i++) {
				const value = payload.data.pictures[i];

				if ((value as { remove: boolean }).remove)
					remove_files.push(value as (typeof remove_files)[number]);
				if ((value as File).size) add_files.push(value as File);
			}
		}

		await Promise.all([
			// add pictures
			add_files.length > 0 &&
				db.$transaction(async (tx) => {
					const files = await uploader.uploadFiles(add_files);

					await tx.entity.update({
						where: { id: payload.id },
						data: {
							pictures: {
								createMany: {
									data: files
										.filter((t) => t?.data)
										.map((file) => ({
											key: file.data?.key || "",
											url: file.data?.url || "",
										})),
								},
							},
						},
					});
				}),
			// remove pictures
			remove_files.length > 0 &&
				db.$transaction(async (tx) => {
					const key_files = await tx.entityPicture.findMany({
						where: { id: { in: remove_files.map((t) => t.id) } },
					});
					await uploader.deleteFiles(key_files.map((t) => t.key));

					await tx.entity.update({
						where: { id: payload.id },
						data: {
							pictures: {
								deleteMany: {
									id: { in: key_files.map((t) => t.id) },
								},
							},
						},
					});
				}),
			// handle data
			db.entity.update({
				where: { id: payload.id },
				data: {
					name: payload.data.name,
					description: payload.data.description,
					data: {
						update: payload.data.data,
					},
					addresses: {
						update: {
							where: { id: payload.data.addresses?.[0].id || "" },
							data: payload.data.addresses?.[0] || "",
						},
					},
				},
			}),
		]);
	},

	/**
	 * ### MARK: Delete
	 *
	 * Remove an entity permanently
	 *
	 * @param id
	 * @param param1
	 */
	async delete(id: string, { user }) {
		if (!user) return null;

		const data = await db.entity.findFirst({
			where: {
				id,
				id_user_created: user.id,
			},
			select: {
				id: true,
				pictures: {
					select: {
						key: true,
					},
				},
			},
		});

		if (!data) throw new Error("no");

		return db.$transaction(async (tx) => {
			return Promise.all([
				tx.entity.delete({ where: { id } }),
				uploader.deleteFiles(data?.pictures.map((t) => t.key)),
			]);
		});
	},
});

export default entityService;

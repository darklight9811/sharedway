import type { ProfilePagination } from "@repo/schemas/pagination";
import { profilePagination } from "@repo/schemas/pagination";
import type {
	ProfileFindSchema,
	ProfileStoreSchema,
	ProfileUpdateSchema,
} from "@repo/schemas/profile";
import { profileStoreSchema } from "@repo/schemas/profile";
import { db } from "../lib/db";
import service from "../lib/service";
import uploader from "../lib/uploader";

const profileService = service({
	/**
	 * ### MARK: Index
	 *
	 * Display a paginable list of profiles
	 *
	 * @param input
	 * @returns
	 */
	index(input?: ProfilePagination & { user?: string }) {
		const { page, limit, q, order, sort, date_disappeared } =
			profilePagination.parse(input);

		return db.profile.paginate({
			page,
			limit,
			orderBy: [
				{
					reports: {
						_count: "asc",
					},
				},
				{
					[order || "name"]: sort || "asc",
				},
			],
			where: {
				...(q
					? {
							OR: [{ name: { contains: q, mode: "insensitive" } }],
						}
					: {}),
				...(date_disappeared
					? {
							date_disappeared: {
								gte: date_disappeared.from,
								...(date_disappeared.to ? { lte: date_disappeared.to } : {}),
							},
						}
					: {}),

				reports: {
					every: {
						OR: [{ id_profile: null }, { reason: { not: "offensive" } }],
					},
				},
				date_disappeared: { not: null },
			},
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
	 * Stores an profile with all information on it
	 *
	 * @param input
	 * @param metadata
	 * @returns
	 */
	async store(input: ProfileStoreSchema, { user }) {
		const data = profileStoreSchema.parse(input);
		if (!user) return null;

		// TODO remove hardlimit into a feature flag
		const count = await db.profile.count({
			where: { id_user_created: user.id },
		});
		if (count >= 5) {
			throw new Error("Max profile quantity created");
		}

		const files = await uploader.uploadFiles(data.pictures);

		const response = await db.profile.create({
			data: {
				name: data.name,
				type: "person",
				date_disappeared: data.date_disappeared,
				description: data.description,
				user_created: {
					connect: {
						id: user.id,
					},
				},
				contact: {
					create: {
						description: input.contact.description,
						options: input.contact.options,
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
	 * Display full information about an profile
	 */
	show(id: string) {
		return db.profile.findUnique({
			where: { id },
			select: {
				id: true,
				date_created: true,
				date_disappeared: true,
				date_found: true,
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
				contact: true,
				addresses: {
					take: 10,
				},
				pictures: {
					take: 10,
				},
				reports: {
					select: {
						reason: true,
						id_user_created: true,
						ip: true,
					},
				},
			},
		});
	},

	/**
	 * ### MARK: Update
	 *
	 * Update parts of the field of the profile
	 */
	async update(payload: { id: string; data: Partial<ProfileUpdateSchema> }) {
		const add_files: File[] = [];
		const remove_files: { id: string; remove: boolean }[] = [];
		const profile = await db.profile.findUnique({ where: { id: payload.id } })

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
				db.$transaction(
					async (tx) => {
						const files = await uploader.uploadFiles(add_files);

						await tx.profile.update({
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
					},
					{ maxWait: 5000, timeout: 10000 },
				),
			// remove pictures
			remove_files.length > 0 &&
				db.$transaction(async (tx) => {
					const key_files = await tx.profilePicture.findMany({
						where: { id: { in: remove_files.map((t) => t.id) } },
					});
					await uploader.deleteFiles(key_files.map((t) => t.key));

					await tx.profile.update({
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
			db.profile.update({
				where: { id: payload.id },
				data: {
					name: payload.data.name,
					description: payload.data.description,
					date_disappeared: payload.data.date_disappeared,
					date_found: payload.data.date_disappeared ? null : profile?.date_found,
					data: {
						update: payload.data.data,
					},
					contact: {
						upsert: {
							where: {
								id_profile: payload.id,
							},
							create: {
								description: payload.data.contact?.description,
								options: payload.data.contact?.options || [],
							},
							update: {
								description: payload.data.contact?.description,
								options: payload.data.contact?.options || [],
							},
						},
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
	 * ### MARK: Find
	 * 
	 * Update found status for the profile
	 * 
	 * @param param0 
	 * @returns 
	 */
	async find ({ id, data }: { id: string; data: ProfileFindSchema }) {
		return db.profile.update({
			where: { id },
			data: {
				date_found: data.date_found,
				date_disappeared: null,
			},
		})
	},

	/**
	 * ### MARK: Delete
	 *
	 * Remove an profile permanently
	 *
	 * @param id
	 * @param param1
	 */
	async delete(id: string, { user }) {
		if (!user) return null;

		const data = await db.profile.findFirst({
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
				tx.profile.delete({ where: { id } }),
				uploader.deleteFiles(data?.pictures.map((t) => t.key)),
			]);
		});
	},
});

export default profileService;

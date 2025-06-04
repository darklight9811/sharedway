import { count, eq } from "drizzle-orm";

import { db } from "../../../utils/db";
import type { PaginationSchema } from "../../app/schema";
import type { UserSchema } from "../../users/schema";
import type { InsertProfileSchema, UpdateProfileSchema } from "../schema";
import { profiles } from "./table.server";

/**
 * ### MARK: profile SQL
 *
 * This stores all access to database to segregate from any other
 * business rule related to profiles.
 */
export const profileSQL = {
	/**
	 * ### MARK: index
	 */
	index(pagination: PaginationSchema, user?: UserSchema | null) {
		return Promise.all([
			db.query.profiles.findMany({
				limit: pagination.limit,
				offset: pagination.limit * (pagination.page - 1),
				orderBy: (table, { desc }) => [desc(table.createdAt)],
			}),
			db
				.select({ count: count() })
				.from(profiles)
				.limit(pagination.limit)
				.offset(pagination.limit * (pagination.page - 1))
				.then((response) => ({
					...pagination,
					items: response[0].count,
					pages: Math.ceil(response[0].count / pagination.limit),
				})),
		]);
	},

	/**
	 * ### MARK: store
	 */
	store(payload: InsertProfileSchema, user: UserSchema) {
		return db
			.insert(profiles)
			.values(payload)
			.returning()
			.then((t) => t[0]);
	},

	/**
	 * ### MARK: show
	 */
	async show(id: string, user?: UserSchema) {
		return db.query.profiles.findFirst({
			where: (table, { eq }) => eq(table.id, id),
		});
	},

	/**
	 * ### MARK: update
	 */
	update(id: string, payload: UpdateProfileSchema, user: UserSchema) {
		return db
			.update(profiles)
			.set(payload)
			.where(eq(profiles.id, id))
			.returning()
			.then((t) => t[0]);
	},

	/**
	 * ### MARK: delete
	 */
	delete(id: string, user: UserSchema) {
		return db
			.delete(profiles)
			.where(eq(profiles.id, id))
			.returning()
			.then((t) => t[0]);
	},
};

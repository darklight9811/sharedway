import { count, eq, or } from "drizzle-orm";

import { db } from "../../../utils/db";
import type { PaginationSchema } from "../../app/schema";
import type { UserSchema } from "../schema";
import { users } from "./table.server";

/**
 * ### MARK: user SQL
 *
 * This stores all access to database to segregate from any other
 * business rule related to users.
 */
export const userSQL = {
	/**
	 * ### MARK: index
	 */
	index(pagination: PaginationSchema, user?: UserSchema | null) {
		return Promise.all([
			db.query.users.findMany({
				limit: pagination.limit,
				offset: pagination.limit * (pagination.page - 1),
				orderBy: (table, { desc }) => [desc(table.createdAt)],
			}),
			db
				.select({ count: count() })
				.from(users)
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
	 * ### MARK: show
	 */
	async show(id: string, user?: UserSchema) {
		return db.query.users.findFirst({
			where: (table, { eq }) => eq(table.id, id),
		}) as Promise<UserSchema>;
	},

	/**
	 * ### MARK: update
	 */
	update(id: string, payload: Partial<typeof users.$inferInsert>) {
		return db
			.update(users)
			.set(payload)
			.where(eq(users.id, id))
			.returning()
			.then((t) => t[0]);
	},

	/**
	 * ### MARK: delete
	 */
	delete(id: string) {
		return db
			.delete(users)
			.where(eq(users.id, id))
			.returning()
			.then((t) => t[0]);
	},

	/**
	 * ### MARK: find
	 *
	 * Search user by id or email
	 */
	find(search: string) {
		return db.query.users.findFirst({
			where: or(eq(users.id, search), eq(users.email, search)),
		});
	},
};

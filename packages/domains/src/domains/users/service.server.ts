import type { PaginationSchema } from "@repo/domains/app/schema";
import type { UserSchema } from "@repo/domains/users/schema";

import { userSQL } from "./sql/sql.server";

export const userService = {
	index(pagination: PaginationSchema) {
		return userSQL.index(pagination);
	},

	show(id: string) {
		return userSQL.show(id);
	},

	update(id: string, payload: Omit<UserSchema, "id">, _user: UserSchema) {
		return userSQL.update(id, payload);
	},

	delete(id: string) {
		return userSQL.delete(id);
	},
};

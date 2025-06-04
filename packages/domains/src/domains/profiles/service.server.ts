import type { PaginationSchema } from "../app/schema";
import type { UserSchema } from "../users/schema";
import type { InsertProfileSchema, UpdateProfileSchema } from "./schema";
import { profileSQL } from "./sql/sql.server";

export const profileService = {
	index(pagination: PaginationSchema, user?: UserSchema) {
		return profileSQL.index(pagination, user);
	},

	store(payload: InsertProfileSchema, user: UserSchema) {
		return profileSQL.store(payload, user);
	},

	show(id: string, user?: UserSchema) {
		return profileSQL.show(id, user);
	},

	update(id: string, payload: UpdateProfileSchema, user: UserSchema) {
		return profileSQL.update(id, payload, user);
	},

	delete(id: string, user: UserSchema) {
		return profileSQL.delete(id, user);
	},
};

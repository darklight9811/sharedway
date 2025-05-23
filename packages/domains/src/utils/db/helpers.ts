import { users } from "../../domains/users/sql/table.server";
import { c } from "./columns";

export function userstamp() {
	return {
		id_user_created: c
			.id("id_user_created")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		id_user_updated: c.id("id_user_updated").references(() => users.id, { onDelete: "cascade" }),
	};
}

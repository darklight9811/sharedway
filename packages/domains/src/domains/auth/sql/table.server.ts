import { c } from "../../../utils/db/columns";
import { users } from "../../users/sql/table.server";

export const sessions = c.table("sessions", {
	id: c.id().defaultRandom().primaryKey(),

	id_user: c.id("id_user").references(() => users.id, { onDelete: "cascade" }),

	token: c.varchar(),
	ip: c.varchar({ length: 40 }),
	user_agent: c.varchar(),

	...c.stamp(),
	date_expires: c.timestamp().notNull(),
});

export const accounts = c.table("accounts", {
	id: c.id().defaultRandom().primaryKey(),

	id_user: c.id("id_user").references(() => users.id, { onDelete: "cascade" }),
	id_account: c.varchar().notNull(),
	provider: c.varchar().notNull(),
	scope: c.varchar(),

	access_token: c.varchar(),
	refresh_token: c.varchar(),
	password: c.varchar(),

	...c.stamp(),
	date_expires_access: c.timestamp(),
	date_expires_refresh: c.timestamp(),
});

export const verifications = c.table("verifications", {
	id: c.id().defaultRandom().primaryKey(),

	identifier: c.varchar().notNull(),
	value: c.varchar().notNull(),

	...c.stamp(),
	date_expires: c.timestamp().notNull(),
});

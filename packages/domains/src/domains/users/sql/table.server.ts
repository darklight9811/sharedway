import { c } from "../../../utils/db/columns";

export const userType = c.enum("user_types", ["user", "admin", "dev"]);

export const users = c.table("users", {
	id: c.id().defaultRandom().primaryKey(),

	type: userType().default("user").notNull(),
	name: c.varchar().notNull(),
	image: c.varchar(),
	email: c.varchar().notNull().unique(),
	email_verified: c.boolean().default(false).notNull(),
	is_anonymous: c.boolean().default(false).notNull(),

	date_created: c.timestamp().notNull().defaultNow(),
	date_updated: c.timestamp(),
});

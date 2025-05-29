import { c } from "../../../utils/db/columns";
import { users } from "../../users/sql/table.server";

export const sessions = c.table("sessions", {
	id: c.id().defaultRandom().primaryKey(),

	userId: c.id("userId").references(() => users.id, { onDelete: "cascade" }),

	token: c.varchar(),
	ipAddress: c.varchar({ length: 40 }),
	userAgent: c.varchar(),

	...c.stamp(),
	expiresAt: c.timestamp().notNull(),
});

export const accounts = c.table("accounts", {
	id: c.id().defaultRandom().primaryKey(),

	userId: c.id("userId").references(() => users.id, { onDelete: "cascade" }),
	accontId: c.varchar().notNull(),
	providerId: c.varchar().notNull(),
	scope: c.varchar(),

	accessToken: c.varchar(),
	refreshToken: c.varchar(),
	password: c.varchar(),

	...c.stamp(),
	expiresAt: c.timestamp(),
	accessTokenExpiresAt: c.timestamp(),
	refreshTokenExpiresAt: c.timestamp(),
});

export const verifications = c.table("verifications", {
	id: c.id().defaultRandom().primaryKey(),

	identifier: c.varchar().notNull(),
	value: c.varchar().notNull(),

	...c.stamp(),
	expiresAt: c.timestamp().notNull(),
});

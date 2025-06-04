import { c } from "../../../utils/db/columns";
import { users } from "../../users/sql/table.server";

export const profileType = c.enum("profile_types", ["human", "animal"]);

export const profiles = c.table("profiles", {
	id: c.id().defaultRandom().primaryKey(),

	type: profileType().notNull(),
	name: c.varchar().notNull(),
	description: c.text(),
	data: c.json().default({}).$type<{ age: number; race: string; gender: "male" | "female" | "other" }>().notNull(),

	userCreatedId: c
		.id("userCreatedId")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),

	...c.stamp(),
	disappearedAt: c.timestamp(),
	foundAt: c.timestamp(),
});

export const profilesRelations = c.relations(profiles, ({ one, many }) => ({
	addresses: many(profileAddresses),
	pictures: many(profilePictures),
	userCreated: one(users, {
		fields: [profiles.userCreatedId],
		references: [users.id],
	}),
	contact: one(profileContacts, {
		fields: [profiles.id],
		references: [profileContacts.id_profile],
	}),
}));

export const profileAddresses = c.table("profile_addresses", {
	id: c.id().defaultRandom().primaryKey(),

	district: c.varchar().notNull(),
	city: c.varchar().notNull(),
	state: c.varchar().notNull(),
	zipCode: c.varchar().notNull(),
	country: c.varchar().notNull(),

	profileId: c
		.id("profileId")
		.references(() => profiles.id, { onDelete: "cascade" })
		.notNull(),

	...c.stamp(),
});

export const profileAddressesRelations = c.relations(profileAddresses, ({ one }) => ({
	profile: one(profiles, {
		fields: [profileAddresses.profileId],
		references: [profiles.id],
	}),
}));

export const profilePictures = c.table("profile_pictures", {
	id: c.id().defaultRandom().primaryKey(),

	key: c.varchar().unique().notNull(),
	url: c.varchar().unique().notNull(),

	id_profile: c
		.id("id_profile")
		.references(() => profiles.id, { onDelete: "cascade" })
		.notNull(),

	...c.stamp(),
});

export const profilePicturesRelations = c.relations(profilePictures, ({ one }) => ({
	profile: one(profiles, {
		fields: [profilePictures.id_profile],
		references: [profiles.id],
	}),
}));

export const profileContacts = c.table("profile_contact", {
	id: c.id().defaultRandom().primaryKey(),

	description: c.varchar().default("").notNull(),
	options: c.json().default([]).notNull(),

	id_profile: c
		.id("id_profile")
		.unique()
		.references(() => profiles.id, { onDelete: "cascade" })
		.notNull(),
});

export const profileContactsRelations = c.relations(profileContacts, ({ one }) => ({
	profile: one(profiles, {
		fields: [profileContacts.id_profile],
		references: [profiles.id],
	}),
}));

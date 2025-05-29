import { cuid2 } from "drizzle-cuid2/postgres";
import { relations } from "drizzle-orm";
import { boolean, integer, json, pgEnum, pgTableCreator, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const table = pgTableCreator((n) => n);

export const c = {
	table,
	id: (id = "id") => cuid2(id),
	varchar,
	text,
	boolean,
	timestamp,
	enum: pgEnum,
	json: json,
	int: integer,
	relations,
	stamp: () => ({
		createdAt: timestamp().notNull().defaultNow(),
		updatedAt: timestamp(),
	}),
};

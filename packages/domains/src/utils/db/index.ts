import { drizzle } from "drizzle-orm/node-postgres";

import * as profilesTables from "../../domains/profiles/sql/table.server";
// schemas
import * as usersTables from "../../domains/users/sql/table.server";

export const db = drizzle({
	connection: {
		connectionString: process.env.DATABASE_URL as string,
	},
	schema: {
		...usersTables,
		...profilesTables,
	},
});

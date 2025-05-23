import { drizzle } from "drizzle-orm/node-postgres";

// schemas
import * as usersTables from "../../domains/users/sql/table.server";

export const db = drizzle({
	connection: {
		connectionString: process.env.DATABASE_URL as string,
	},
	schema: {
		...usersTables,
	},
});

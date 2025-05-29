import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../../../utils/db";
import { env } from "../../app/env";
import { users } from "../../users/sql/table.server";
import { accounts, sessions, verifications } from "../sql/table.server";

export const auth = betterAuth({
	baseURL: `${env.app_url}/auth`,
	trustedOrigins: [`${process.env.APP_URL!}`, "http://localhost:3000"],

	secret: env.secret,
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			users,
			sessions,
			accounts,
			verifications,
		},
		usePlural: true,
	}),
	advanced: {
		cookiePrefix: undefined,
		cookieOptions: {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		},
		useSecureCookies: process.env.NODE_ENV === "production",
	},
	emailAndPassword: {
		enabled: true,
	},
});

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
	account: {
		fields: {
			userId: "id_user",
			accessToken: "access_token",
			accountId: "id_account",
			expiresAt: "date_expires",
			refreshToken: "refresh_token",
			providerId: "provider",
			accessTokenExpiresAt: "date_expires_access",
			createdAt: "date_created",
			password: "password",
			scope: "scope",
			refreshTokenExpiresAt: "date_expires_refresh",
			updatedAt: "date_updated",
		},
	},
	user: {
		deleteUser: {
			enabled: true,
		},
		fields: {
			createdAt: "date_created",
			emailVerified: "email_verified",
			updatedAt: "date_updated",
		},
	},
	session: {
		freshAge: 0,
		fields: {
			expiresAt: "date_expires",
			ipAddress: "ip",
			userAgent: "user_agent",
			userId: "id_user",
			createdAt: "date_created",
			updatedAt: "date_updated",
		},
	},
	verification: {
		fields: {
			createdAt: "date_created",
			expiresAt: "date_expires",
			updatedAt: "date_updated",
		},
	},
});

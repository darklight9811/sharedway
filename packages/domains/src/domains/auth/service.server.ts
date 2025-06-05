import { TRPCError } from "@trpc/server";

import { db } from "../../utils/db";
import { auth } from "./helpers/auth.server";
import type { LoginSchema, RegisterSchema } from "./schema";

export const authService = {
	session(token?: string | Headers | null) {
		if (!token) return null;

		return auth.api
			.getSession({
				headers: typeof token === "string" ? new Headers({ Authorization: `Bearer ${token}` }) : token,
			})
			.then((t) =>
				t?.user ? db.query.users.findFirst({ where: (table, { eq }) => eq(table.id, t.user.id) }) : null,
			)
			.catch(() => null);
	},

	async register(payload: RegisterSchema) {
		const response = await auth.api.signUpEmail({
			body: {
				...payload,
				name: payload.name || payload.email.split("@")[0],
			},
		});

		if (!response.token) throw new TRPCError({ code: "BAD_REQUEST", message: "register_failed" });

		return response;
	},

	async login(payload: LoginSchema) {
		const response = await auth.api.signInEmail({
			body: payload,
		});

		if (!response.token) throw new TRPCError({ code: "BAD_REQUEST", message: "login_failed" });

		return response;
	},

	async logout(token?: string | Headers | null) {
		if (!token) return null;

		const response = await auth.api.signOut({
			headers: typeof token === "string" ? new Headers({ Authorization: `Bearer ${token}` }) : token,
		});

		return response;
	},
};

import { TRPCError } from "@trpc/server";

import { db } from "../../utils/db";
import { auth } from "./helpers/auth.server";
import type { LoginSchema, RegisterSchema } from "./schema";

export const authService = {
	session(headers: Headers) {
		return auth.api
			.getSession({
				headers,
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
			asResponse: true,
		});

		if (!response.ok) throw new TRPCError({ ...(await response.json()), code: "BAD_REQUEST" });

		return response.headers.get("set-cookie");
	},

	async login(payload: LoginSchema) {
		const response = await auth.api.signInEmail({
			body: payload,
			asResponse: true,
		});

		if (!response.ok) throw new TRPCError({ ...(await response.json()), code: "BAD_REQUEST" });

		return response.headers.get("set-cookie");
	},

	async logout(header: Headers) {
		const response = await auth.api.signOut({
			headers: header,
			asResponse: true,
		});

		return response.headers.get("set-cookie");
	},
};

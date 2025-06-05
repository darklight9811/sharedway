import { t } from "../../utils/trpc";
import { loginSchema, registerSchema } from "./schema";
import { authService } from "./service.server";

export const authRouter = t.router({
	register: t.route.input(registerSchema).mutation(async ({ input, ctx }) => {
		const response = await authService.register(input);

		ctx.cookie.set("token", response.token);

		return response.user;
	}),

	login: t.route.input(loginSchema).mutation(async ({ input, ctx }) => {
		const response = await authService.login(input);

		ctx.cookie.set("token", response.token);

		return response.user;
	}),

	session: t.route.query(({ ctx }) => {
		const token = ctx.cookie.get("token");

		return authService.session(token);
	}),

	logout: t.protected.mutation(async ({ ctx }) => {
		const token = ctx.cookie.get("token");

		await authService.logout(token);

		ctx.cookie.remove("token");
	}),
});

import { t } from "../../utils/trpc";
import { loginSchema, registerSchema } from "./schema";
import { authService } from "./service.server";

export const authRouter = t.router({
	register: t.route.input(registerSchema).mutation(({ input }) => authService.register(input)),

	login: t.route.input(loginSchema).mutation(({ input }) => authService.login(input)),

	session: t.route.query(({ ctx }) => authService.session(ctx.headers)),

	logout: t.protected.mutation(async ({ ctx }) => {
		await authService.logout(ctx.headers);

		// ctx.cookie.set("")
	}),
});

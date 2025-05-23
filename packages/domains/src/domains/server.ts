import { t } from "../utils/trpc";

export { createTRPCContext } from "../utils/trpc";

import { authRouter } from "./auth/router.server";

export const appRouter = t.router({
	auth: authRouter,
});

export type AppRouter = typeof appRouter;

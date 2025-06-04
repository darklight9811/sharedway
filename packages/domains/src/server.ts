import { t } from "./utils/trpc";

export { createTRPCContext } from "./utils/trpc";

import { authRouter } from "./domains/auth/router.server";
import { profilesRouter } from "./domains/profiles/router.server";

export const appRouter = t.router({
	auth: authRouter,
	profiles: profilesRouter,
});

export type AppRouter = typeof appRouter;

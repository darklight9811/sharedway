import type Metadata from "@repo/services/types/metadata";
import { createApi } from "@yamiassu/shared/js";
import type { Prettify } from "@yamiassu/shared/types";
import { buildMetadata } from "./parallel";

const api = createApi({});

export function apiService<Input, Output>(
	cb: (input: Input) => (metadata: Metadata) => Output,
) {
	return async (ctx: { input: Input }): Promise<Prettify<Output>> =>
		cb(ctx.input)(await buildMetadata());
}

export default api;

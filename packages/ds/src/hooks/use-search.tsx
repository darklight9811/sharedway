import { useMemo } from "react";
import { useSearchParams } from "react-router";

import type { ZodType } from "../lib/v";

export function useSearch<Schema extends ZodType>(schema: Schema) {
	const [searchParams, setSearchParams] = useSearchParams();

	const search = useMemo(() => {
		const response: Record<string, string> = {};

		for (const [key, value] of searchParams) {
			response[key] = value;
		}

		return schema.parse(response);
	}, [searchParams, schema.parse]);

	return [search, setSearchParams as (params: Schema["_input"]) => void] as const;
}

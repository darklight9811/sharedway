import { env } from "@/domains/app/env";
import { toast } from "@/ds/ui/toast";
import type { v, ZodType } from "@/ds/v";
import { queryClient } from "../domains/app/query";
import { objectToFormData } from "./form";

interface Config<Response extends ZodType = never> extends Omit<RequestInit, "method"> {
	method?: "GET" | "POST" | "PATCH" | "DELETE" | "OPTIONS";
	search?: Record<string, unknown>;
	input?: unknown;
	output?: Response;
	throwOnError?: boolean;
}

export default async function request<Response extends ZodType = never>(
	url: string,
	config: Config<Response> = {},
): Promise<v.infer<Response> | undefined> {
	const path = new URL(url, env.api_url);

	if (config.search) {
		for (const [key, value] of Object.entries(config.search)) {
			path.searchParams.set(key, value as string);
		}
	}

	try {
		const response = await fetch(path, {
			...config,
			body: config.input ? objectToFormData(config.input) : undefined,
			headers: {
				...(config.headers || {}),
				Authorization: `Bearer ${localStorage.getItem("token") || queryClient.getQueryData(["token"])}`,
			},
		});
		if (!response.ok || response.status >= 300 || response.status < 200) throw Error("Request failed");

		const payload = await response.json();

		if (config.output) return config.output.parse(payload);
	} catch (e: unknown) {
		if ((e as Error).name !== "AbortError" && config.throwOnError !== false) {
			if (process.env.NODE_ENV !== "production") console.warn({ e });
			toast.error("Something went wrong, please try again later");
			return;
		}

		throw e;
	}
}

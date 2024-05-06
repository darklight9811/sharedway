import { headers } from "next/headers"
import { env } from "@repo/env"

export function base (port?: number) {
	if (typeof window !== "undefined") return document.URL // browser should use relative url
	if (env.VERCEL_URL) return `https://${headers().get("host")}` // SSR should use vercel url
	return `http://localhost:${port ?? env.PORT ?? 3000}` // dev SSR should use localhost
}

"use client";

import { Toaster } from "@repo/ds/ui/toast";
import { TooltipProvider } from "@repo/ds/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

export default function ClientProvider({
	children,
}: { children: React.ReactNode }) {
	const [client] = useState(new QueryClient());

	useEffect(() => {
		(async () => {
			if ("serviceWorker" in navigator) {
				await navigator.serviceWorker
					.register("/sw.js", {
						scope: "/",
						updateViaCache: "none",
					})
					.then((t) => t);
			}
		})();
	}, []);

	return (
		<QueryClientProvider client={client}>
			<ReactQueryDevtools />
			<Toaster />
			<TooltipProvider delayDuration={300}>{children}</TooltipProvider>
		</QueryClientProvider>
	);
}

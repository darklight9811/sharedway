"use client";

import { Toaster } from "@repo/ds/ui/toast";
import { TooltipProvider } from "@repo/ds/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function ClientProvider({
	children,
}: { children: React.ReactNode }) {
	const [client] = useState(new QueryClient());

	return (
		<QueryClientProvider client={client}>
			<ReactQueryDevtools />
			<Toaster />
			<TooltipProvider delayDuration={300}>{children}</TooltipProvider>
		</QueryClientProvider>
	);
}
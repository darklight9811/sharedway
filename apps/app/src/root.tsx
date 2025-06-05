import { QueryClientProvider } from "@tanstack/react-query";
import {
	isRouteErrorResponse,
	Links,
	type LinksFunction,
	type LoaderFunctionArgs,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "react-router";

import { Navbar, queryClient } from "@repo/domains/app";

import "@repo/ds/style";

import { StrictMode } from "react";

import { useTranslation } from "@repo/ds/lib/localization";
import { Toaster } from "@repo/ds/toast";

import { Footer } from "@repo/domains/app";

import i18next from "./utils/i19next.server";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
	{
		rel: "icon",
		type: "image/svg+xml",
		href: "/images/logo/favicon.svg",
		media: "(prefers-color-scheme: light)",
	},
	{
		rel: "icon",
		type: "image/svg+xml",
		href: "/images/logo/favicon-light.svg",
		media: "(prefers-color-scheme: dark)",
	},
];

export async function loader({ request }: LoaderFunctionArgs) {
	const locale = await i18next.getLocale(request);
	return { locale };
}

export const handle = {
	i18n: "general",
};

export function Layout({ children }: { children: React.ReactNode }) {
	const { locale } = useLoaderData<typeof loader>();

	const { i18n } = useTranslation();

	return (
		<html lang={locale} dir={i18n.dir()} className="h-full scroll-smooth">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1, viewport-fit=cover"
				/>
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
				<Meta />
				<Links />
			</head>
			<body className="flex flex-col h-full">
				<div className="grow w-full flex h-screen">
					<div id="content" className="flex flex-col w-full grow relative *:animate-fade-in">
						{children}
					</div>
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<Toaster />
				<Navbar />
				<Outlet />
				<Footer />
			</QueryClientProvider>
		</StrictMode>
	);
}

export function ErrorBoundary({ error }: { error: Error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}

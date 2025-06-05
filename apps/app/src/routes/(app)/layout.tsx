import { type LoaderFunction, Outlet, redirect } from "react-router";

import { Footer, Navbar } from "@repo/domains/app";

export const loader: LoaderFunction = async ({ request }) => {
	const pathname = new URL(request.url).pathname;

	if (!request.headers.get("cookie")?.includes("token") && !["/", "/profiles", "/profiles/new"].includes(pathname))
		return redirect("/register");
};

export default function Layout() {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}

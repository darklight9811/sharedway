import { Outlet } from "react-router";

import { Footer, Navbar } from "@repo/domains/app";

export default function Layout() {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}

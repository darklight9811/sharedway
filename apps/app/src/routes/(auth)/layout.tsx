import { env } from "@repo/domains/app/env";
import { Outlet } from "react-router";

export default function Layout() {
	return (
		<>
			<div className="relative grow flex flex-col justify-center items-center animate-fade-in py-[15vh]">
				<span className="absolute top-3 left-3 flex gap-2 opacity-50">
					<img alt="logo" height={20} src="/images/logo/favicon.svg" width={20} /> {env.name}
				</span>

				<Outlet />

				<img
					alt="logo"
					height={800}
					src="/images/logo/blur.webp"
					className="absolute top-0 z-[-1]"
					width={800}
				/>
			</div>
			{/* <Footer className="bottom-0" /> */}
		</>
	);
}

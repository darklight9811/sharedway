import { env } from "@repo/env";
import Image from "next/image";
import Footer from "../_components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="relative grow flex flex-col justify-center items-center animate-fade-in py-[15vh]">
				<span className="absolute top-3 left-3 flex gap-2 opacity-50">
					<Image
						alt="logo"
						height={20}
						src="/images/logo/favicon.svg"
						width={20}
					/>{" "}
					{env.APP_NAME}
				</span>

				{children}

				<Image
					alt="logo"
					height={800}
					src="/images/logo/blur.webp"
					className="absolute top-0 z-[-1]"
					width={800}
				/>
			</div>
			<Footer className="bottom-0" />
		</>
	);
}

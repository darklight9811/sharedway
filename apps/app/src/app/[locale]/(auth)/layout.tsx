import { env } from "@repo/env";
import Image from "next/image";
import Footer from "../_components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="relative grow flex flex-col justify-center items-center overflow-hidden animate-fade-in">
				<span className="absolute top-1 left-1 flex gap-2 opacity-30">
					<Image alt="logo" height={20} src="/logo/favicon.svg" width={20} />{" "}
					{env.APP_NAME}
				</span>

				{children}

				<div className="absolute z-[-1] top-[50%] left-[50%] opacity-20 aspect-square w-[50vw]">
					<Image alt="" fill src="/logo/favicon.svg" />
				</div>
			</div>
			<Footer className="absolute bottom-0" />
		</>
	);
}

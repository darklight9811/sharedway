import { env } from "@repo/env";
import Image from "next/image";
import Footer from "../_components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="relative grow flex flex-col justify-center items-center animate-fade-in py-[15vh]">
				<span className="absolute top-3 left-3 flex gap-2 opacity-50 text-primary">
					<Image
						alt="logo"
						height={20}
						src="/images/logo/favicon.svg"
						width={20}
					/>{" "}
					{env.APP_NAME}
				</span>

				{children}

				<div className="absolute z-[-1] top-[50%] left-[50%] opacity-20 w-[50%]">
					<Image alt="" fill src="/images/logo/favicon.svg" />
				</div>
			</div>
			<Footer className="bottom-0" />
		</>
	);
}

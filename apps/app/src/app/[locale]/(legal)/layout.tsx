import Image from "next/image";
import Footer from "../_components/footer";
import Navbar from "../_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />

			<Image
				src="/images/logo/favicon.svg"
				width={150}
				height={150}
				alt="logo"
				className="mx-auto mb-8"
			/>
			<div className="max-w-3xl w-full mx-auto flex flex-col gap-2">
				{children}
			</div>

			<Footer className="mt-4" />
		</>
	);
}

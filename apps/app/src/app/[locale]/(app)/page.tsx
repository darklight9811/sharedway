import Image from "next/image";
import MiniSearch from "../_components/mini-search";

export default function Page() {
	return (
		<>
			<div className="flex min-h-[75vh] flex-col justify-center items-center relative">
				<Image
					src="/images/logo/favicon.svg"
					alt=""
					width={24}
					height={24}
					className="!w-[50vh] absolute opacity-5 z-[-1]"
				/>

				<h1 className="text-clamp-title font-bold max-w-screen-lg text-center bg-gradient-to-l from-secondary to-primary bg-clip-text text-transparent">
					Ajudando a encontrar aqueles que amamos
				</h1>
				<h2 className="text-xl">
					Ajudando aqueles que encontramos pelo caminho, esse é o nosso{" "}
					<span className="text-primary">sharedway</span>
				</h2>

				<MiniSearch />
			</div>
		</>
	);
}

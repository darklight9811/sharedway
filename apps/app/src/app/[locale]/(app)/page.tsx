import Image from "next/image";
import MiniSearch from "../_components/mini-search";

export default function Page() {
	return (
		<>
			<div className="flex min-h-[75vh] flex-col justify-center items-center relative pb-[20vh]">
				<Image
					src="/images/logo/favicon.svg"
					alt=""
					width={24}
					height={24}
					className="!w-[50vh] absolute opacity-5 z-[-1]"
				/>

				<div className="bg-secondary text-white py-1 px-4 rounded-lg animate-top-in mt-[20vh]">
					Procurando por parceiros!
				</div>

				<h1 className="text-clamp-title font-bold max-w-screen-md text-center bg-gradient-to-l from-secondary to-primary bg-clip-text text-transparent animate-top-in">
					Ajudando a encontrar aqueles que amamos
				</h1>
				<h2 className="text-xl opacity-0 animation-delay-200 animate-top-in">
					Ajudando aqueles que encontramos pelo caminho, esse é o nosso{" "}
					<span className="text-primary font-semibold">sharedway</span>
				</h2>

				<MiniSearch />
			</div>
		</>
	);
}

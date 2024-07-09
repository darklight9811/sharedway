import { Link } from "@/lib/navigation";
import tailwind from "@repo/ds/tw";
import Title from "@repo/ds/ui/title";
import { Code, Handshake, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import MiniSearch from "../_components/mini-search";

export default function Page() {
	const t = useTranslations("home");

	return (
		<>
			{/**
			 * ### MARK: Hero
			 */}

			<div className="flex flex-col justify-center items-center relative pb-[20vh] px-2">
				<Image
					src="/images/logo/favicon.svg"
					alt=""
					width={24}
					height={24}
					className="!w-[50vh] top-[10vh] absolute opacity-5 z-[-1]"
					priority
				/>

				<div className="bg-secondary text-white py-1 px-4 rounded-lg animate-top-in mt-[20vh]">
					{t("hero.pill")}
				</div>

				<h1 className="text-5xl font-bold max-w-screen-md text-center bg-gradient-to-l from-secondary to-primary bg-clip-text text-transparent animate-top-in">
					{t("hero.title")}
				</h1>
				<h2 className="text-md sm:text-xl text-center opacity-0 animation-delay-200 animate-top-in">
					{t("hero.slogan")}
				</h2>

				<MiniSearch />
			</div>

			{/**
			 * ### MARK: Features
			 */}

			<div className="container mx-auto my-[5vh]">
				<div className="flex flex-wrap justify-evenly my-8 gap-4">
					<div className="flex flex-col items-center max-w-xs">
						<Users
							size="64"
							color={tailwind.theme.extend.colors.primary.DEFAULT}
						/>

						<h3 className="font-semibold text-xl text-primary">
							{t("features.community")}
						</h3>

						<p className="text-center">{t("features.community-description")}</p>
					</div>

					<div className="flex flex-col items-center max-w-xs">
						<Code
							size="64"
							color={tailwind.theme.extend.colors.primary.DEFAULT}
						/>

						<h3 className="font-semibold text-xl text-primary">
							{t("features.code")}
						</h3>

						<p className="text-center">{t("features.code-description")}</p>
					</div>

					<div className="flex flex-col items-center max-w-xs">
						<Handshake
							size="64"
							color={tailwind.theme.extend.colors.primary.DEFAULT}
						/>

						<h3 className="font-semibold text-xl text-primary">
							{t("features.partners")}
						</h3>

						<p className="text-center">{t("features.partners-description")}</p>
					</div>
				</div>
			</div>

			{/**
			 * ### MARK: About
			 */}

			<div className="mx-auto max-w-md w-full my-[10vh] relative">
				<Title
					anchor="about"
					className="font-bold text-3xl mb-8 text-primary text-center"
				>
					{t("about.title")}
				</Title>

				<h2 className="absolute top-0 w-full left-0 text-center z-[-1] text-9xl font-bold opacity-10 text-primary pointer-events-none">
					{t("about.title")}
				</h2>

				<p className="indent-8 text-center text-xl">{t("about.description")}</p>
			</div>
		</>
	);
}

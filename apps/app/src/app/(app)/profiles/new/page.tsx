import { Link } from "@/lib/navigation";
import { store } from "@/modules/profile/actions";
import ProfileForm from "@/modules/profile/components/profile-form";
import { auth } from "@clerk/nextjs/server";
import { Button, buttonVariants } from "@repo/ds/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Page() {
	const t = useTranslations("profiles");

	if (!auth().userId) {
		return (
			<div className="grow flex flex-col justify-center items-center max-w-xl w-full mx-auto min-h-[80vh] text-center gap-4">
				<Image
					alt="logo"
					height={800}
					src="/images/logo/blur.webp"
					className="absolute top-0 z-[-1]"
					width={800}
				/>

				<h1 className="text-5xl font-bold text-foreground">
					{t("new.unauth.title")}
				</h1>

				<p className="max-w-md">{t("new.unauth.description")}</p>

				<div className="flex gap-4 items-center">
					<Link
						className={buttonVariants({ className: "gap-2", variant: "dark" })}
						href="/sign-up?redirect=/profiles/new"
					>
						<Image
							alt=""
							src="/images/logo/favicon-light.svg"
							height={16}
							width={16}
						/>
						{t("new.unauth.register")}
					</Link>
					{t("new.unauth.or")}
					<Link
						className={buttonVariants({
							variant: "outline",
							className: "gap-2",
						})}
						href="https://www.instagram.com/sharedway_org/"
						target="blank"
						rel="noopener noreferrer"
					>
						<Image
							alt=""
							src="/images/brands/instagram.svg"
							height={16}
							width={16}
						/>
						Instagram
					</Link>
				</div>
			</div>
		);
	}

	return (
		<main className="grow flex flex-col justify-center items-center my-16 px-4">
			<h1 className="w-full max-w-5xl text-3xl font-bold mb-4">
				{t("create-title")}
			</h1>

			<ProfileForm onSubmit={store}>
				<Link
					href="/profiles"
					className={buttonVariants({ variant: "outline" })}
				>
					{t("back")}
				</Link>
				<Button
					type="submit"
					variant="dark"
					className="w-full md:max-w-[180px]"
				>
					{t("create")}
				</Button>
			</ProfileForm>
		</main>
	);
}

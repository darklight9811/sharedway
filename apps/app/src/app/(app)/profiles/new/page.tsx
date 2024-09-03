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
			<div className="grow flex flex-col justify-center items-center max-w-md w-full mx-auto text-center gap-4">
				<h1 className="text-3xl font-bold text-primary">
					{t("new.unauth.title")}
				</h1>

				<p>{t("new.unauth.description")}</p>

				<div className="flex gap-4 items-center">
					<Link
						className={buttonVariants({ className: "gap-2" })}
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
		<main className="grow flex flex-col justify-center items-center my-16 px-2">
			<h1 className="w-full max-w-5xl text-3xl font-bold mb-4 text-primary">
				{t("create-title")}
			</h1>

			<ProfileForm onSubmit={store}>
				<Link href="/" className={buttonVariants({ variant: "outline" })}>
					{t("back")}
				</Link>
				<Button type="submit" className="w-full max-w-[180px]">
					{t("create")}
				</Button>
			</ProfileForm>
		</main>
	);
}

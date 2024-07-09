import parallel from "@/lib/parallel";
import { currentUser } from "@clerk/nextjs/server";
import { buttonVariants } from "@repo/ds/ui/button";
import userService from "@repo/services/user";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, createElement } from "react";

export default function Page({
	searchParams,
}: { searchParams: { redirect?: string } }) {
	const t = useTranslations("auth.callback");

	function LoadingCallback() {
		return (
			<>
				<Loader size="56" className="animate-spin" />

				<h1 className="text-2xl font-bold my-2">{t("title")}</h1>

				<p>{t("description")}</p>
			</>
		);
	}

	return (
		<div className="flex grow flex-col justify-center items-center">
			<Suspense fallback={<LoadingCallback />}>
				{createElement(async function GenerateUser() {
					const user = await currentUser().catch(() => {});

					if (!user) return notFound();

					if (
						!(await userService.byProvider({
							provider: "clerk",
							value: user.id,
						})({}))
					) {
						await parallel(
							userService.create({
								id: user.id,
								name: user.fullName || user.username || "",
								email: user.emailAddresses.at(0)?.emailAddress,
								emailVerified:
									user.emailAddresses.at(0)?.verification?.status === "verified"
										? new Date()
										: undefined,
							}),
						);
					}

					return (
						<>
							<Image
								alt="logo"
								height={56}
								src="/images/logo/favicon.svg"
								width={56}
							/>

							<h1 className="text-2xl font-bold my-2">{t("done")}</h1>

							<Link
								className={buttonVariants()}
								href={searchParams.redirect || "/"}
							>
								{t("back")}
							</Link>
						</>
					);
				})}
			</Suspense>
		</div>
	);
}

import Share from "@/components/share";
import { Link } from "@/lib/navigation";
import parallel from "@/lib/parallel";
import { baseUrl } from "@/lib/url";
import Banner from "@/modules/profile/components/banner";
import { ContactDialog } from "@/modules/profile/dialogs/contact-dialog";
import ReportDialog from "@/modules/report/dialogs/report-dialog";
import { currentUser } from "@/modules/user/loaders";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ds/ui/avatar";
import { Button, buttonVariants } from "@repo/ds/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@repo/ds/ui/carousel";
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ds/ui/tooltip";
import { env } from "@repo/env";
import profileService from "@repo/services/profile";
import {
	Building2,
	CircleAlert,
	Edit,
	Flag,
	MapPinned,
	Printer,
	Share2,
	Trash,
	User,
} from "lucide-react";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

/**
 * ### MARK: Metadata
 */
export async function generateMetadata({ params }: { params: { id: string } }) {
	const [data, locale, t] = await parallel(
		profileService.show(params.id),
		getLocale(),
		getTranslations("profiles"),
	);

	return {
		title: data?.name,
		openGraph: {
			type: "profile",
			locale: locale,
			title: t("help", { profile: data?.name }),
			siteName: env.APP_NAME,
			description: data?.description || t("help", { profile: data?.name }),
			images: data?.pictures[0].url,
			logo: new URL("/images/logo/favicon.svg", baseUrl()),
			url: new URL(`/profiles/${data?.id}`, baseUrl()),
		},
		twitter: {
			images: data?.pictures[0].url,
			title: t("help", { profile: data?.name }),
		},
	} as Metadata;
}

/**
 * ### MARK: Page
 */
export default async function Page({ params }: { params: { id: string } }) {
	const [data, user, locale, t] = await parallel(
		profileService.show(params.id),
		currentUser(),
		getLocale(),
		getTranslations("profiles"),
	);

	if (!data) return notFound();

	const ip = headers().get("x-ip");
	const canReport = !(
		data.reports.find((t) => t.id_user_created === user?.id) ||
		data.reports.find((t) => t.ip === ip)
	);
	const status = data.date_found
		? "found"
		: data.date_disappeared
			? "disappeared"
			: data.date_created
				? "created"
				: "profile";

	/**
	 * ### MARK: Render
	 */
	return (
		<main className="p-4 flex flex-col md:flex-row grow container gap-2">
			<div className="md:max-w-[280px] w-full">
				<Avatar className="mr-2 w-xs/2 max-w-full mx-8 mb-4">
					<AvatarImage src={data.pictures.at(0)?.url} />
					<AvatarFallback>
						<User />
					</AvatarFallback>
				</Avatar>

				<h1 className="font-bold flex gap-1">
					{data.reports.length > 1 && (
						<Tooltip>
							<TooltipContent>{t("reported")}</TooltipContent>
							<TooltipTrigger asChild>
								<CircleAlert color="red" />
							</TooltipTrigger>
						</Tooltip>
					)}{" "}
					{data.name}
				</h1>

				<div>
					{status !== "profile" &&
						t(`profile_date_${status}`, {
							date: data[`date_${status}`]?.toLocaleDateString(),
							gender: data.data?.gender,
						})}
				</div>

				<div className="flex gap-2 mt-4">
					<ContactDialog contact={data.contact}>
						<Button className="w-full">{t("found")}</Button>
					</ContactDialog>
					<Tooltip>
						{!canReport && (
							<TooltipContent>{t("already_reported")}</TooltipContent>
						)}
						<TooltipTrigger asChild>
							<div>
								<ReportDialog data={{ id_profile: data.id }}>
									<Button variant="destructive" disabled={!canReport}>
										<Flag />
									</Button>
								</ReportDialog>
							</div>
						</TooltipTrigger>
					</Tooltip>
				</div>

				<div className="flex gap-2 my-2 justify-between">
					<Share
						link={`${baseUrl()}/profiles/${data.id}`}
						description={t("help", { profile: data.name })}
					>
						<Button size="icon">
							<Share2 />
						</Button>
					</Share>
					<Banner
						images={data.pictures.map((t) => t.id)}
						description={data.description}
						contact={data.contact?.options as { type: string; value: string }[]}
					>
						<Button size="icon">
							<Printer />
						</Button>
					</Banner>
					{user?.id === data.user_created.id && (
						<>
							<Link
								href={`/profiles/${data.id}/edit`}
								className={buttonVariants({
									size: "icon",
									variant: "success",
								})}
							>
								<Edit />
							</Link>
							<Button size="icon" variant="destructive">
								<Trash />
							</Button>
						</>
					)}
				</div>

				<div className="text-xs">
					{t("created-by", {
						by: data.user_created.name,
						date: data.date_created.toLocaleDateString(locale),
					})}
				</div>
			</div>

			<div className="w-full">
				{data.pictures.length > 1 && (
					<Carousel opts={{}} className="mb-8 mt-4 md:mt-0">
						<CarouselContent>
							{data.pictures.map((entry) => (
								<CarouselItem
									key={entry.id}
									className="max-w-[150px] pb-4 aspect-square"
								>
									<div className="relative w-full h-full overflow-hidden rounded-lg">
										<Image
											src={entry.url}
											fill
											alt=""
											className="min-w-full min-h-full object-fill"
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				)}

				<h2 className="mb-4 font-bold text-xl">{t("description")}</h2>

				<div>{data.description || t("no-description")}</div>

				<h2 className="my-4 font-bold text-xl">{t("information")}</h2>

				<div className="flex flex-wrap">
					<div className="w-1/2">
						{t("new.general.name")}: {data.name}
					</div>
					<div className="w-1/2">
						{t("new.general.age")}: {data.data?.age}
					</div>
					<div className="w-1/2">
						{`${t("new.general.gender")}: ${t(`new.general.gender-options.${data.data?.gender}`)}`}
					</div>
					<div className="w-1/2">
						{t("new.general.race")}: {data.data?.race}
					</div>
				</div>

				{status === "disappeared" && data.addresses[0] && (
					<>
						<h2 className="my-4 font-bold text-xl">{t("location")}</h2>

						<div className="flex flex-col md:flex-row gap-4">
							<div className="w-full sm:w-1/2">
								<h3 className="bg-white p-2 rounded-lg shadow w-full flex gap-1">
									<Building2 />
									{data.addresses[0]?.city} ({data.addresses[0]?.state})
								</h3>

								<div className="flex flex-wrap p-2">
									<div className="w-1/2">
										{`${t("new.location.district")}: ${data.addresses[0]?.district || "-"}`}
									</div>
									<div className="w-1/2">
										{`${t("new.location.city")}: ${data.addresses[0]?.city || "-"}`}
									</div>
									<div className="w-1/2">
										{`${t("new.location.state")}: ${data.addresses[0]?.state || "-"}`}
									</div>
									<div className="w-1/2">
										{`${t("new.location.country")}: ${data.addresses[0]?.country || "-"}`}
									</div>
								</div>
							</div>

							<div className="w-full sm:w-1/2 aspect-video relative">
								<Image alt="" src="/images/placeholder/maps.webp" fill />

								<div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center text-white">
									<MapPinned size={64} />
									<h1 className="text-xl">Mapas em breve</h1>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</main>
	);
}

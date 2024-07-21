import Share from "@/components/share";
import { Link } from "@/lib/navigation";
import parallel from "@/lib/parallel";
import { baseUrl } from "@/lib/url";
import ReportDialog from "@/modules/report/components/report-dialog";
import { currentUser } from "@/modules/user/loaders";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ds/ui/avatar";
import { Button, buttonVariants } from "@repo/ds/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@repo/ds/ui/carousel";
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ds/ui/tooltip";
import { env } from "@repo/env";
import entityService from "@repo/services/entity";
import {
	CircleAlert,
	Edit,
	Flag,
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
import { FindDialog } from "./_components/find-dialog";

/**
 * ### MARK: Metadata
 */
export async function generateMetadata({ params }: { params: { id: string } }) {
	const [data, locale, t] = await parallel(
		entityService.show(params.id),
		getLocale(),
		getTranslations("entities"),
	);

	return {
		title: data?.name,
		openGraph: {
			type: "profile",
			locale: locale,
			title: t("help", { entity: data?.name }),
			siteName: env.APP_NAME,
			description: data?.description || t("help", { entity: data?.name }),
			images: data?.pictures[0].url,
			logo: new URL("/images/logo/favicon.svg", baseUrl()),
			url: new URL(`/entities/${data?.id}`, baseUrl()),
		},
		twitter: {
			images: data?.pictures[0].url,
			title: t("help", { entity: data?.name }),
		},
	} as Metadata;
}

/**
 * ### MARK: Page
 */
export default async function Page({ params }: { params: { id: string } }) {
	const [data, user, locale, t] = await parallel(
		entityService.show(params.id),
		currentUser(),
		getLocale(),
		getTranslations("entities"),
	);

	if (!data) return notFound();

	const ip = headers().get("x-ip");
	const canReport = !(
		data.reports.find((t) => t.id_user_created === user?.id) ||
		data.reports.find((t) => t.ip === ip)
	);

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
					{t("date", { date: data.date_created?.toLocaleDateString(locale) })}
				</div>

				<div className="flex gap-2 mt-4">
					<FindDialog contact={data.contact}>
						<Button type="button" className="w-full">
							{t("found")}
						</Button>
					</FindDialog>
					<Tooltip>
						{!canReport && (
							<TooltipContent>{t("already_reported")}</TooltipContent>
						)}
						<TooltipTrigger asChild>
							<div>
								<ReportDialog data={{ id_entity: data.id }}>
									<Button
										type="button"
										variant="destructive"
										disabled={!canReport}
									>
										<Flag />
									</Button>
								</ReportDialog>
							</div>
						</TooltipTrigger>
					</Tooltip>
				</div>

				<div className="flex gap-2 my-2 justify-between">
					<Share
						link={`${baseUrl()}/entities/${data.id}`}
						description={t("help", { entity: data.name })}
					>
						<Button type="button" size="icon">
							<Share2 />
						</Button>
					</Share>
					<Button type="button" size="icon" disabled>
						<Printer />
					</Button>
					{user?.id === data.user_created.id && (
						<>
							<Link
								href={`/entities/${data.id}/edit`}
								className={buttonVariants({
									size: "icon",
									variant: "success",
								})}
							>
								<Edit />
							</Link>
							<Button type="button" size="icon" variant="destructive">
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
			</div>
		</main>
	);
}

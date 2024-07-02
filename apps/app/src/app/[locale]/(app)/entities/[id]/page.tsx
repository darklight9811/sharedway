import Share from "@/components/share";
import { Link } from "@/lib/navigation";
import parallel from "@/lib/parallel";
import { baseUrl } from "@/lib/url";
import { currentUser } from "@/modules/user/loaders";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ds/ui/avatar";
import { Button, buttonVariants } from "@repo/ds/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@repo/ds/ui/carousel";
import { env } from "@repo/env";
import entityService from "@repo/services/entity";
import { Edit, Flag, Printer, Share2, Trash, User } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FindDialog } from "./_components/find-dialog";

/**
 * ### MARK: Metadata
 */
export async function generateMetadata({ params }: { params: { id: string } }) {
	const [data, locale] = await parallel(
		entityService.show(params.id),
		getLocale(),
	);

	return {
		title: data?.name,
		openGraph: {
			type: "profile",
			locale: locale,
			title: `Encontre ${data?.name}`,
			siteName: env.APP_NAME,
			description:
				data?.description ||
				`Ajude a encontrar ${data?.name}, ele está perdido desde ${data?.date_created.toLocaleDateString(locale)}`,
			images: data?.pictures[0].url,
			logo: new URL("/images/logo/favicon.svg", baseUrl()),
			url: new URL(`/entities/${data?.id}`, baseUrl()),
		},
		twitter: {
			images: data?.pictures[0].url,
			title: `Encontre ${data?.name}`,
		},
	} as Metadata;
}

/**
 * ### MARK: Page
 */
export default async function Page({ params }: { params: { id: string } }) {
	const [data, user, locale] = await parallel(
		entityService.show(params.id),
		currentUser(),
		getLocale(),
	);

	if (!data) return notFound();

	return (
		<main className="p-4 flex flex-col md:flex-row grow container gap-2">
			<div className="md:max-w-[280px] w-full">
				<Avatar className="mr-2 w-xs/2 max-w-full mx-8 mb-4">
					<AvatarImage src={data.pictures.at(0)?.url} />
					<AvatarFallback>
						<User />
					</AvatarFallback>
				</Avatar>

				<h1 className="font-bold">{data.name}</h1>

				<div>
					Desaparecido em {data.date_created?.toLocaleDateString(locale)}
				</div>

				<div className="flex gap-2 mt-4">
					<FindDialog>
						<Button type="button" className="w-full">
							Encontrado
						</Button>
					</FindDialog>
					<Button type="button" variant="destructive" disabled>
						<Flag />
					</Button>
				</div>

				<div className="flex gap-2 my-2 justify-between">
					<Share
						link={`${baseUrl()}/entities/${data.id}`}
						description={`Ajude a encontrar ${data.name}`}
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
					Criado por {data.user_created.name} em{" "}
					{data.date_created.toLocaleDateString(locale)}
				</div>
			</div>

			<div className="w-full">
				{data.pictures.length > 1 && (
					<Carousel opts={{}} className="mb-8 mt-4 md:mt-0">
						<CarouselContent>
							{data.pictures.map((entry) => (
								<CarouselItem
									key={entry.id}
									className="max-w-[150px] aspect-square"
								>
									<div className="relative w-full h-full overflow-hidden rounded-lg">
										<Image
											src={entry.url}
											fill
											alt=""
											className="min-w-full min-h-full"
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				)}

				<h2 className="mb-4 font-bold text-xl">Descrição</h2>

				<div>{data.description || "Sem descrição"}</div>
			</div>
		</main>
	);
}

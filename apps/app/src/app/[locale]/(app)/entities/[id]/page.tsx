import { Link } from "@/lib/navigation";
import parallel from "@/lib/parallel";
import { baseUrl } from "@/lib/url";
import { currentUser } from "@/modules/user/loaders";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ds/ui/avatar";
import { buttonVariants } from "@repo/ds/ui/button";
import { env } from "@repo/env";
import entityService from "@repo/services/entity";
import { Cat, Edit, User } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

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
			logo: new URL("/logo/favicon.svg", baseUrl()),
			url: new URL(`/entities/${data?.id}`, baseUrl()),
		},
	} as Metadata;
}

export default async function Page({ params }: { params: { id: string } }) {
	const [data, user] = await parallel(
		entityService.show(params.id),
		currentUser(),
	);

	if (!data) return notFound();

	return (
		<main className="md:p-4 flex flex-col grow">
			<h1 className="flex items-center text-3xl">
				<Avatar className="mr-2">
					<AvatarImage src={data.pictures.at(0)?.url} />
					<AvatarFallback>
						<User />
					</AvatarFallback>
				</Avatar>

				{data.type === "person" ? <User /> : <Cat />}

				{data.name}

				<div className="ml-auto flex gap-2">
					{user?.id === data.user_created.id && (
						<Link
							href={`/entities/${data.id}/edit`}
							className={buttonVariants()}
						>
							<Edit />
						</Link>
					)}
				</div>
			</h1>

			<div>Desaparecido em {data.date_created?.toLocaleDateString()}</div>

			<div className="my-8">{data.description || "Sem descrição"}</div>
		</main>
	);
}

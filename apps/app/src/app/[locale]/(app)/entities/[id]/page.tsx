import { Link } from "@/lib/navigation";
import parallel from "@/lib/parallel";
import { currentUser } from "@/modules/user/loaders";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ds/ui/avatar";
import { buttonVariants } from "@repo/ds/ui/button";
import entityService from "@repo/services/entity";
import { Cat, Edit, User } from "lucide-react";
import { notFound } from "next/navigation";

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

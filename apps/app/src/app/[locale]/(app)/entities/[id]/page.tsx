import entityService from "@repo/services/entity"
import parallel from "../../../../../lib/parallel"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ds/ui/avatar"
import { User, Cat } from "lucide-react"

export default async function Page ({ params }: { params: { id: string } }) {
	const [data] = await parallel(
		entityService.show(params.id),
	)

	if (!data) return notFound()

	return (
		<main className="container flex flex-col py-4">
			<h1 className="flex items-center text-3xl">
				<Avatar className="mr-2">
					<AvatarImage src={data.img} />
					<AvatarFallback>Entity</AvatarFallback>
				</Avatar>

				{data.type === "person" ? <User /> : <Cat />}

				{data.name}
			</h1>

			<div>
				Desaparecido em {data.date_created?.toLocaleDateString()}
			</div>

			<hr />

			<div className="my-8">
				{data.description || "Sem descrição"}
			</div>
		</main>
	)
}
import entityService from "@repo/services/entity"
import parallel from "@/lib/parallel"
import { notFound } from "next/navigation"
import { currentUser } from "@/modules/user/loaders"
import EntityForm from "@/modules/entity/components/entity-form"
import { update } from "@/modules/entity/actions"

export default async function Page ({ params }: { params: { id: string } }) {
	const [data, user] = await parallel(
		entityService.show(params.id),
		currentUser(),
	)

	if (!data || data.user_created.id !== user?.id) return notFound()

	async function updateFromServer (data: any) {
		"use server"

		return update({ id: params.id, data })
	}

	return (
		<main className="grow flex flex-col justify-center items-center my-16">
			<h1 className="w-full max-w-5xl text-3xl font-bold mb-4">Atualizar desaparecido</h1>

			<EntityForm onSubmit={updateFromServer} data={data} schema="update" />
		</main>
	)
}
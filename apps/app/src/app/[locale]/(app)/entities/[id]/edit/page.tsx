import parallel from "@/lib/parallel";
import * as actions from "@/modules/entity/actions";
import EntityForm from "@/modules/entity/components/entity-form";
import { currentUser } from "@/modules/user/loaders";
import Form from "@repo/ds/form/form";
import { Button } from "@repo/ds/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ds/ui/dialog";
import type { EntityUpdateSchema } from "@repo/schemas/entity";
import entityService from "@repo/services/entity";
import { Trash } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
	const [data, user] = await parallel(
		entityService.show(params.id),
		currentUser(),
	);

	if (!data || data.user_created.id !== user?.id) return notFound();

	async function update(data: unknown) {
		"use server";

		return actions.update({ id: params.id, data: data as EntityUpdateSchema });
	}

	async function remove() {
		"use server";

		return actions.remove(params.id);
	}

	return (
		<main className="grow flex flex-col justify-center items-center my-16">
			<h1 className="w-full max-w-5xl text-3xl font-bold mb-4 flex justify-between">
				Atualizar desaparecido
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="destructive" className="ml-auto" type="button">
							<Trash />
						</Button>
					</DialogTrigger>

					<DialogContent>
						<DialogHeader>
							<DialogTitle>Você tem certeza?</DialogTitle>
							<DialogDescription>
								Essa ação não é reversivel, os dados serão perdidos
								permanentemente
							</DialogDescription>
						</DialogHeader>

						<DialogFooter>
							<DialogTrigger asChild>
								<Button variant="outline">Voltar</Button>
							</DialogTrigger>
							<Form onSubmit={remove}>
								<Button variant="destructive" className="ml-auto">
									Apagar
								</Button>
							</Form>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</h1>

			<EntityForm onSubmit={update} data={data} schema="update" />
		</main>
	);
}

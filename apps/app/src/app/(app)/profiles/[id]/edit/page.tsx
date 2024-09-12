import { Link } from "@/lib/navigation";
import parallel from "@/lib/parallel";
import DeleteModal from "@/modules/general/dialogs/delete-dialog";
import * as actions from "@/modules/profile/actions";
import ProfileForm from "@/modules/profile/components/profile-form";
import FindDialog from "@/modules/profile/dialogs/find-dialog";
import { currentUser } from "@/modules/user/loaders";
import { Button, buttonVariants } from "@repo/ds/ui/button";
import type {
	ProfileFindSchema,
	ProfileUpdateSchema,
} from "@repo/schemas/profile";
import profileService from "@repo/services/profile";
import { Eye, SaveIcon, Trash } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
	const [data, user] = await parallel(
		profileService.show(params.id),
		currentUser(),
	);

	if (!data || data.user_created.id !== user?.id) return notFound();

	async function update(data: unknown) {
		"use server";

		return actions.update({ id: params.id, data: data as ProfileUpdateSchema });
	}

	async function find(data: ProfileFindSchema) {
		"use server";

		return actions.find({ id: params.id, data });
	}

	async function remove() {
		"use server";

		return actions.remove(params.id);
	}

	return (
		<main className="grow flex flex-col justify-center items-center my-16">
			<h1 className="w-full max-w-5xl text-3xl font-bold mb-4 flex justify-between">
				Atualizar desaparecido
				<Link
					href={`/profiles/${data.id}`}
					className={buttonVariants({
						size: "icon",
						className: "ml-auto mr-2",
					})}
				>
					<Eye />
				</Link>
				<DeleteModal submit={remove}>
					<Button variant="destructive" size="icon">
						<Trash />
					</Button>
				</DeleteModal>
			</h1>

			<ProfileForm onSubmit={update} data={data}>
				<DeleteModal submit={remove}>
					<Button variant="destructive" size="icon">
						<Trash />
					</Button>
				</DeleteModal>
				<FindDialog submit={find}>
					<Button
						size="icon"
						variant="success"
						disabled={!!data.date_found}
						className="w-full md:max-w-[180px]"
					>
						Encontrado
					</Button>
				</FindDialog>
				<Button type="submit" size="icon">
					<SaveIcon />
				</Button>
			</ProfileForm>
		</main>
	);
}

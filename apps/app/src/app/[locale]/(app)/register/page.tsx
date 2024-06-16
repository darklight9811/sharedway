import { store } from "@/modules/entity/actions"
import EntityForm from "@/modules/entity/components/entity-form"

export default function Page () {
	return (
		<main className="grow flex flex-col justify-center items-center my-16">
			<h1 className="w-full max-w-5xl text-3xl font-bold mb-4">Registrar novo desaparecido</h1>

			<EntityForm onSubmit={store} schema="store" />
		</main>
	)
}
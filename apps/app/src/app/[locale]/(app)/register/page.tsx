import { Link } from "@/lib/navigation";
import { store } from "@/modules/entity/actions";
import EntityForm from "@/modules/entity/components/entity-form";
import { Button, buttonVariants } from "@repo/ds/ui/button";

export default function Page() {
	return (
		<main className="grow flex flex-col justify-center items-center my-16">
			<h1 className="w-full max-w-5xl text-3xl font-bold mb-4 text-primary">
				Registrar novo desaparecido
			</h1>

			<EntityForm onSubmit={store} schema="store" require>
				<Link href="/" className={buttonVariants({ variant: "outline" })}>
					Voltar
				</Link>
				<Button type="submit" className="w-full max-w-[180px]">
					Criar
				</Button>
			</EntityForm>
		</main>
	);
}

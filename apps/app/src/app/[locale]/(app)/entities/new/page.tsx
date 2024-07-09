import { Link } from "@/lib/navigation";
import { store } from "@/modules/entity/actions";
import EntityForm from "@/modules/entity/components/entity-form";
import { Button, buttonVariants } from "@repo/ds/ui/button";
import { useTranslations } from "next-intl";

export default function Page() {
	const t = useTranslations("entities");

	return (
		<main className="grow flex flex-col justify-center items-center my-16 px-2">
			<h1 className="w-full max-w-5xl text-3xl font-bold mb-4 text-primary">
				{t("create-title")}
			</h1>

			<EntityForm onSubmit={store} schema="store" require>
				<Link href="/" className={buttonVariants({ variant: "outline" })}>
					{t("back")}
				</Link>
				<Button type="submit" className="w-full max-w-[180px]">
					{t("create")}
				</Button>
			</EntityForm>
		</main>
	);
}

import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import { Alert, AlertDescription, AlertTitle } from "@repo/ds/alert";
import { Button, buttonVariants } from "@repo/ds/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ds/dialog";
import { useTranslation } from "@repo/ds/lib/localization";

import { ProfileForm } from "@repo/domains/profiles";
import { metadata } from "@repo/domains/utils/metadata";

import { trpc } from "@repo/domains";

export const meta = metadata({ title: "Novo desaparecido" });

export default function Page() {
	const { t } = useTranslation("profiles");
	const { data: user } = useQuery(trpc.auth.session.queryOptions());
	const { mutateAsync: createProfile } = useMutation(trpc.profiles.store.mutationOptions());

	if (!user) {
		return (
			<div className="grow flex flex-col justify-center items-center max-w-xl w-full mx-auto min-h-[80vh] text-center gap-4">
				<img
					alt="logo"
					height={800}
					src="/images/logo/blur.webp"
					className="absolute top-0 z-[-1]"
					width={800}
				/>

				<h1 className="text-5xl font-bold text-foreground">{t("new.unauth.title")}</h1>

				<p className="max-w-md">{t("new.unauth.description")}</p>

				<div className="flex gap-4 items-center">
					<Link
						className={buttonVariants({ className: "gap-2", variant: "dark" })}
						to="/sign-up?redirect=/profiles/new"
					>
						<img alt="" src="/images/logo/favicon-light.svg" height={16} width={16} />
						{t("new.unauth.register")}
					</Link>
					{t("new.unauth.or")}
					<Link
						className={buttonVariants({
							variant: "outline",
							className: "gap-2",
						})}
						to="https://www.instagram.com/sharedway_org/"
						target="blank"
						rel="noopener noreferrer"
					>
						<img alt="" src="/images/brands/instagram.svg" height={16} width={16} />
						Instagram
					</Link>
				</div>
			</div>
		);
	}

	return (
		<main className="grow flex flex-col justify-center items-center my-16 px-2">
			<h1 className="w-full max-w-5xl text-3xl font-bold mb-4 px-2">{t("create-title")}</h1>

			<ProfileForm onSubmit={createProfile}>
				<Link to="/profiles" className={buttonVariants({ variant: "outline" })}>
					{t("back")}
				</Link>
				<Button type="submit" variant="dark" className="w-full md:max-w-[180px]">
					{t("create")}
				</Button>
			</ProfileForm>

			<Dialog defaultOpen>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Atenção</DialogTitle>
					</DialogHeader>

					<p>
						Quando você se registrou, nos termos de uso, você se comprometeu a inserir apenas informações
						verdadeiras, tendo responsabilidade por toda e qualquer informação inserida aqui.
					</p>

					<Alert variant="destructive">
						<AlertTitle>Atenção!</AlertTitle>

						<AlertDescription>
							<p>De acordo com o código penal DECRETO-LEI No 2.848, DE 7 DE DEZEMBRO DE 1940:</p>
							Art. 340 - Provocar a ação de autoridade, comunicando-lhe a ocorrência de crime ou de
							contravenção que sabe não se ter verificado.
						</AlertDescription>
					</Alert>

					<DialogFooter>
						<DialogTrigger asChild>
							<Button>Entendido</Button>
						</DialogTrigger>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</main>
	);
}

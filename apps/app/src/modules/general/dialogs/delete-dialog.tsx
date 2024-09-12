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

interface Props {
	submit: () => Promise<unknown>;
	children: React.ReactNode;

	title?: string;
	description?: string;
}

export default function DeleteDialog(props: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>{props.children}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>{props.title || "Você tem certeza?"}</DialogTitle>
					<DialogDescription>
						{props.description ||
							"Essa ação não é reversivel, os dados serão perdidos permanentemente"}
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogTrigger asChild>
						<Button variant="outline">Voltar</Button>
					</DialogTrigger>
					<Form onSubmit={props.submit}>
						<Button variant="destructive" className="ml-auto">
							Apagar
						</Button>
					</Form>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

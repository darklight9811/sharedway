"use client";

import Field from "@repo/ds/form/field";
import Form from "@repo/ds/form/form";
import { Button } from "@repo/ds/ui/button";
import { CalendarInput } from "@repo/ds/ui/calendar-input";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ds/ui/dialog";
import {
	type ProfileFindSchema,
	profileFindSchema,
} from "@repo/schemas/profile";
import { useTranslations } from "next-intl";

interface Props {
	submit: (data: ProfileFindSchema) => Promise<unknown>;
	children: React.ReactNode;

	title?: string;
	description?: string;
}

export default function FindDialog(props: Props) {
	const t = useTranslations("profiles.new");

	return (
		<Dialog>
			<DialogTrigger asChild>{props.children}</DialogTrigger>

			<DialogContent>
				<Form
					data={{ date_found: new Date() }}
					defaultData={{ date_found: new Date() }}
					onSubmit={props.submit}
					schema={profileFindSchema}
					replace={() => <h1>Informação atualizada</h1>}
				>
					<DialogHeader>
						<DialogTitle>{props.title || "Você tem certeza?"}</DialogTitle>
					</DialogHeader>

					<Field
						label={t("date_found")}
						className="mt-4"
						name="date_found"
						required
						render={({ field }) => <CalendarInput modal {...field} />}
					/>

					<DialogFooter>
						<DialogTrigger asChild>
							<Button variant="outline">Voltar</Button>
						</DialogTrigger>
						<Button className="ml-auto" type="submit">
							Foi encontrado
						</Button>
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

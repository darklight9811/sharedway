"use client";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@repo/ds/ui/dialog";

interface Props {
	children: React.ReactNode;
}

export function FindDialog(props: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>{props.children}</DialogTrigger>

			<DialogContent>
				<DialogTitle>Encontrou esta pessoa?</DialogTitle>
			</DialogContent>
		</Dialog>
	);
}

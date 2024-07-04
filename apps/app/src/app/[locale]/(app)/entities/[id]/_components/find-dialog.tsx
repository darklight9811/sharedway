"use client";

import { buttonVariants } from "@repo/ds/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ds/ui/dialog";
import { Mail, Phone } from "lucide-react";

interface Props {
	children: React.ReactNode;

	contact?: {
		description?: string;
		options: unknown;
	} | null;
}

export function FindDialog(props: Props) {
	const options = props.contact?.options as { type: string; value: string }[];

	return (
		<Dialog>
			<DialogTrigger asChild>{props.children}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Encontrou este desaparecido?</DialogTitle>
				</DialogHeader>

				<div className="text-sm">
					{!props.contact?.description && (options.length || 0) === 0
						? "Nenhuma maneira de entrar em contato com quem registrou o desaparecido."
						: "Entre em contato através das opções disponibilizadas para informar sobre o desaparecido."}
				</div>

				{props.contact?.description && <p>{props.contact.description}</p>}

				{(options.length || 0) > 0 && (
					<ul className="flex flex-col gap-4">
						{options
							.filter((t) => t.value)
							.map((option) => (
								<li key={option.type + option.value}>
									<a
										href={`${option.type === "email" ? "mailto" : "tel"}:${option.value}`}
										className={buttonVariants({
											className: "flex justify-between w-full",
										})}
									>
										{option.type === "email" ? <Mail /> : <Phone />}{" "}
										{option.value}
									</a>
								</li>
							))}
					</ul>
				)}
			</DialogContent>
		</Dialog>
	);
}

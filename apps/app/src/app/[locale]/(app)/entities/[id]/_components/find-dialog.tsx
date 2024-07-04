"use client";

import { buttonVariants } from "@repo/ds/ui/button";
import {
	DialogDrawer,
	DialogDrawerContent,
	DialogDrawerTrigger,
} from "@repo/ds/ui/dialog-drawer";
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
		<DialogDrawer>
			<DialogDrawerTrigger asChild>{props.children}</DialogDrawerTrigger>

			<DialogDrawerContent className="p-2 flex flex-col gap-4">
				<h1 className="text-lg font-semibold leading-none tracking-tight">
					Encontrou este desaparecido?
				</h1>

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
			</DialogDrawerContent>
		</DialogDrawer>
	);
}

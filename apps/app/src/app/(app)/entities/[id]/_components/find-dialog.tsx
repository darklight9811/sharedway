"use client";

import { contactIcons } from "@/modules/entity/helpers/icon";
import { buttonVariants } from "@repo/ds/ui/button";
import {
	DialogDrawer,
	DialogDrawerContent,
	DialogDrawerTrigger,
} from "@repo/ds/ui/dialog-drawer";

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
							.map((option) => {
								const info = getInfo(option.type, option.value);

								if (!info) return null;

								return (
									<li key={option.type + option.value}>
										<a
											href={info.href}
											className={buttonVariants({
												className: "flex justify-between w-full",
											})}
										>
											{info.icon} {info.render}
										</a>
									</li>
								);
							})}
					</ul>
				)}
			</DialogDrawerContent>
		</DialogDrawer>
	);
}

function getInfo(type: string, value: string) {
	switch (type) {
		case "phone":
			return { href: `tel:${value}`, icon: contactIcons(type), render: value };
		case "email":
			return {
				href: `mailto:${value}`,
				icon: contactIcons(type),
				render: value,
			};
		case "whatsapp":
			return {
				href: `https://wa.me/${value.replace(/(\+|\-|\.|\(|\))/g, "")}`,
				icon: contactIcons("whatsapp"),
				render: value,
			};
		case "facebook":
			return {
				href: value.includes("http") ? value : `https://facebook.com/${value}`,
				icon: contactIcons("facebook"),
				render: value.split("facebook.com/").at(-1),
			};
		case "instagram":
			return {
				href: value.includes("http") ? value : `https://instagram.com/${value}`,
				icon: contactIcons("instagram"),
				render: value.split("instagram.com/").at(-1),
			};
	}
}

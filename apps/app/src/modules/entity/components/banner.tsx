"use client";

import { PDFDownloadLink, PDFViewer, render } from "@react-pdf/renderer";
import { Button, buttonVariants } from "@repo/ds/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ds/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ds/ui/select";
import { Download } from "lucide-react";
import Template01 from "../templates/template_01";

interface Props {
	images?: string[];
	description?: string;
	contact?: { type: string; value: string }[];

	children: React.ReactNode;
}

export default function Banner(props: Props) {
	const enabled = (props.images?.length || 0) > 0;
	const template = (
		<Template01
			images={props.images}
			description={props.description}
			contact={props.contact}
		/>
	);

	return (
		<Dialog>
			<DialogTrigger asChild>{props.children}</DialogTrigger>

			<DialogContent className="max-w-3xl w-full">
				<DialogHeader>
					<DialogTitle>Cartaz</DialogTitle>
					{!enabled && (
						<DialogDescription className="text-red-500">
							Você precisa ter ao menos uma foto para poder utilizar o banner
						</DialogDescription>
					)}
				</DialogHeader>
				<div className="flex flex-col md:flex-row gap-4">
					<div className="w-full md:w-2/3" id="banner">
						<PDFViewer className="w-full aspect-card">{template}</PDFViewer>
					</div>
					<div className="w-full md:w-1/3 flex flex-col gap-4">
						<Select onChange={console.log} value="1">
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">Template 1</SelectItem>
								<SelectItem value="2" disabled>
									Mais opções em breve
								</SelectItem>
							</SelectContent>
						</Select>

						<PDFDownloadLink
							document={template}
							fileName="desaparecido.pdf"
							className={buttonVariants({ className: "w-full" })}
						>
							{({ loading }) =>
								loading ? (
									"Carregando"
								) : (
									<>
										<Download /> Baixar
									</>
								)
							}
						</PDFDownloadLink>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

"use client";

import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { cn } from "../../lib/utils";
import { Label } from "../ui/label";

interface FieldProps {
	name: string;
	required?: boolean;
	render: Parameters<typeof Controller>[0]["render"];

	label?: React.ReactNode;
	description?: React.ReactNode;
	className?: string;
}

export default function Field(props: FieldProps) {
	const t = useTranslations("form.errors");

	return (
		<Controller
			name={props.name}
			render={(context) => {
				const { ref: _, ...rest } = context.field;
				const err =
					context.fieldState.error?.type || context.fieldState.error?.message;

				return (
					<fieldset className={cn("mb-4", props.className)}>
						{props.label ? (
							<Label htmlFor={props.name}>
								{props.label} {props.required ? "*" : ""}
							</Label>
						) : null}

						{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
						{props.render({ ...context, field: rest as any })}

						{props.description ? (
							<p className="text-sm text-muted-foreground">
								{props.description}
							</p>
						) : null}

						<p className="mt-2 text-sm font-medium text-destructive h-5">
							{err ? <span className="animate-top-in">{t(err)}</span> : " "}
						</p>
					</fieldset>
				);
			}}
		/>
	);
}

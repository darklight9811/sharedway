"use client"

import { Controller } from "react-hook-form"
import { useTranslations } from "next-intl"
import { cn } from "../../lib/utils"
import { Label } from "../ui/label"

interface FieldProps {
	name: string;
	render: Parameters<typeof Controller>[0]["render"];

	label?: React.ReactNode;
	description?: React.ReactNode;
	className?: string;
}

export default function Field(props: FieldProps) {
	const t = useTranslations("form.errors")

	return (
		<Controller
			name={props.name}
			render={function (context) {
				return (
					<fieldset className={cn("mb-4", props.className)}>
						{props.label ? <Label htmlFor={props.name}>{props.label}</Label> : null}

						{props.render(context)}

						{props.description ? <p className="text-sm text-muted-foreground">{props.description}</p> : null}

						<p className="mt-2 text-sm font-medium text-destructive">
							{context.fieldState.error ? t(context.fieldState.error?.type || context.fieldState.error?.message) : " "}
						</p>
					</fieldset>
				)
			}}
		/>
	)
}
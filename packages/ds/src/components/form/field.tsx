"use client"

import { Controller, useFormContext } from "react-hook-form"
import { cn } from "../../lib/utils"
import { Label } from "../ui/label"

interface FieldProps {
	name: string;
	render: Parameters<typeof Controller>[0]["render"];

	label?: React.ReactNode;
	className?: string;
}

export default function Field (props: FieldProps) {
	const { control } = useFormContext()

	return (
		<fieldset className={cn("mb-4", props.className)}>
			{props.label ? <Label htmlFor={props.name}>{props.label}</Label> : null}

			<Controller name={props.name} render={props.render} />
		</fieldset>
	)
}
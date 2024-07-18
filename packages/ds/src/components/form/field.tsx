"use client";

import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { cn } from "../../lib/utils";
import { Label } from "../ui/label";

type Context = Parameters<Parameters<typeof Controller>[0]["render"]>[0];

interface FieldProps {
	name: string;
	value?: unknown;
	required?: boolean;
	render: (
		context: Omit<Context, "field"> & {
			field: Omit<Context["field"], "ref">;
			form: ReturnType<typeof useForm>;
		},
	) => React.ReactNode;

	label?: React.ReactNode;
	description?: React.ReactNode;
	className?: string;
	errorless?: boolean;
}

export default function Field(props: FieldProps) {
	const t = useTranslations("form.errors");

	return (
		<Controller
			name={props.name}
			rules={{ required: props.required }}
			defaultValue={props.value}
			render={(context) => {
				const form = useForm();
				const { ref: _, ...field } = context.field;
				const err =
					context.fieldState.error?.type || context.fieldState.error?.message;

				return (
					<fieldset className={cn("mb-4", props.className)}>
						{props.label ? (
							<Label htmlFor={props.name}>
								{props.label} {props.required ? "*" : ""}
							</Label>
						) : null}

						{props.render({ ...context, form, field })}

						{props.description ? (
							<p className="text-sm text-muted-foreground">
								{props.description}
							</p>
						) : null}

						{props.errorless !== true && (
							<p
								className="mt-2 text-sm font-medium text-destructive h-5"
								role="alert"
							>
								{err ? <span className="animate-top-in">{t(err)}</span> : " "}
							</p>
						)}
					</fieldset>
				);
			}}
		/>
	);
}

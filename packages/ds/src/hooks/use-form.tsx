import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import type { ComponentProps } from "react";

import { Button } from "../components/button";
import { Label } from "../components/label";

export const { fieldContext, formContext, useFormContext, useFieldContext } = createFormHookContexts();

export function Submit(props: ComponentProps<typeof Button>) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => <Button {...props} type="submit" disabled={isSubmitting} />}
		</form.Subscribe>
	);
}

export const { useAppForm } = createFormHook({
	fieldComponents: {},
	formComponents: {
		Form({
			children,
			form,
			...props
		}: React.ComponentProps<"form"> & {
			form: { handleSubmit(): void; AppForm: React.ComponentType<{ children?: React.ReactNode }> };
		}) {
			return (
				<form.AppForm>
					<form
						{...props}
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						{children}
					</form>
				</form.AppForm>
			);
		},
		Submit,
		Fieldset(props: { children: React.ReactNode; label?: string }) {
			const field = useFieldContext();

			return (
				<fieldset>
					{props.label && (
						<Label className="pb-2" htmlFor={field.name}>
							{props.label}
						</Label>
					)}
					{props.children}
					<p className="mt-2 text-sm font-medium text-destructive h-5" role="alert">
						{field.state.meta.errors.map((t) => t.message).join(", ")}
					</p>
				</fieldset>
			);
		},
	},
	fieldContext,
	formContext,
});

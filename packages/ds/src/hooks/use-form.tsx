import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { Button } from "../components/ui/button";

export const { fieldContext, formContext, useFormContext, useFieldContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldComponents: {},
	formComponents: {
		Submit(props: React.ComponentProps<"button">) {
			const form = useFormContext();

			return (
				<form.Subscribe selector={(state) => state.isSubmitting}>
					{(isSubmitting) => <Button {...props} disabled={isSubmitting} />}
				</form.Subscribe>
			);
		},
		Fieldset(props: { children: React.ReactNode; label?: string }) {
			const field = useFieldContext();

			return (
				<fieldset>
					{props.label && <label htmlFor={field.name}>{props.label}</label>}
					{props.children}
				</fieldset>
			);
		},
	},
	fieldContext,
	formContext,
});

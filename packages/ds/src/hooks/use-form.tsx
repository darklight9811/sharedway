import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { Button } from "../components/ui/button";

export const { fieldContext, formContext, useFormContext, useFieldContext } = createFormHookContexts();

export function Submit(props: React.ComponentProps<"button">) {
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

			console.log(field.state.meta);

			return (
				<fieldset>
					{props.label && <label htmlFor={field.name}>{props.label}</label>}
					{props.children}
					{!field.state.meta.isValid && <em>{field.state.meta.errors.map((t) => t.message).join(", ")}</em>}
				</fieldset>
			);
		},
	},
	fieldContext,
	formContext,
});

import { useAppForm } from "@repo/ds/hooks/use-form";
import { Input } from "@repo/ds/ui/input";
import { useTranslation } from "react-i18next";

import { type UserFormSchema, userFormSchema } from "../schema";

interface Props {
	onSubmit(data: UserFormSchema): Promise<unknown>;
	data?: Partial<UserFormSchema>;

	children?: React.ReactNode;
	className?: string;
}

export function UserForm(props: Props) {
	const { t } = useTranslation("profile");
	const form = useAppForm({
		defaultValues: props.data,
		validators: {
			onSubmit: userFormSchema,
		},
	});

	return (
		<form.Form form={form} className={props.className}>
			<form.AppField
				name="name"
				children={(field) => (
					<form.Fieldset label={t("form.name")}>
						<Input value={field.state.value} onChange={field.handleChange} />
					</form.Fieldset>
				)}
			/>
			<form.AppField
				name="email"
				children={(field) => (
					<form.Fieldset label={t("form.email")}>
						<Input type="email" value={field.state.value} onChange={field.handleChange} />
					</form.Fieldset>
				)}
			/>

			{props.children}
		</form.Form>
	);
}

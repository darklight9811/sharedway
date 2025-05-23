import { Field } from "@repo/ds/form/field";
import { Form } from "@repo/ds/form/form";
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

	return (
		<Form onSubmit={props.onSubmit} schema={userFormSchema} data={props.data} className={props.className}>
			<Field name="name" label={t("form.name")} render={({ field }) => <Input {...field} />} />
			<Field name="email" label={t("form.email")} render={({ field }) => <Input type="email" {...field} />} />

			{props.children}
		</Form>
	);
}

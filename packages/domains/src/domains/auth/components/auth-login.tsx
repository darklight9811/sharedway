import { Alert, AlertDescription } from "@repo/ds/alert";
import { useAppForm } from "@repo/ds/hooks/use-form";
import { Input } from "@repo/ds/input";
import { useTranslation } from "@repo/ds/lib/localization";

import { type LoginSchema, loginSchema } from "../schema";

export interface AuthLoginProps {
	onSubmit?(props: LoginSchema): void;
	errors?: { message: string }[];
	children?: React.ReactNode;
}

export function AuthLogin(props: AuthLoginProps) {
	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: loginSchema,
		},
		onSubmit: ({ value }) => props.onSubmit?.(value),
	});
	const { t } = useTranslation("auth");

	return (
		<>
			{props.errors && (
				<Alert variant="destructive" className="animate-top-in my-2">
					<AlertDescription>{props.errors.at(0)?.message}</AlertDescription>
				</Alert>
			)}

			<form.Form form={form} className="flex flex-col w-full *:animate-top-in">
				<form.AppField
					name="email"
					children={(field) => (
						<form.Fieldset label={t("email")}>
							<Input type="email" value={field.state.value} onChange={field.handleChange} />
						</form.Fieldset>
					)}
				/>
				<form.AppField
					name="password"
					children={(field) => (
						<form.Fieldset label={t("password")}>
							<Input type="password" value={field.state.value} onChange={field.handleChange} />
						</form.Fieldset>
					)}
				/>

				{props.children}
			</form.Form>
		</>
	);
}

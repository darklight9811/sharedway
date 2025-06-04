import { Alert, AlertDescription } from "@repo/ds/alert";
import { useAppForm } from "@repo/ds/hooks/use-form";
import { Input } from "@repo/ds/input";
import { useTranslation } from "@repo/ds/lib/localization";

import { type RegisterSchema, registerSchema } from "../schema";

export interface AuthRegisterProps {
	onSubmit?(props: RegisterSchema): void;
	errors?: { message: string }[];
	children?: React.ReactNode;
}

export function AuthRegister(props: AuthRegisterProps) {
	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: registerSchema,
		},
		onSubmit: ({ value }) => props.onSubmit?.(value),
	});
	const { t } = useTranslation("auth");

	return (
		<>
			<h1 className="text-xl text-foreground-active mb-8 animate-top-in">{t("register")}</h1>

			{props.errors && (
				<Alert variant="destructive" className="animate-top-in">
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

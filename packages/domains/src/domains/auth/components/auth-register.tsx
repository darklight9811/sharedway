import { useAppForm } from "@repo/ds/hooks/use-form";
import { Trans, useTranslation } from "@repo/ds/lib/localization";
import { Alert, AlertDescription } from "@repo/ds/ui/alert";
import { Input } from "@repo/ds/ui/input";
import { Link } from "react-router";

import { type RegisterSchema, registerSchema } from "../schema";

export interface AuthRegisterProps {
	onSubmit?(props: RegisterSchema): void;
	errors?: { message: string }[];
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
	const { t } = useTranslation("general", {
		keyPrefix: "auth",
	});

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

				<p className="text-sm mb-4">By registering you agree with our terms and conditions</p>

				<form.Submit className="w-full">{t("register")}</form.Submit>

				<div className="mb-4 text-center text-sm text-foreground-active mt-6">
					<Trans
						t={t}
						i18nKey="link-login"
						components={{
							target: (
								<Link to="/login" className="underline ml-1">
									{t("login")}
								</Link>
							),
						}}
					/>
				</div>
			</form.Form>
		</>
	);
}

import { useAppForm } from "@repo/ds/hooks/use-form";
import { Trans, useTranslation } from "@repo/ds/lib/localization";
import { Alert, AlertDescription } from "@repo/ds/ui/alert";
import { Input } from "@repo/ds/ui/input";
import { Link } from "react-router";

import { type LoginSchema, loginSchema } from "../schema";

export interface AuthLoginProps {
	onSubmit?(props: LoginSchema): void;
	errors?: { message: string }[];
	disableForgot?: boolean;
	disableRegister?: boolean;
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
	const { t } = useTranslation("general", {
		keyPrefix: "auth",
	});

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

				{props.disableForgot !== true && (
					<Link to="/forgot" className="mt-4 mb-8 text-sm text-foreground-active font-medium underline">
						{t("forgot")}
					</Link>
				)}

				<form.Submit className="w-full">{t("login")}</form.Submit>

				{props.disableRegister !== true && (
					<div className="mt-4 text-center text-sm mb-2 text-foreground-active">
						<Trans
							t={t}
							i18nKey="link-register"
							components={{
								target: (
									<Link key="register" to="/register" className="underline ml-1">
										{t("register")}
									</Link>
								),
							}}
						/>
					</div>
				)}
			</form.Form>
		</>
	);
}

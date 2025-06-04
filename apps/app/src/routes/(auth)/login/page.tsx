import { trpc } from "@repo/domains";
import { AuthLogin } from "@repo/domains/auth";
import { metadata } from "@repo/domains/utils/metadata";
import { Submit } from "@repo/ds/hooks/use-form";
import { Trans, useTranslation } from "@repo/ds/lib/localization";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router";

export const meta = metadata({ title: "Login" });

export default function RegisterPage() {
	const { mutateAsync: login } = useMutation(trpc.auth.login.mutationOptions());
	const { t } = useTranslation("general", {
		keyPrefix: "auth",
	});

	return (
		<AuthLogin onSubmit={login}>
			<Link to="/forgot" className="mt-4 mb-8 text-sm text-foreground-active font-medium underline">
				{t("forgot")}
			</Link>

			<Submit>{t("login")}</Submit>

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
		</AuthLogin>
	);
}

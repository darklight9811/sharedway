import { trpc } from "@repo/domains";
import { AuthRegister } from "@repo/domains/auth";
import { Submit } from "@repo/ds/hooks/use-form";
import { Trans, useTranslation } from "@repo/ds/lib/localization";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router";

export default function RegisterPage() {
	const { mutateAsync: register } = useMutation(trpc.auth.register.mutationOptions());
	const { t } = useTranslation("general", {
		keyPrefix: "auth",
	});

	return (
		<AuthRegister onSubmit={register}>
			<p className="text-sm mb-4">By registering you agree with our terms and conditions</p>

			<Submit className="w-full">{t("register")}</Submit>

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
		</AuthRegister>
	);
}

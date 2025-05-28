import { trpc } from "@repo/domains";
import { AuthLogin } from "@repo/domains/auth";
import { useMutation } from "@tanstack/react-query";

export default function RegisterPage() {
	const { mutateAsync: login } = useMutation(trpc.auth.login.mutationOptions());

	return <AuthLogin onSubmit={login} />;
}

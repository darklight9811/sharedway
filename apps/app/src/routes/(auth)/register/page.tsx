import { trpc } from "@repo/domains";
import { AuthRegister } from "@repo/domains/auth";
import { useMutation } from "@tanstack/react-query";

export default function RegisterPage() {
	const { mutateAsync: register } = useMutation(trpc.auth.register.mutationOptions());

	return <AuthRegister onSubmit={register} />;
}

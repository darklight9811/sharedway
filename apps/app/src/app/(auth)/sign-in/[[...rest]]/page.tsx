import { SignIn } from "@clerk/nextjs";

export default async function Page({
	searchParams,
}: { searchParams: { redirect?: string } }) {
	return (
		<SignIn
			forceRedirectUrl={`/callback?redirect=${searchParams.redirect || "/"}`}
		/>
	);
}

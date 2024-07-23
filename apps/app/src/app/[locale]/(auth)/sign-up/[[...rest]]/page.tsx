import { SignUp } from "@clerk/nextjs";

export default async function Page({
	searchParams,
}: { searchParams: { redirect?: string } }) {
	return (
		<SignUp
			forceRedirectUrl={`/callback?redirect=${searchParams.redirect || "/"}`}
		/>
	);
}

import { buttonVariants } from "@repo/ds/ui/button";
import { Link } from "react-router";

export default function NotFoundPage() {
	return (
		<main className="grow flex items-center justify-center flex-col">
			<h1 className="text-5xl text-foreground-active">
				<span className="font-bold">404</span> - not found
			</h1>
			<h2>The page you are looking for couldn't be found</h2>

			<div className="mt-4 flex gap-2">
				<Link to="/" className={buttonVariants()}>
					Go back to home
				</Link>
			</div>
		</main>
	);
}

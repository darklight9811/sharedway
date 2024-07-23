"use client"; // Error components must be Client Components

import { Button, buttonVariants } from "@repo/ds/ui/button";
import Copy from "@repo/ds/ui/copy";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="grow flex gap-8 flex-col justify-center items-center w-full max-w-xs mx-auto">
			<h2 className="font-bold text-3xl">Algo deu errado!</h2>

			{error.digest && (
				<div className="w-full flex gap-2 items-center justify-center">
					Código de erro:{" "}
					<Copy className="w-[150px] bg-white" link={error.digest} />
				</div>
			)}

			<div className="flex gap-2">
				<Button type="button" onClick={reset}>
					Tentar novamente
				</Button>
				<Link href="/" className={buttonVariants()}>
					Ir para home
				</Link>
			</div>
		</div>
	);
}

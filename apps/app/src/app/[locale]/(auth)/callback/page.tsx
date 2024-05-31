import { Suspense } from "react"

export default async function Page () {
	return (
		<div className="flex grow justify-center items-center">
			<Suspense fallback={<div>yay</div>}>
				what
			</Suspense>
		</div>
	)
}
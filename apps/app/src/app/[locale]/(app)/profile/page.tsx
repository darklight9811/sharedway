import { UserProfile } from "@clerk/nextjs"

import "./override.css"

export default function Page () {
	return (
		<div className="flex justify-center my-2">
			<UserProfile
				appearance={{
					layout: {
						shimmer: false,
					},
				}}
			/>
		</div>
	)
}
import { currentUser } from "@clerk/nextjs"
import { DropdownMenu } from "@repo/ds/ui/dropdown-menu"
import Link from "next/link"

export default async function Navbar () {
	const user = await currentUser()

	return (
		<nav className="sticky shadow w-full p-2 flex justify-between">
			<span>test</span>

			<div>
				{
					user ? (
						<DropdownMenu>
							yay
						</DropdownMenu>
					) : (
						<Link href="/">login</Link>
					)
				}
			</div>
		</nav>
	)
}
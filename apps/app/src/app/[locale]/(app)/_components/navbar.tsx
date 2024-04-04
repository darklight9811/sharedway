import { currentUser } from "@clerk/nextjs"
import { DropdownMenu } from "@repo/ds/ui/dropdown-menu"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export default async function Navbar () {
	const [user, t] = await Promise.all([
		currentUser(),
		getTranslations("metadata"),
	])

	return (
		<nav className="sticky shadow w-full py-2 px-4 flex justify-between">
			<span>{t("title")}</span>

			<div>
				{
					user ? (
						<DropdownMenu>
							yay
						</DropdownMenu>
					) : (
						<Link href="/sign-in">login</Link>
					)
				}
			</div>
		</nav>
	)
}
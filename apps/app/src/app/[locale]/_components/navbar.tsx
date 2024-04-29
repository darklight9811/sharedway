import { SignOutButton, currentUser } from "@clerk/nextjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ds/ui/dropdown-menu"
import { User } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import { Link } from "../../../lib/navigation"
import { buttonVariants } from "@repo/ds/ui/button"

export default async function Navbar () {
	const [user, t] = await Promise.all([
		currentUser(),
		getTranslations("metadata"),
	])

	return (
		<nav className="sticky shadow w-full py-2 px-4 flex justify-between items-center">
			<div className="flex gap-2 items-center">
				<Link href="/">{t("title")}</Link>
				<Link className={buttonVariants({ size: "sm" })} href="/register">+</Link>
			</div>

			<div>
				{
					user ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="text-sm flex gap-2 items-center pl-2 rounded-3xl">
								{user.username || user.firstName}

								{
									user.hasImage ?
										<Image alt="user logo" className="rounded-full" height={30} src={user.imageUrl} width={30} /> :
										<div className="w-[30px] h-[30px] bg-slate-200 rounded-full flex justify-center items-center"><User /></div>
								}
							</DropdownMenuTrigger>

							<DropdownMenuContent>
								<DropdownMenuItem>
									<Link className="w-full" href="/profile">profile</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild className="w-full">
									<SignOutButton>
										Sair
									</SignOutButton>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link href="/sign-in">Login</Link>
					)
				}
			</div>
		</nav>
	)
}
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { buttonVariants } from "@repo/ds/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@repo/ds/ui/dropdown-menu";
import { Plus, Search, User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "../../lib/navigation";
import NavbarBackground from "./navbar-background";

export default async function Navbar() {
	const [user, t] = await Promise.all([
		currentUser(),
		getTranslations("general"),
	]);

	return (
		<nav className="fixed top-0 z-10 w-full py-2 px-4 flex justify-between items-center">
			<NavbarBackground />
			<div className="flex gap-2 items-center">
				<Link className="flex gap-2" href="/">
					<Image
						alt="logo"
						height={24}
						src="/images/logo/favicon-light.svg"
						width={24}
					/>
				</Link>
				<Link
					className={buttonVariants({
						size: "sm",
						variant: "secondary",
						className: "pl-1",
					})}
					href="/entities/new"
					prefetch={false}
					aria-label={t("create")}
				>
					<span>
						<Plus />
					</span>
					<span className="hidden md:inline">{t("create")}</span>
				</Link>
			</div>

			<div className="flex gap-4 items-center">
				{user ? (
					<DropdownMenu>
						<DropdownMenuTrigger className="text-sm flex gap-2 items-center rounded-3xl">
							{user.hasImage ? (
								<Image
									alt="user logo"
									className="rounded-full"
									height={30}
									src={user.imageUrl}
									width={30}
								/>
							) : (
								<div className="w-[30px] h-[30px] bg-slate-200 rounded-full flex justify-center items-center">
									<User />
								</div>
							)}
						</DropdownMenuTrigger>

						<DropdownMenuContent className="mr-2">
							<DropdownMenuItem>
								<Link className="w-full" href="/entities/current">
									{t("list")}
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link className="w-full" href="/profile">
									{t("profile")}
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild className="w-full">
								<SignOutButton>{t("logout")}</SignOutButton>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<>
						<Link href="/sign-in" className={buttonVariants()}>
							{t("login")}
						</Link>
						<Link
							href="/sign-up"
							className="mr-2 hidden md:inline text-[#3a506b]"
						>
							{t("signin")}
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}

import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { buttonVariants } from "@repo/ds/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@repo/ds/ui/dropdown-menu";
import { ArrowRight, Plus, User } from "lucide-react";
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
		<>
			<nav className="fixed top-0 left-0 z-10 w-[100vw] py-3 px-0">
				<NavbarBackground />
				<div className="container flex justify-between items-center">
					<div className="flex gap-2 items-center">
						<Link
							className="flex gap-2 font-bold text-lg translate-y-[-1px]"
							href="/"
							prefetch={false}
						>
							<Image
								alt="logo"
								height={26}
								src="/images/logo/favicon.svg"
								className="mt-0.5"
								width={26}
							/>
							<span className="hidden md:inline-block">sharedway</span>
						</Link>
						<Link
							className={buttonVariants({
								variant: "dark",
								className: "px-1.5 md:px-4 md:pl-1",
							})}
							href="/profiles/new"
							prefetch={false}
							aria-label={t("create")}
						>
							<span className="md:ml-1">
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
										<Link className="w-full" href="/profiles/current">
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
								<Link href="/sign-in" className="hidden md:inline">
									{t("login")}
								</Link>
								<Link
									href="/sign-up"
									className={buttonVariants({
										variant: "outline",
										className: "gap-2",
									})}
								>
									{t("signin")}
									<ArrowRight size="14" className="text-foreground/50" />
								</Link>
							</>
						)}
					</div>
				</div>
			</nav>
			<div className="pt-[6vh]" />
		</>
	);
}

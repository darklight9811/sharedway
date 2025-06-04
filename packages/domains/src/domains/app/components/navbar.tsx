import { buttonVariants } from "@repo/ds/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ds/dropdown-menu";
import { useTranslation } from "@repo/ds/lib/localization";
import { cn } from "@repo/ds/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowRight, Plus, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { trpc } from "../..";

export function Navbar() {
	const { t } = useTranslation();
	const { data: user } = useQuery(trpc.auth.session.queryOptions());
	const ref = useRef<HTMLDivElement>(null);
	const [shadow, setShadow] = useState<"initial" | "scroll" | "none">("initial");
	const { mutateAsync: signOut } = useMutation(trpc.auth.logout.mutationOptions());

	useEffect(() => {
		function onScroll(e: Event) {
			setShadow(
				(e.target as unknown as { scrollingElement: Element }).scrollingElement.scrollTop > 25
					? "scroll"
					: "none",
			);
		}

		setShadow((document.scrollingElement?.scrollTop || 0) > 25 ? "scroll" : "none");

		document.addEventListener("scroll", onScroll);

		return () => {
			document.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<>
			<nav className="fixed top-0 left-0 z-10 w-[100vw] py-3 px-0">
				<div
					ref={ref}
					className={cn(
						"z-[-1] absolute top-0 left-0 w-full h-full transition-[opacity,shadow] opacity-0 backdrop-blur bg-background/90",
						shadow === "initial" ? "opacity-100" : shadow === "scroll" ? "shadow-md opacity-100" : "",
					)}
				/>
				<div className="md:container mx-auto px-2 flex justify-between items-center">
					<div className="flex gap-2 items-center">
						<Link className="flex gap-2 font-bold text-lg translate-y-[-1px]" to="/">
							<img alt="logo" height={26} width={26} src="/images/logo/favicon.svg" className="mt-0.5" />
							<span className="hidden md:inline-block">sharedway</span>
						</Link>
						<Link
							className={buttonVariants({
								variant: "dark",
								className: "px-1.5 md:px-4 md:pl-1",
							})}
							to="/profiles/new"
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
									{user.image ? (
										<img
											alt="user logo"
											className="rounded-full"
											height={30}
											src={user.image}
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
										<Link className="w-full" to="/profiles/current">
											{t("list")}
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Link className="w-full" to="/profile">
											{t("profile")}
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild className="w-full" onClick={() => signOut()}>
										{t("logout")}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<>
								<Link to="/sign-in" className="hidden md:inline">
									{t("login")}
								</Link>
								<Link
									to="/sign-up"
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

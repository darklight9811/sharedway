import { env } from "@repo/domains/app";
import { useTranslation } from "@repo/ds/lib/localization";
import { cn } from "@repo/ds/lib/utils";
import { MailIcon } from "lucide-react";
import { Link } from "react-router";

export interface Props {
	className?: string;
}

export function Footer(props: Props) {
	const { t } = useTranslation("general", { keyPrefix: "general" });

	return (
		<footer className={cn("w-full flex flex-col flex-wrap gap-4 justify-evenly items-center p-4", props.className)}>
			<div className="flex flex-col md:flex-row text-center md:text-left !p-0 container mx-auto gap-8">
				<div className="flex flex-col w-full md:w-1/4">
					<Link
						to="/"
						className="flex justify-center md:justify-start text-xl gap-2 font-bold mb-4"
						aria-label="home"
					>
						<img src="/images/logo/favicon.svg" alt="" width={20} height={20} />

						{env.name}
					</Link>

					<p>{t("description")}</p>
				</div>

				<div className="flex flex-col w-full md:w-1/4">
					<h2 className="font-bold mb-4">Home</h2>

					<ul className="flex flex-col gap-2">
						<li>
							<Link to="/">{t("landing")}</Link>
						</li>
						<li>
							<Link to="/profiles">{t("search")}</Link>
						</li>
						<li>
							<Link to="/profiles/new">{t("new")}</Link>
						</li>
					</ul>
				</div>

				<div className="flex flex-col w-full md:w-1/4">
					<h2 className="font-bold mb-4">Legal</h2>

					<ul className="flex flex-col gap-2">
						<li>
							<Link to="/legal/usage">{t("usage")}</Link>
						</li>
						<li>
							<Link to="/legal/privacy">{t("privacy")}</Link>
						</li>
					</ul>
				</div>

				<div className="flex flex-col w-full md:w-1/4 gap-2">
					<h2 className="font-bold mb-2">{t("contact")}</h2>

					<Link
						to="https://www.facebook.com/sharedway.org/"
						target="_blank"
						className="flex gap-2"
						aria-label="facebook"
					>
						<img src="/images/brands/facebook.svg" alt="" width={16} height={16} />
						facebook
					</Link>

					<Link
						to="https://www.instagram.com/sharedway_org/"
						target="_blank"
						className="flex gap-2"
						aria-label="instagram"
					>
						<img src="/images/brands/instagram.svg" alt="" width={16} height={16} />
						instagram
					</Link>

					<a href="mail:rafael.correa@yamiassu.com.br" className="flex gap-2 items-center">
						<MailIcon size={16} /> rafael.correa@yamiassu.com.br
					</a>

					<div className="flex gap-2">
						<img src="/images/screenshots/app_store.png" alt="" width={136} height={40} />
						<img
							src="/images/screenshots/play_store.png"
							alt=""
							width={136}
							height={40}
							className="opacity-50"
						/>
					</div>
				</div>
			</div>

			<hr className="container mt-4" />

			<Link to="/" className="text-slate-900 text-base font-normal w-full text-center">
				© {new Date().getFullYear()} {env.name}. {t("rights")}
			</Link>
		</footer>
	);
}

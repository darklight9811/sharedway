import { Link } from "@/lib/navigation";
import { cn } from "@repo/ds/utils";
import { env } from "@repo/env";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface Props {
	className?: string;
}

export default function Footer(props: Props) {
	const t = useTranslations("general");

	return (
		<footer
			className={cn(
				"w-full flex flex-col sm:flex-row text-center gap-4 justify-evenly items-center py-4 px-2",
				props.className,
			)}
		>
			<Link href="/" className="text-slate-900 text-base font-normal">
				© {new Date().getFullYear()} {env.APP_NAME}. {t("rights")}
			</Link>

			<Link href="/">
				<Image src="/images/logo/favicon.svg" alt="" width={40} height={40} />
			</Link>

			<Link href="https://www.instagram.com/sharedway_org/" target="_blank">
				<Image
					src="/images/brands/instagram.svg"
					alt=""
					width={40}
					height={40}
				/>
			</Link>

			<div className="flex gap-4">
				<Image
					src="/images/screenshots/app_store.png"
					alt=""
					width={120}
					height={40}
				/>
				<Image
					src="/images/screenshots/play_store.png"
					alt=""
					width={120}
					height={40}
					className="opacity-50"
				/>
			</div>
		</footer>
	);
}

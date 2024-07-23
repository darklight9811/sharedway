import { Link } from "@/lib/navigation";
import { cn } from "@repo/ds/utils";
import { env } from "@repo/env";
import { useTranslations } from "next-intl";

interface Props {
	className?: string;
}

export default function Footer(props: Props) {
	const t = useTranslations("general");

	return (
		<footer
			className={cn(
				"w-full flex flex-col sm:flex-row text-center gap-4 justify-evenly py-4 px-2",
				props.className,
			)}
		>
			<Link href="/">
				© {new Date().getFullYear()} {env.APP_NAME}. {t("rights")}
			</Link>

			<Link prefetch={false} href="/terms">
				{t("terms")}
			</Link>
			<Link prefetch={false} href="/privacy">
				{t("privacy")}
			</Link>
		</footer>
	);
}

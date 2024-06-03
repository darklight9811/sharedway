import { Link } from "@/lib/navigation";
import { cn } from "@repo/ds/utils";
import { env } from "@repo/env";

interface Props {
	className?: string;
}

export default function Footer (props: Props) {
	return (
		<footer className={cn("w-full flex justify-evenly py-1 px-2", props.className)}>
			<Link href="/">© {(new Date()).getFullYear()} {env.APP_NAME}. All rights reserved.</Link>

			<Link href="/terms">Terms of use</Link>
			<Link href="/privacy">Privacy term</Link>
		</footer>
	)
}
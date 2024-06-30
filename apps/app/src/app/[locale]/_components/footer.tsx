import { Link } from "@/lib/navigation";
import { cn } from "@repo/ds/utils";
import { env } from "@repo/env";

interface Props {
	className?: string;
}

export default function Footer(props: Props) {
	return (
		<footer
			className={cn(
				"w-full flex flex-col sm:flex-row text-center gap-4 justify-evenly py-4 px-2",
				props.className,
			)}
		>
			<Link href="/">
				© {new Date().getFullYear()} {env.APP_NAME}. Todos os direitos
				reservados.
			</Link>

			<Link prefetch={false} href="/terms">
				Termos de uso
			</Link>
			<Link prefetch={false} href="/privacy">
				Termos de privacidade
			</Link>
		</footer>
	);
}

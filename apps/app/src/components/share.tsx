import { Button } from "@repo/ds/ui/button";
import {
	DialogDrawer,
	DialogDrawerContent,
	DialogDrawerTrigger,
} from "@repo/ds/ui/dialog-drawer";
import { cn } from "@repo/ds/utils";
import { Facebook, Mail, Twitter } from "lucide-react";

interface Props {
	link: string;
	description?: string;

	children?: React.ReactNode;
}

export default function Share(props: Props) {
	return (
		<DialogDrawer>
			<DialogDrawerTrigger asChild>
				{props.children || <Button type="button">Compartilhar</Button>}
			</DialogDrawerTrigger>

			<DialogDrawerContent title="Compartilhar" cancel="Cancelar">
				<div className="flex justify-evenly my-4">
					<MediaButton
						href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.link)}`}
						title="facebook"
						className="bg-[#3B5998] text-white"
					>
						<Facebook />
					</MediaButton>
					<MediaButton
						href={`https://twitter.com/share?url=${encodeURIComponent(props.link)}`}
						title="twitter"
						className="bg-[#55acee] text-white"
					>
						<Twitter />
					</MediaButton>
					<MediaButton
						href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.link)}`}
						title="whatsapp"
					>
						<Facebook />
					</MediaButton>
					<MediaButton
						href={`mailto:?subject=${encodeURIComponent(props.link)}`}
						title="email"
						className="bg-[#444444] text-white"
					>
						<Mail />
					</MediaButton>
				</div>
			</DialogDrawerContent>
		</DialogDrawer>
	);
}

function MediaButton(props: {
	href: string;
	children: React.ReactNode;
	title: string;
	className?: string;
}) {
	return (
		<a
			className={cn(
				"rounded-full aspect-square w-full max-w-12 flex justify-center items-center",
				props.className,
			)}
			href={props.href}
			target="blank"
			title={props.title}
		>
			{props.children}
		</a>
	);
}

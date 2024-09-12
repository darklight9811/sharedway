import { Button } from "@repo/ds/ui/button";
import Copy from "@repo/ds/ui/copy";
import {
	DialogDrawer,
	DialogDrawerContent,
	DialogDrawerTrigger,
} from "@repo/ds/ui/dialog-drawer";
import { cn } from "@repo/ds/utils";
import { Mail } from "lucide-react";
import Image from "next/image";
import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

interface Props {
	link: string;
	description?: string;

	children?: React.ReactNode;
}

export default function Share(props: Props) {
	return (
		<DialogDrawer>
			<DialogDrawerTrigger asChild>
				{props.children || <Button>Compartilhar</Button>}
			</DialogDrawerTrigger>

			<DialogDrawerContent
				title="Compartilhar"
				cancel="Cancelar"
				className="px-4"
			>
				<Copy link={props.link} />

				<div className="flex justify-between my-4">
					<MediaButton
						href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.link)}`}
						title="facebook"
						className="bg-[#3B5998] text-white"
					>
						<Image
							src="/images/brands/facebook.svg"
							width={24}
							height={24}
							alt="facebook logo"
						/>
					</MediaButton>
					<MediaButton
						href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${props.description}\n\nLink: ${props.link}`)}`}
						title="twitter"
						className="bg-black text-white"
					>
						<Image
							src="/images/brands/x.svg"
							width={24}
							height={24}
							alt="x logo"
						/>
					</MediaButton>
					<MediaButton
						href={`whatsapp://send?text=${encodeURIComponent(`${props.description}\n\nLink: ${props.link}`)}`}
						title="whatsapp"
						className="bg-[#25D366] text-white"
						data-action="share/whatsapp/share"
					>
						<Image
							src="/images/brands/whatsapp.svg"
							width={24}
							height={24}
							alt="whatsapp logo"
						/>
					</MediaButton>
					<MediaButton
						href={`mailto:?subject=${encodeURIComponent(props.description || "")}&body=${encodeURIComponent(`Link: ${props.link}`)}`}
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

function MediaButton(
	props: DetailedHTMLProps<
		AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>,
) {
	return (
		<a
			{...props}
			className={cn(
				"rounded-full aspect-square w-full max-w-12 flex justify-center items-center",
				props.className,
			)}
			target="blank"
		/>
	);
}

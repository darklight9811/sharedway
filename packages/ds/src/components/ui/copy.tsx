"use client";

import { Copy as CopyIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface Props {
	link: string;

	className?: string;
}

export default function Copy(props: Props) {
	return (
		<div
			className={cn(
				"w-full relative flex overflow-hidden border-2 rounded-xl p-2",
				props.className,
			)}
		>
			<span className="text-ellipsis w-full text-nowrap">{props.link}</span>

			<div
				className="absolute w-full h-full left-0 top-0 pointer-events-none"
				style={{
					background: "linear-gradient(to right, transparent 50%, white 90%)",
				}}
			/>

			<button
				type="button"
				className="absolute right-2"
				onClick={() => {
					navigator.clipboard.writeText(props.link);
				}}
			>
				<CopyIcon />
			</button>
		</div>
	);
}

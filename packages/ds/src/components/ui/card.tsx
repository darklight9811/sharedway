import { Flag, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

interface CardProps {
	id: string;
	name: string;
	pictures: { url: string }[];

	className?: string;
}

export default function Card(props: CardProps) {
	return (
		<div
			className={cn(
				"relative overflow-hidden flex flex-col justify-end shadow rounded-[24px] bg-gray-400 max-w-[47%] sm:max-w-[210px] w-full aspect-card bg-cover bg-center hover:-translate-y-0.5 transition-transform",
				props.className,
			)}
			style={{ backgroundImage: `url(${props.pictures.at(0)?.url})` }}
		>
			<div className="absolute bg-gradient-to-t from-black to-[rgba(0,0,0,0)] w-full h-full" />

			<Link
				className="grow z-10"
				href={`/profiles/${props.id}`}
				prefetch={false}
			/>

			<div className="p-3 text-white z-10">
				<span className="pointer-events-none pl-1">{props.name}</span>
			</div>
		</div>
	);
}

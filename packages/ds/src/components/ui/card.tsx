import { Flag, Home } from "lucide-react"
import Link from "next/link"

interface CardProps {
	id: string;
	name: string;
	img?: string;
}

export default function Card (props: CardProps) {
	return (
		<Link
			className="relative overflow-hidden flex flex-col justify-end shadow rounded-lg bg-gray-400 max-w-[320px] w-full aspect-card bg-cover bg-center hover:-translate-y-0.5 transition-transform"
			href={`/entities/${props.id}`}
			style={{ backgroundImage: `url(${props.img})` }}
		>
			<div className="absolute bg-gradient-to-t from-black to-[rgba(0,0,0,0)] w-full h-full" />

			<div className="p-2 text-white z-10">
				<span>{props.name}</span>

				<div className="flex w-full mt-1 gap-4">
					<Link href={`/report?entity=${props.id}`}><Home /></Link>
					<Link href={`/report?entity=${props.id}`}><Flag /></Link>
				</div>
			</div>
		</Link>
	)
}
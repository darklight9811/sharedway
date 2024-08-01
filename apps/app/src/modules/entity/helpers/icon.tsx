import { Mail, Phone } from "lucide-react";
import Image from "next/image";

function buildIcon(path: string, size: number) {
	return (
		<Image
			src={`/images/brands/${path}.svg`}
			width={size}
			height={size}
			alt={`${path} logo`}
		/>
	);
}

export function contactIcons(type: string, size = 16) {
	switch (type) {
		case "phone":
			return <Phone size={size} />;
		case "email":
			return <Mail size={size} />;
		default:
			return buildIcon(type, size);
	}
}

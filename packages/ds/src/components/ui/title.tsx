import { createElement } from "react";

interface Props {
	anchor: string;
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	className?: string;
	children?: React.ReactNode;
}

export default function Title(props: Props) {
	return createElement(
		props.as || "h2",
		{
			id: props.anchor,
			className: props.className,
		},
		<a href={`#${props.anchor}`}>{props.children}</a>,
	);
}

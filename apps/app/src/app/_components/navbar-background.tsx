"use client";

import { cn } from "@repo/ds/utils";
import { useEffect, useRef, useState } from "react";

export default function NavbarBackground() {
	const ref = useRef<HTMLDivElement>(null);
	const [shadow, setShadow] = useState<"initial" | "scroll" | "none">(
		"initial",
	);

	useEffect(() => {
		function onScroll(e: Event) {
			setShadow(
				(e.target as unknown as { scrollingElement: Element }).scrollingElement
					.scrollTop > 25
					? "scroll"
					: "none",
			);
		}

		setShadow(
			(document.scrollingElement?.scrollTop || 0) > 25 ? "scroll" : "none",
		);

		document.addEventListener("scroll", onScroll);

		return () => {
			document.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<div
			ref={ref}
			className={cn(
				"z-[-1] absolute top-0 left-0 w-full h-full transition-[opacity,shadow] opacity-0 backdrop-blur bg-background/90",
				shadow === "initial"
					? "opacity-1"
					: shadow === "scroll"
						? "shadow-md opacity-1"
						: "",
			)}
		/>
	);
}

"use client";

import { cn } from "@repo/ds/utils";
import { useEffect, useRef, useState } from "react";

export default function NavbarBackground() {
	const ref = useRef<HTMLDivElement>(null);
	const [shadow, setShadow] = useState(false);

	useEffect(() => {
		function onScroll(e: Event) {
			setShadow(
				(e.target as unknown as { scrollingElement: Element }).scrollingElement
					.scrollTop > 25,
			);
		}

		document.addEventListener("scroll", onScroll);

		return () => {
			document.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<div
			ref={ref}
			className={cn(
				"z-[-1] absolute top-0 left-0 w-full h-full transition-[opacity,shadow] opacity-0 bg-gradient-to-l from-[#f1f1f1] to-[#E9F6FE]",
				shadow ? "shadow-md opacity-1" : "",
			)}
		/>
	);
}

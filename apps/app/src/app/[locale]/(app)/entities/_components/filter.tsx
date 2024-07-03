"use client";

import { usePathname } from "@/lib/navigation";
import Field from "@repo/ds/form/field";
import Form from "@repo/ds/form/form";
import { Input } from "@repo/ds/ui/input";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface Props {
	data?: Record<string, unknown>;
}

export function Filter(props: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const timer = useRef<NodeJS.Timeout>();

	return (
		<Form
			data={props.data}
			onChange={(_, data) => {
				if (timer.current) clearTimeout(timer.current);

				timer.current = setTimeout(() => {
					const values = new URLSearchParams(data as Record<string, string>);
					router.push(`${pathname}?${values.toString()}`);
				}, 150);
			}}
		>
			<Field
				name="q"
				label="Pesquisar"
				render={({ field }) => {
					return <Input {...field} />;
				}}
			/>
		</Form>
	);
}

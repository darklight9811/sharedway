"use client";

import Field from "@repo/ds/form/field";
import Form from "@repo/ds/form/form";
import { Button, buttonVariants } from "@repo/ds/ui/button";
import { Checkbox } from "@repo/ds/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ds/ui/select";
import { ArrowDownAz, ArrowUpAz } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface Props {
	data?: Record<string, unknown>;
	order?: Record<string, string>;

	className?: string;
}

export function Sort(props: Props) {
	const router = useRouter();
	const timer = useRef<NodeJS.Timeout>();

	return (
		<Form
			className={props.className}
			data={{ order: Object.keys(props.order || {})[0], ...props.data }}
			onChange={(_, data) => {
				if (timer.current) clearTimeout(timer.current);

				const url = new URL(window.location.href);

				Object.entries(data).map(([key, value]) =>
					url.searchParams.set(key, (value as string) || ""),
				);
				router.push(`${url.pathname}?${url.searchParams.toString()}`);
			}}
		>
			{props.order && (
				<Field
					name="order"
					errorless
					render={({ field }) => (
						<Select {...field}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(props.order as Record<string, string>).map(
									([key, value]) => (
										<SelectItem key={key} value={key}>
											{value}
										</SelectItem>
									),
								)}
							</SelectContent>
						</Select>
					)}
				/>
			)}
			<Field
				name="sort"
				errorless
				render={({ field: { onChange, ...field } }) => (
					<>
						<Checkbox
							{...field}
							onClick={() => onChange(field.value === "asc" ? "desc" : "asc")}
							className={buttonVariants({
								className: "*:absolute w-10",
								variant: "outline",
							})}
						>
							{field.value === "asc" ? <ArrowDownAz /> : <ArrowUpAz />}
						</Checkbox>
					</>
				)}
			/>
		</Form>
	);
}

import { ArrowDownAz, ArrowUpAz } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router";

import { buttonVariants } from "@repo/ds/button";
import { Checkbox } from "@repo/ds/checkbox";
import { useAppForm } from "@repo/ds/hooks/use-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ds/select";

interface Props {
	data?: Record<string, unknown>;
	order?: Record<string, string>;

	className?: string;
}

export function Sort(props: Props) {
	const navigate = useNavigate();
	const timer = useRef<NodeJS.Timeout>(null);
	const form = useAppForm({
		defaultValues: { order: Object.keys(props.order || {})[0], ...props.data },
		onSubmit({ value }) {
			if (timer.current) clearTimeout(timer.current);

			const url = new URL(window.location.href);

			Object.entries(value).map(([key, value]) => url.searchParams.set(key, (value as string) || ""));
			navigate(`${url.pathname}?${url.searchParams.toString()}`);
		},
	});

	return (
		<form.Form form={form} className={props.className}>
			{props.order && (
				<form.AppField
					name="order"
					children={(field) => (
						<Select value={field.state.value} onValueChange={field.handleChange}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(props.order as Record<string, string>).map(([key, value]) => (
									<SelectItem key={key} value={key}>
										{value}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				/>
			)}
			<form.AppField
				name="sort"
				children={(field) => (
					<>
						<Checkbox
							onClick={() => field.handleChange(field.state.value === "asc" ? "desc" : "asc")}
							className={buttonVariants({
								className: "*:absolute w-10",
								variant: "outline",
							})}
						>
							{field.state.value === "asc" ? <ArrowDownAz /> : <ArrowUpAz />}
						</Checkbox>
					</>
				)}
			/>
		</form.Form>
	);
}

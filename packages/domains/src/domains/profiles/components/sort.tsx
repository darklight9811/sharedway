import { ArrowDownAz, ArrowUpAz } from "lucide-react";

import { buttonVariants } from "@repo/ds/button";
import { Checkbox } from "@repo/ds/checkbox";
import { useSearch } from "@repo/ds/hooks/use-search";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ds/select";

import { paginationSchema } from "../../app";

interface Props {
	order?: Record<string, string>;

	className?: string;
}

export function Sort(props: Props) {
	const [pagination, setPagination] = useSearch(paginationSchema);

	return (
		<div className={props.className}>
			<Select
				value={pagination.order || Object.keys(props.order || {})[0]}
				onValueChange={(value) => setPagination({ ...pagination, order: value })}
			>
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
			<Checkbox
				checked={false}
				onClick={() => setPagination({ ...pagination, sort: pagination.sort === "asc" ? "desc" : "asc" })}
				className={buttonVariants({
					className: "*:absolute w-10",
					variant: "outline",
				})}
			>
				{pagination.sort === "asc" ? <ArrowDownAz /> : <ArrowUpAz />}
			</Checkbox>
		</div>
	);
}

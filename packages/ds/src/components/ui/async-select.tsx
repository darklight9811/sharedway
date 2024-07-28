import type { Pagination } from "@repo/schemas/pagination";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Combobox } from "./combobox";

interface Props {
	name: string;
	value: string;
	onChange: (value: string) => void;
	action: (payload: Pagination) => Promise<{
		data: any;
		errors?: any;
	}>;
	t?: {
		placeholder: string;
		loading: string;
		empty: string;
	};
}

export function AsyncSelect(props: Props) {
	const [type, settype] = useState("");
	const delay = useRef<ReturnType<typeof setTimeout>>();
	const [isLoading, setIsLoading] = useState(false);
	const { data } = useQuery({
		placeholderData: [] as { value: string; label: string }[],
		queryKey: ["_select", props.name, type],
		queryFn({ queryKey: [, , q] }) {
			return props.action({ q, page: 1, limit: 25, sort: "asc" }).then((t) => {
				setIsLoading(false);
				return t.data || [];
			});
		},
	});

	return (
		<Combobox
			options={data || []}
			value={props.value || ""}
			onChange={props.onChange}
			loading={isLoading}
			onTextChange={(value) => {
				setIsLoading(true);
				if (delay.current) clearTimeout(delay.current);
				delay.current = setTimeout(() => settype(value), 300);
			}}
			t={props.t}
		/>
	);
}

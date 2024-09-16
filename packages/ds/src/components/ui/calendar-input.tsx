import { CalendarIcon } from "lucide-react";
import type { ControllerRenderProps } from "react-hook-form";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface Props extends Omit<ControllerRenderProps, "ref"> {
	mode?: "range" | "single";
	modal?: boolean;
}

export function CalendarInput({ mode, modal, ...field }: Props) {
	return (
		<Popover modal={modal}>
			<PopoverTrigger asChild>
				<Button className="w-full justify-start px-3 gap-2" variant="outline">
					<CalendarIcon />

					{(() => {
						const { value } = field;

						if (mode !== "range") return value?.toLocaleString().split(",")[0];
						if (!field.value?.to)
							return value?.from?.toLocaleString().split(",")[0];

						return `${value?.from?.toLocaleString().split(",")[0]}-${value?.to?.toLocaleString().split(",")[0]}`;
					})()}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Calendar
					mode={mode || "single"}
					selected={field.value}
					onSelect={field.onChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

import { CalendarIcon } from "lucide-react";
import type { ComponentProps } from "react";
import type { DayPicker } from "react-day-picker";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type Props = ComponentProps<typeof DayPicker> & {
	modal?: boolean;
};

export function CalendarInput({ modal, ...props }: Props) {
	return (
		<Popover modal={modal}>
			<PopoverTrigger asChild>
				<Button className="w-full justify-start px-3 gap-2" variant="outline">
					<CalendarIcon />

					{(() => {
						if (props.mode !== "range") return props.selected?.toLocaleString().split(",")[0];
						if (!props.selected?.to) return props.selected?.from?.toLocaleString().split(",")[0];

						return `${props.selected?.from?.toLocaleString().split(",")[0]}-${props.selected?.to?.toLocaleString().split(",")[0]}`;
					})()}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Calendar {...props} initialFocus />
			</PopoverContent>
		</Popover>
	);
}

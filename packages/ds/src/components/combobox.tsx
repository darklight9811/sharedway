import { CommandLoading } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { cn } from "../lib/utils";
import { Button } from "./button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface Props {
	placeholder?: string;
	t?: {
		empty: string;
		loading: string;
	};

	value?: string;
	onChange?: (value: string) => void;
	onTextChange?: (text: string) => void;
	loading?: boolean;
	creatable?: boolean;
	prefix?: React.ReactNode;
	className?: string;
	options?: {
		id?: string;
		name?: string;
		value: string;
		label?: React.ReactNode;
	}[];
}

export function Combobox(props: Props) {
	const [open, setOpen] = React.useState(false);
	const [text, settext] = React.useState("");
	const [value, setValue] = React.useState(props.value || "");

	React.useEffect(() => {
		setValue(props.value || "");
	}, [props.value]);

	const options = React.useMemo(() => {
		return (
			props.options?.map((option) => ({
				value: option.id || option.value || option.label,
				label: option.name || option.label || option.value,
			})) || []
		).concat(text ? [{ value: text, label: text }] : []);
	}, [props.options, text]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					aria-expanded={open}
					className={cn("w-full justify-between px-2", props.className)}
				>
					<span className="flex gap-2 items-center">
						{props.prefix}
						{value ? (
							options.find((option) => option.value === value)?.label
						) : (
							<span>{props.placeholder || ""}</span>
						)}
					</span>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command shouldFilter={false}>
					<CommandInput
						placeholder={props.placeholder}
						onValueChange={(value) => {
							if (props.creatable) settext(value);
							props.onTextChange?.(value);
						}}
					/>
					<CommandEmpty>{props.t?.empty}</CommandEmpty>
					{(!props.options || props.loading) && props.t?.loading && (
						<CommandLoading>{props.t.loading}</CommandLoading>
					)}
					<CommandList>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value as string}
									value={option.value as string}
									className="gap-2 justify-between"
									onSelect={(currentValue) => {
										const select = currentValue === value ? "" : currentValue;
										setValue(select);
										props.onChange?.(select);
										setOpen(false);
									}}
								>
									<div className="flex gap-2 items-center">{option.label}</div>
									<Check
										className={cn("h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

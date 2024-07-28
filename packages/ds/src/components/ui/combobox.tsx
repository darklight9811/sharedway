"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { CommandLoading } from "cmdk";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface Props {
	t?: {
		placeholder: string;
		empty: string;
		loading: string;
	};

	value: string;
	onChange: (value: string) => void;
	onTextChange?: (text: string) => void;
	loading?: boolean;
	options?: {
		id?: string;
		name?: string;
		value: string;
		label?: React.ReactNode;
	}[];
}

export function Combobox(props: Props) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	const options = React.useMemo(() => {
		return (
			props.options?.map((option) => ({
				value: option.id || option.value || option.label,
				label: option.name || option.label || option.value,
			})) || []
		);
	}, [props.options]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value ? (
						options.find((option) => option.value === value)?.label
					) : (
						<span>{props.t?.placeholder || ""}</span>
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command shouldFilter={false}>
					<CommandInput
						placeholder={props.t?.placeholder}
						onValueChange={props.onTextChange}
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
									onSelect={(currentValue) => {
										const select = currentValue === value ? "" : currentValue;
										setValue(select);
										props.onChange(select);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === option.value ? "opacity-100" : "opacity-0",
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

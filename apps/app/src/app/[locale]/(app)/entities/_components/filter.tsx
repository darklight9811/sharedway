"use client";

import Field from "@repo/ds/form/field";
import Form from "@repo/ds/form/form";
import { Button } from "@repo/ds/ui/button";
import { Calendar } from "@repo/ds/ui/calendar";
import { Input } from "@repo/ds/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ds/ui/popover";
import { parseToDate, stringifyDate } from "@repo/ds/utils/date";
import { CalendarIcon, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface Props {
	data?: Record<string, unknown>;
}

export function Filter(props: Props) {
	const router = useRouter();
	const timer = useRef<NodeJS.Timeout>();
	const t = useTranslations("entities");

	return (
		<Form
			className="bg-white *:m-0 p-2 rounded-lg shadow flex gap-4 flex-col"
			data={{
				...props.data,
				date_disappeared: parseToDate(props.data?.date_disappeared as string),
			}}
			onSubmit={async (_, data) => {
				if (timer.current) clearTimeout(timer.current);

				timer.current = setTimeout(() => {
					const url = new URL(window.location.href);
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					const payload = data as Record<string, any>;

					url.searchParams.set("q", payload.q || "");
					url.searchParams.set(
						"date_disappeared",
						payload.date_disappeared
							? stringifyDate(payload.date_disappeared)
							: "",
					);

					router.push(`${url.pathname}?${url.searchParams.toString()}`);
				}, 150);
			}}
		>
			<Field
				name="q"
				label={t("search")}
				errorless
				render={({ field }) => {
					return <Input {...field} />;
				}}
			/>

			<Field
				name="date_disappeared"
				label={t("date_disappeared")}
				errorless
				render={({ field }) => (
					<Popover>
						<PopoverTrigger asChild>
							<Button
								className="w-full justify-start px-2 gap-2"
								variant="outline"
							>
								<CalendarIcon />

								{(() => {
									if (!field.value?.to)
										return field.value?.from?.toLocaleString().split(",")[0];

									return `${field.value?.from?.toLocaleString().split(",")[0]}-${field.value?.to?.toLocaleString().split(",")[0]}`;
								})()}
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<Calendar
								mode="range"
								selected={field.value}
								onSelect={field.onChange}
								{...field}
							/>
						</PopoverContent>
					</Popover>
				)}
			/>

			<div className="flex gap-2">
				<Button type="submit" className="w-full">
					Aplicar
				</Button>
				<Button
					type="button"
					variant="destructive"
					onClick={() => {
						const url = new URL(window.location.href);

						url.searchParams.delete("q");
						url.searchParams.delete("date_disppeared");

						router.push(`${url.pathname}?${url.searchParams.toString()}`);
					}}
				>
					<Trash />
				</Button>
			</div>
		</Form>
	);
}

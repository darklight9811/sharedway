"use client";

import Field from "@repo/ds/form/field";
import Form from "@repo/ds/form/form";
import { Button } from "@repo/ds/ui/button";
import { Calendar } from "@repo/ds/ui/calendar";
import { CalendarInput } from "@repo/ds/ui/calendar-input";
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
	const timer = useRef<ReturnType<typeof setTimeout>>();
	const t = useTranslations("profiles");

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
				render={({ field }) => <CalendarInput mode="range" {...field} />}
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

"use client";

import Field from "@repo/ds/form/field";
import Form from "@repo/ds/form/form";
import { Button } from "@repo/ds/ui/button";
import { Calendar } from "@repo/ds/ui/calendar";
import { Input } from "@repo/ds/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ds/ui/popover";
import { CalendarIcon } from "lucide-react";
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
			data={props.data}
			onChange={(_, data) => {
				if (timer.current) clearTimeout(timer.current);

				timer.current = setTimeout(() => {
					const url = new URL(window.location.href);

					Object.entries(data).map(([key, value]) =>
						url.searchParams.set(key, (value as string) || ""),
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
								<CalendarIcon /> 1992 - 1998
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<Calendar mode="range" {...field} />
						</PopoverContent>
					</Popover>
				)}
			/>

			<Button>Limpar filtro</Button>
		</Form>
	);
}

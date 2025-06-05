import { Trash } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router";

import { Button } from "@repo/ds/button";
import { CalendarInput } from "@repo/ds/calendar-input";
import { useAppForm } from "@repo/ds/hooks/use-form";
import { Input } from "@repo/ds/input";
import { parseToDate, stringifyDate } from "@repo/ds/lib/date";
import { useTranslation } from "@repo/ds/lib/localization";

interface Props {
	data?: Record<string, unknown>;
}

export function Filter(props: Props) {
	const navigate = useNavigate();
	const timer = useRef<ReturnType<typeof setTimeout>>(null);
	const { t } = useTranslation("profiles");
	const form = useAppForm({
		defaultValues: {
			...props.data,
			q: (props.data?.q as string) || "",
			date_disappeared: parseToDate(props.data?.date_disappeared as string),
		},
		onSubmit({ value }) {
			if (timer.current) clearTimeout(timer.current);

			timer.current = setTimeout(() => {
				const url = new URL(window.location.href);
				const payload = value as Record<string, unknown>;

				url.searchParams.set("q", (payload.q as string) || "");
				url.searchParams.set(
					"date_disappeared",
					payload.date_disappeared ? stringifyDate(payload.date_disappeared) : "",
				);

				navigate(`${url.pathname}?${url.searchParams.toString()}`);
			}, 150);
		},
	});

	return (
		<form.Form form={form} className="bg-white *:m-0 p-2 rounded-lg flex gap-4 flex-col sticky top-[72px]">
			<form.AppField
				name="q"
				children={(field) => (
					<form.Fieldset label={t("search")}>
						<Input value={field.state.value} onChange={field.handleChange} />
					</form.Fieldset>
				)}
			/>

			<form.AppField
				name="date_disappeared"
				children={(field) => (
					<form.Fieldset label={t("date_disappeared")}>
						<CalendarInput mode="range" selected={field.state.value} onChange={field.handleChange} />
					</form.Fieldset>
				)}
			/>

			<div className="flex gap-2 pt-2">
				<form.Submit className="w-full" variant="dark">
					Aplicar
				</form.Submit>
				<Button
					size="icon"
					variant="destructive"
					className="px-2"
					onClick={() => {
						const url = new URL(window.location.href);

						url.searchParams.delete("q");
						url.searchParams.delete("date_disppeared");

						navigate(`${url.pathname}?${url.searchParams.toString()}`);
					}}
				>
					<Trash />
				</Button>
			</div>
		</form.Form>
	);
}

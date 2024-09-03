"use client";

import Field from "@repo/ds/form/field";
import { CalendarInput } from "@repo/ds/ui/calendar-input";
import { Input } from "@repo/ds/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ds/ui/select";
import { TabsContent } from "@repo/ds/ui/tabs";
import { Textarea } from "@repo/ds/ui/textarea";
import { useTranslations } from "next-intl";

export default function ProfileFormGeneral() {
	const t = useTranslations("profiles.new");

	return (
		<TabsContent value="general" className="grow">
			<Field
				label={t("general.name")}
				name="name"
				required
				render={({ field }) => {
					return <Input {...field} />;
				}}
			/>

			<Field
				label={t("date_disappeared")}
				name="date_disappeared"
				required
				render={({ field }) => <CalendarInput {...field} />}
			/>

			<Field
				label={t("general.age")}
				name="data.age"
				required
				render={({ field }) => {
					return <Input {...field} />;
				}}
			/>

			<Field
				label={t("general.race")}
				name="data.race"
				required
				render={({ field }) => {
					return <Input {...field} />;
				}}
			/>

			<Field
				label={t("general.gender")}
				name="data.gender"
				required
				render={({ field }) => {
					return (
						<Select {...field}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value="male">
									{t("general.gender-options.male")}
								</SelectItem>
								<SelectItem value="female">
									{t("general.gender-options.female")}
								</SelectItem>
								<SelectItem value="other">
									{t("general.gender-options.other")}
								</SelectItem>
							</SelectContent>
						</Select>
					);
				}}
			/>

			<Field
				label={t("general.description")}
				name="description"
				render={({ field }) => {
					return <Textarea {...field} />;
				}}
			/>
		</TabsContent>
	);
}

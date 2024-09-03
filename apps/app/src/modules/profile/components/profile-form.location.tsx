"use client";

import { states } from "@/modules/location/actions";
import Field from "@repo/ds/form/field";
import { AsyncSelect } from "@repo/ds/ui/async-select";
import { Input } from "@repo/ds/ui/input";
import { TabsContent } from "@repo/ds/ui/tabs";
import { useTranslations } from "next-intl";

export default function ProfileFormLocation() {
	const t = useTranslations("profiles.new");

	return (
		<TabsContent
			value="location"
			className="grow flex flex-wrap gap-4 justify-between"
		>
			<h2 className="text-2xl mb-4 w-full">{t("location.title")}</h2>

			<Field
				label={t("location.district")}
				required
				name="addresses.0.district"
				className="w-full md:w-2/5"
				render={({ field }) => {
					return <Input {...field} />;
				}}
			/>

			<Field
				label={t("location.city")}
				required
				name="addresses.0.city"
				className="w-full md:w-2/5"
				render={({ field }) => {
					return <Input {...field} />;
				}}
			/>

			<Field
				label={t("location.state")}
				required
				name="addresses.0.state"
				className="w-full md:w-2/5"
				render={({ field }) => {
					return (
						<AsyncSelect
							{...field}
							action={states}
							t={{
								empty: "Nenhum estado encontrado",
								placeholder: "Escolha um estado",
								loading: "Carregando",
							}}
						/>
					);
				}}
			/>
		</TabsContent>
	);
}

"use client";

import Field from "@repo/ds/form/field";
import FieldList from "@repo/ds/form/field-list";
import { Button } from "@repo/ds/ui/button";
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
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProfileFormContact() {
	const t = useTranslations("profiles.new");

	return (
		<TabsContent value="contact" className="grow">
			<h2 className="text-2xl mb-4 w-full">{t("contact.title")}</h2>

			<FieldList
				name="contact.options"
				startWith={1}
				render={({ name, remove }) => (
					<div className="flex gap-4 w-full" key={name}>
						<Field
							name={`${name}.type`}
							value="phone"
							className="m-0 min-w-[100px]"
							render={({ field }) => (
								<Select {...field}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="phone">
											{t("contact.type-options.phone")}
										</SelectItem>
										<SelectItem value="email">
											{t("contact.type-options.email")}
										</SelectItem>
										<SelectItem value="whatsapp">
											{t("contact.type-options.whatsapp")}
										</SelectItem>
										<SelectItem value="facebook">
											{t("contact.type-options.facebook")}
										</SelectItem>
										<SelectItem value="instagram">
											{t("contact.type-options.instagram")}
										</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						<Field
							name={`${name}.value`}
							className="m-0 w-full"
							render={({ field }) => <Input {...field} />}
						/>
						<Button onClick={remove} variant="destructive">
							<Trash />
						</Button>
					</div>
				)}
			/>

			<Field
				label={t("contact.description")}
				name="contact.description"
				className="w-full mt-4"
				render={({ field }) => {
					return <Textarea {...field} />;
				}}
			/>
		</TabsContent>
	);
}

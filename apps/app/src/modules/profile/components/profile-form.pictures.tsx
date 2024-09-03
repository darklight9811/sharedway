"use client";

import Field from "@repo/ds/form/field";
import ImageUploader from "@repo/ds/ui/image-uploader";
import { TabsContent } from "@repo/ds/ui/tabs";
import { useTranslations } from "next-intl";

export default function ProfileFormPictures() {
	const t = useTranslations("profiles.new");

	return (
		<TabsContent value="pictures" className="grow">
			<h2 className="text-2xl mb-4">{t("pictures.title")}</h2>

			<Field
				name="pictures"
				render={({ field }) => {
					return <ImageUploader max={5} {...field} />;
				}}
			/>
		</TabsContent>
	);
}

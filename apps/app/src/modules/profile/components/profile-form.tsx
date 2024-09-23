"use client";

import { Camera, MailIcon, MapIcon, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import Form from "@repo/ds/form/form";
import { Tabs, TabsList, TabsTrigger } from "@repo/ds/ui/tabs";
import { profileStoreSchema } from "@repo/schemas/profile";

import ProfileFormContact from "./profile-form.contact";
import ProfileFormGeneral from "./profile-form.general";
import ProfileFormLocation from "./profile-form.location";
import ProfileFormPictures from "./profile-form.pictures";

interface Props {
	onSubmit(data: any): Promise<Record<string, unknown>>;
	data?: Record<string, unknown>;
	children?: React.ReactNode;
}

export default function ProfileForm(props: Props) {
	const t = useTranslations("profiles.new");
	const [page, setpage] = useState("general");

	return (
		<Form
			data={
				props.data || {
					contact: { options: [{}] },
					date_disappeared: new Date(),
				}
			}
			schema={profileStoreSchema}
			onSubmit={props.onSubmit}
			className="w-full max-w-5xl flex gap-8 flex-col grow"
		>
			<Tabs
				value={page}
				onValueChange={setpage}
				className="flex flex-col grow mx-2"
			>
				<div className="w-full flex justify-center sticky top-20 mb-4">
					<TabsList className="aspect-[5/1] flex w-full">
						<TabsTrigger value="general" className="flex flex-col gap-1 w-1/4">
							<User />
							<span className="text-xs opacity-50">{t("general.title")}</span>
						</TabsTrigger>
						<TabsTrigger value="pictures" className="flex flex-col gap-1 w-1/4">
							<Camera />
							<span className="text-xs opacity-50">{t("pictures.title")}</span>
						</TabsTrigger>
						<TabsTrigger value="location" className="flex flex-col gap-1 w-1/4">
							<MapIcon />
							<span className="text-xs opacity-50">{t("location.title")}</span>
						</TabsTrigger>
						<TabsTrigger value="contact" className="flex flex-col gap-1 w-1/4">
							<MailIcon />
							<span className="text-xs opacity-50">{t("contact.title")}</span>
						</TabsTrigger>
					</TabsList>
				</div>

				<ProfileFormGeneral />
				<ProfileFormPictures />
				<ProfileFormLocation />
				<ProfileFormContact />

				<div className="w-full flex gap-2 justify-center sticky bottom-0 bg-white py-2">
					{props.children}
				</div>
			</Tabs>
		</Form>
	);
}

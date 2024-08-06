"use client";

import { states } from "@/modules/location/actions";
import Field from "@repo/ds/form/field";
import FieldList from "@repo/ds/form/field-list";
import Form from "@repo/ds/form/form";
import { AsyncSelect } from "@repo/ds/ui/async-select";
import { Button } from "@repo/ds/ui/button";
import { CalendarInput } from "@repo/ds/ui/calendar-input";
import ImageUploader from "@repo/ds/ui/image-uploader";
import { Input } from "@repo/ds/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ds/ui/select";
import { Textarea } from "@repo/ds/ui/textarea";
import { profileStoreSchema, profileUpdateSchema } from "@repo/schemas/profile";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
	onSubmit(data: any): Promise<Record<string, unknown>>;
	schema?: "store" | "update";
	data?: Record<string, unknown>;
	require?: boolean;
	children?: React.ReactNode;
}

export default function ProfileForm(props: Props) {
	const t = useTranslations("profiles.new");

	return (
		<Form
			data={props.data}
			defaultData={{ contact: { options: [{}] }, date_disappeared: new Date() }}
			schema={
				props.schema === "update" ? profileUpdateSchema : profileStoreSchema
			}
			onSubmit={props.onSubmit}
			className="w-full max-w-5xl flex gap-8 flex-col"
		>
			<div className="w-full flex flex-col md:flex-row gap-4 justify-between">
				<div className="w-full sm:max-w-sm">
					<h2 className="text-2xl mb-4">{t("general.title")}</h2>

					<Field
						label={t("general.name")}
						name="name"
						required={props.require}
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>

					<Field
						label={t("date_disappeared")}
						name="date_disappeared"
						required={props.require}
						render={({ field }) => <CalendarInput {...field} />}
					/>

					<Field
						label={t("general.age")}
						name="data.age"
						required={props.require}
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>

					<Field
						label={t("general.race")}
						name="data.race"
						required={props.require}
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>

					<Field
						label={t("general.gender")}
						name="data.gender"
						required={props.require}
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
				</div>

				<div className="w-full max-w-[512px]">
					<h2 className="text-2xl mb-4">{t("pictures.title")}</h2>

					<Field
						name="pictures"
						render={({ field }) => {
							return <ImageUploader max={5} {...field} />;
						}}
					/>
				</div>
			</div>

			<div className="w-full flex flex-wrap gap-4 justify-between">
				<h2 className="text-2xl mb-4 w-full">{t("location.title")}</h2>

				<Field
					label={t("location.district")}
					required={props.require}
					name="addresses.0.district"
					className="w-full md:w-2/5"
					render={({ field }) => {
						return <Input {...field} />;
					}}
				/>

				<Field
					label={t("location.city")}
					required={props.require}
					name="addresses.0.city"
					className="w-full md:w-2/5"
					render={({ field }) => {
						return <Input {...field} />;
					}}
				/>

				<Field
					label={t("location.state")}
					required={props.require}
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
			</div>

			<div className="w-full flex flex-wrap gap-4 justify-between">
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
							<Button type="button" onClick={remove} variant="destructive">
								<Trash />
							</Button>
						</div>
					)}
				/>

				<Field
					label={t("contact.description")}
					name="contact.description"
					className="w-full"
					render={({ field }) => {
						return <Textarea {...field} />;
					}}
				/>
			</div>

			<div className="mt-2 flex gap-2">{props.children}</div>
		</Form>
	);
}

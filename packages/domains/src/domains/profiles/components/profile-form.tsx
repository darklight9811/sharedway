import { Camera, MailIcon, MapIcon, TrashIcon, User } from "lucide-react";
import { useState } from "react";

import { Button } from "@repo/ds/button";
import { CalendarInput } from "@repo/ds/calendar-input";
import { useAppForm } from "@repo/ds/hooks/use-form";
import { Input } from "@repo/ds/input";
import { useTranslation } from "@repo/ds/lib/localization";
import { NumberInput } from "@repo/ds/number-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ds/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ds/tabs";
import { Textarea } from "@repo/ds/textarea";

import { type InsertProfileSchema, insertProfileSchema } from "../schema";

interface Props {
	onSubmit(data: InsertProfileSchema): Promise<Record<string, unknown>>;
	data?: Partial<InsertProfileSchema>;
	children?: React.ReactNode;
}

export function ProfileForm(props: Props) {
	const { t } = useTranslation("profiles.new");
	const [page, setpage] = useState("general");
	const form = useAppForm({
		defaultValues: (props.data as InsertProfileSchema) || {
			contact: { options: [{ type: "phone" }] },
			disappearedAt: new Date(),
		},
		validators: {
			onSubmit: insertProfileSchema,
		},
		onSubmit: ({ value }) => props.onSubmit(value),
	});

	return (
		<form.Form form={form} className="w-full max-w-5xl flex gap-8 flex-col grow">
			<Tabs value={page} onValueChange={setpage} className="flex flex-col grow mx-2">
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

				<TabsContent value="general" className="grow">
					<div className="flex md:flex-row flex-col w-full gap-4">
						<div className="w-full">
							<form.AppField
								name="name"
								children={(field) => (
									<form.Fieldset label={t("general.name")}>
										<Input value={field.state.value} onChange={field.handleChange} />
									</form.Fieldset>
								)}
							/>
							<form.AppField
								name="disappearedAt"
								children={(field) => (
									<form.Fieldset label={t("date_disappeared")}>
										<CalendarInput selected={field.state.value} onSelect={field.handleChange} />
									</form.Fieldset>
								)}
							/>
						</div>

						<div className="w-full">
							<form.AppField
								name="data.age"
								children={(field) => (
									<form.Fieldset label={t("general.age")}>
										<NumberInput value={field.state.value} onChange={field.handleChange} />
									</form.Fieldset>
								)}
							/>

							<form.AppField
								name="data.race"
								children={(field) => (
									<form.Fieldset label={t("general.race")}>
										<Input value={field.state.value} onChange={field.handleChange} />
									</form.Fieldset>
								)}
							/>

							<form.AppField
								name="data.gender"
								children={(field) => {
									return (
										<form.Fieldset label={t("general.gender")}>
											<Select value={field.state.value} onValueChange={field.handleChange}>
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
										</form.Fieldset>
									);
								}}
							/>
						</div>
					</div>

					<form.AppField
						name="description"
						children={(field) => (
							<form.Fieldset label={t("general.description")}>
								<Textarea value={field.state.value} onChange={field.handleChange} />
							</form.Fieldset>
						)}
					/>
				</TabsContent>

				<TabsContent value="pictures" className="grow">
					<h2 className="text-2xl mb-4">{t("pictures.title")}</h2>

					<form.AppField
						name="pictures"
						children={(field) => {
							return <ImageUploader max={5} {...field} />;
						}}
					/>
				</TabsContent>

				<TabsContent value="location" className="grow flex flex-wrap gap-4 justify-between">
					<h2 className="text-2xl mb-4 w-full">{t("location.title")}</h2>

					<form.AppField
						name="addresses[0].district"
						children={(field) => (
							<form.Fieldset label={t("location.district")}>
								<Input value={field.state.value} onChange={field.handleChange} />
							</form.Fieldset>
						)}
					/>

					<form.AppField
						name="addresses[0].city"
						children={(field) => (
							<form.Fieldset label={t("location.city")}>
								<Input value={field.state.value} onChange={field.handleChange} />
							</form.Fieldset>
						)}
					/>

					{/* <Field
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
					/> */}
				</TabsContent>

				<TabsContent value="contact" className="grow">
					<h2 className="text-2xl mb-4 w-full">{t("contact.title")}</h2>

					<form.AppField
						name="contact.options"
						mode="array"
						children={(field) => (
							<>
								{field.state.value?.map((_, i) => (
									<div className="flex gap-4 w-full mb-4" key={`contact.options[${i}]`}>
										<form.AppField
											name={`contact.options[${i}].type`}
											children={(field) => (
												<Select value={field.state.value} onValueChange={field.handleChange}>
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
										<form.AppField
											name={`contact.options[${i}].value`}
											children={(field) => (
												<Input value={field.state.value} onChange={field.handleChange} />
											)}
										/>
										<Button onClick={() => field.removeValue(i)} variant="destructive" size="icon">
											<TrashIcon />
										</Button>
									</div>
								))}
								<Button
									className="w-full my-4"
									onClick={() => field.pushValue({ type: "phone", value: "" })}
								>
									Add
								</Button>
							</>
						)}
					/>

					<form.AppField
						name="contact.description"
						children={(field) => (
							<form.Fieldset label={t("contact.description")}>
								<Textarea value={field.state.value} onChange={field.handleChange} />
							</form.Fieldset>
						)}
					/>
				</TabsContent>

				<div className="w-full flex gap-2 justify-center sticky bottom-0 bg-white py-2">{props.children}</div>
			</Tabs>
		</form.Form>
	);
}

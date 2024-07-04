"use client";

import states from "@/constants/state";
import Field from "@repo/ds/form/field";
import FieldList from "@repo/ds/form/field-list";
import Form from "@repo/ds/form/form";
import { Button } from "@repo/ds/ui/button";
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
import { entityStoreSchema, entityUpdateSchema } from "@repo/schemas/entity";
import { Trash } from "lucide-react";

interface Props {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onSubmit(data: any): Promise<Record<string, unknown>>;
	schema?: "store" | "update";
	data?: Record<string, unknown>;
	require?: boolean;
	children?: React.ReactNode;
}

export default function EntityForm(props: Props) {
	return (
		<Form
			data={props.data}
			defaultData={{ contact: { options: [{}] } }}
			schema={
				props.schema === "update" ? entityUpdateSchema : entityStoreSchema
			}
			onSubmit={props.onSubmit}
			className="w-full max-w-5xl flex gap-8 flex-col"
		>
			<div className="w-full flex flex-col md:flex-row gap-4 justify-between">
				<div className="w-full sm:max-w-sm">
					<h2 className="text-2xl mb-4">Informações gerais</h2>

					<Field
						label="Nome"
						name="name"
						required={props.require}
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>

					<Field
						label="Idade"
						name="data.age"
						required={props.require}
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>

					<Field
						label="Raça"
						name="data.race"
						required={props.require}
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>

					<Field
						label="Gênero"
						name="data.gender"
						required={props.require}
						render={({ field }) => {
							return (
								<Select {...field}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="male">Masculino</SelectItem>
										<SelectItem value="female">Feminino</SelectItem>
										<SelectItem value="other">Outros</SelectItem>
									</SelectContent>
								</Select>
							);
						}}
					/>

					<Field
						label="Descrição geral"
						name="description"
						render={({ field }) => {
							return <Textarea {...field} />;
						}}
					/>
				</div>

				<div className="w-full max-w-[512px]">
					<h2 className="text-2xl mb-4">Fotos</h2>

					<Field
						name="pictures"
						render={({ field }) => {
							return <ImageUploader max={5} {...field} />;
						}}
					/>
				</div>
			</div>

			<div className="w-full flex flex-wrap gap-4 justify-between">
				<h2 className="text-2xl mb-4 w-full">Localização</h2>

				<Field
					label="Bairro"
					required={props.require}
					name="addresses.0.district"
					className="w-full md:w-2/5"
					render={({ field }) => {
						return <Input {...field} />;
					}}
				/>

				<Field
					label="Cidade"
					required={props.require}
					name="addresses.0.city"
					className="w-full md:w-2/5"
					render={({ field }) => {
						return <Input {...field} />;
					}}
				/>

				<Field
					label="Estado"
					required={props.require}
					name="addresses.0.state"
					className="w-full md:w-2/5"
					render={({ field }) => {
						return (
							<Select {...field}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>

								<SelectContent>
									{states.map((state) => (
										<SelectItem value={state.sigla} key={state.id}>
											{state.nome}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						);
					}}
				/>
			</div>

			<div className="w-full flex flex-wrap gap-4 justify-between">
				<h2 className="text-2xl mb-4 w-full">Contato</h2>

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
											<SelectItem value="phone">Telefone</SelectItem>
											<SelectItem value="email">E-mail</SelectItem>
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
					label="Outras formas de entrar em contato"
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

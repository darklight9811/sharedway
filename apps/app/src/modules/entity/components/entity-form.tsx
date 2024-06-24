"use client";

import states from "@/constants/state";
import { Link } from "@/lib/navigation";
import Field from "@repo/ds/form/field";
import Form from "@repo/ds/form/form";
import { Button, buttonVariants } from "@repo/ds/ui/button";
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

interface Props {
	onSubmit(data: FormData): Promise<Record<string, unknown>>;
	schema?: "store" | "update";
	data?: Record<string, unknown>;
}

export default function EntityForm(props: Props) {
	return (
		<Form
			data={props.data}
			schema={
				props.schema === "update" ? entityUpdateSchema : entityStoreSchema
			}
			onSubmit={props.onSubmit}
			className="w-full max-w-5xl flex gap-8 flex-col"
		>
			<div className="w-full flex flex-col md:flex-row gap-4 justify-between">
				<div className="w-full max-w-sm">
					<h2 className="text-2xl mb-4">Informações gerais</h2>

					<Field
						label="Nome"
						name="name"
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>

					<Field
						label="Idade"
						name="data.age"
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>

					<Field
						label="Raça"
						name="data.race"
						render={({ field }) => {
							return <Input {...field} />;
						}}
					/>

					<Field
						label="Gênero"
						name="data.gender"
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
					name="addresses.0.district"
					className="w-full md:w-2/5"
					render={({ field }) => {
						return <Input {...field} />;
					}}
				/>

				<Field
					label="Cidade"
					name="addresses.0.city"
					className="w-full md:w-2/5"
					render={({ field }) => {
						return <Input {...field} />;
					}}
				/>

				<Field
					label="Estado"
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

			<div className="mt-2 flex gap-2">
				<Link href="/" className={buttonVariants({ variant: "outline" })}>
					Voltar
				</Link>
				<Button type="submit" className="w-full max-w-[180px]">
					Criar
				</Button>
			</div>
		</Form>
	);
}

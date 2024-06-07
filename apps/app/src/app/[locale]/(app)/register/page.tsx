"use client"

import { Input } from "@repo/ds/ui/input"
import Field from "@repo/ds/form/field"
import { Button, buttonVariants } from "@repo/ds/ui/button"
import Form from "@repo/ds/form/form"
import { register } from "./actions"
import ImageUploader from "@repo/ds/ui/image-uploader"
import { Link } from "@/lib/navigation"

export default function Page () {
	return (
		<main className="grow flex flex-col justify-center items-center my-8">
			<h1 className="w-full max-w-5xl text-3xl font-bold mb-4">Registrar novo desaparecido</h1>

			<Form onSubmit={register} className="w-full max-w-5xl flex gap-8 flex-col">
				<div className="w-full flex gap-4 justify-between">
					<div className="w-full max-w-sm">
						<h2 className="text-2xl mb-4">Informações gerais</h2>

						<Field
							label="Nome"
							name="name"
							render={({ field }) => {
								return <Input {...field} />
							}}
						/>

						<Field
							label="Idade"
							name="age"
							render={({ field }) => {
								return <Input {...field} />
							}}
						/>

						<Field
							label="Raça"
							name="race"
							render={({ field }) => {
								return <Input {...field} />
							}}
						/>

						<Field
							label="Gênero"
							name="gender"
							render={({ field }) => {
								return <Input {...field} />
							}}
						/>

						<Field
							label="Descrição geral"
							name="description"
							render={({ field }) => {
								return <Input {...field} />
							}}
						/>
					</div>

					<div className="w-full max-w-[512px]">
						<h2 className="text-2xl mb-4">Fotos</h2>

						<Field
							name="images"
							render={() => {
								return (
									<ImageUploader
										max={5}
										maxQuantityError="Por enquanto só aceitamos até 5 imagens por desaparecido"
									/>
								)
							}}
						/>
					</div>
				</div>

				<div className="w-full max-w-sm">
					<h2 className="text-2xl mb-4">Localização</h2>

					<Field
						label="Bairro"
						name="district"
						render={({ field }) => {
							return <Input {...field} />
						}}
					/>

					<Field
						label="Cidade"
						name="city"
						render={({ field }) => {
							return <Input {...field} />
						}}
					/>

					<Field
						label="Estado"
						name="states"
						render={({ field }) => {
							return <Input {...field} />
						}}
					/>
				</div>

				<div className="mt-2 flex gap-2">
					<Link href="/" className={buttonVariants({ variant: "outline" })}>Voltar</Link>
					<Button type="submit" className="w-full max-w-[180px]">Criar</Button>
				</div>
			</Form>
		</main>
	)
}
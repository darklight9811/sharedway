"use client"

import { Input } from "@repo/ds/ui/input"
import Field from "@repo/ds/form/field"
import { Button } from "@repo/ds/ui/button"
import Form from "@repo/ds/form/form"
import { register } from "./actions"

export default function Page () {
	return (
		<main className="grow flex justify-center items-center">
			<Form onSubmit={register}>
				<Field
					label="Nome"
					name="name"
					render={({ field }) => {
						return <Input {...field} />
					}}
				/>

				<Button type="submit">Criar</Button>
			</Form>
		</main>
	)
}
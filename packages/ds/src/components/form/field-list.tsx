import { Plus } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../ui/button";

interface Props {
	name: string;
	render(data: { name: string; remove(): void }): React.ReactNode;
	startWith?: number;
}

export default function FieldList(props: Props) {
	const { fields, append, remove } = useFieldArray({
		name: props.name,
	});

	return (
		<>
			{fields.map((_, index) =>
				props.render({
					name: `${props.name}.${index}`,
					remove() {
						remove(index);
					},
				}),
			)}

			<Button className="w-full max-w-xs mx-auto" onClick={() => append({})}>
				<Plus /> Adicionar
			</Button>
		</>
	);
}

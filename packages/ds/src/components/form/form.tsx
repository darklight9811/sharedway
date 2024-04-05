"use client"

import { useForm, FormProvider } from "react-hook-form"

interface FormProps {
	onSubmit: (data: any) => void | Promise<void>;
	children?: React.ReactNode;
}

export default function Form (props: FormProps) {
	const form = useForm({

	})

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(data => props.onSubmit(data))}>
				{props.children}
			</form>
		</FormProvider>
	)
}
"use client"

import { useForm, FormProvider } from "react-hook-form"

interface FormProps {
	onSubmit: (data: any) => any | Promise<any>;
	children?: React.ReactNode;
	className?: string;
}

export default function Form (props: FormProps) {
	const form = useForm({

	})

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(data => props.onSubmit(data))} className={props.className}>
				{props.children}
			</form>
		</FormProvider>
	)
}
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { objectToFormData } from "../../lib/form";

import type { ZodSchema } from "zod";

interface FormProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onSubmit: (data: FormData) => any | Promise<any>;
	onSuccess?: (data: unknown) => unknown | Promise<unknown>;
	children?: React.ReactNode;
	className?: string;
	schema?: ZodSchema;
	data?: Record<string, unknown>;
}

export default function Form(props: FormProps) {
	const router = useRouter();
	const pathname = usePathname();
	const form = useForm({
		defaultValues: props.data,
		resolver: props.schema && zodResolver(props.schema),
	});

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(async (payload) => {
					form.clearErrors();

					const response = await props
						.onSubmit(objectToFormData(payload))
						.catch((e: unknown) => e);
					const errors = response?.errors || response?.data?.errors;

					if (errors) {
						return;
					}

					const data = response?.data || response;

					if (data.redirect) return router.push(data.redirect);
					if (data.reload) return router.push(pathname);

					return props?.onSuccess?.(data);
				})}
				className={props.className}
			>
				{props.children}
			</form>
		</FormProvider>
	);
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { objectToFormData } from "../../lib/form";

import type React from "react";
import { createElement, useState } from "react";
import type { ZodSchema } from "zod";

interface FormProps {
	onSubmit?: (data: any, raw: Record<string, unknown>) => any | Promise<any>;
	onChange?: (
		data: FormData,
		raw: Record<string, unknown>,
	) => void | Promise<void>;
	onSuccess?: (data: unknown) => unknown | Promise<unknown>;
	children?: React.ReactNode;
	className?: string;
	schema?: ZodSchema;
	data?: Record<string, unknown>;
	defaultData?: Record<string, unknown>;
	replace?: (data: any) => React.ReactNode;
}

export default function Form(props: FormProps) {
	const router = useRouter();
	const pathname = usePathname();
	const [replace, setreplace] = useState<any | undefined>(undefined);
	const form = useForm({
		defaultValues: props.data || props.defaultData,
		resolver: props.schema && zodResolver(props.schema),
	});

	return (
		<FormProvider {...form}>
			<form
				onChange={
					props.onChange &&
					(() =>
						props.onChange?.(
							objectToFormData(form.getValues()),
							form.getValues(),
						))
				}
				onSubmit={form.handleSubmit(async (payload) => {
					if (!props.onSubmit) return;

					form.clearErrors();

					const response = await props
						.onSubmit(objectToFormData(payload), payload)
						.catch((e: unknown) => e);
					const errors = response?.errors || response?.data?.errors;

					if (!response) return;

					if (errors) {
						return;
					}

					const data = response?.data || response;

					if (data.redirect) return router.push(data.redirect);
					if (data.reload) return router.push(pathname);
					if (data.replace && props.replace) return setreplace(data);

					return props?.onSuccess?.(data);
				})}
				className={props.className}
			>
				{replace
					? createElement(props.replace as () => React.ReactNode, replace)
					: props.children}
			</form>
		</FormProvider>
	);
}

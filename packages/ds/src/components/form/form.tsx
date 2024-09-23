"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { objectToFormData } from "../../lib/form";

import type React from "react";
import { createElement, useEffect, useState } from "react";
import type { ZodSchema } from "zod";
import { useModal } from "../ui/dialog";

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
	const [replace, setreplace] = useState<any | undefined>(undefined);
	const [, setModal] = useModal();
	const form = useForm({
		defaultValues: props.data || props.defaultData,
		resolver: props.schema && zodResolver(props.schema),
	});

	useEffect(() => {
		form.reset(props.data);
	}, [props.data, form.reset]);

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
				onSubmit={async (event) => {
					const payload = form.getValues();
					if (!props.onSubmit) return;
					event?.stopPropagation();
					event?.preventDefault();

					form.clearErrors();

					const response = await props
						.onSubmit(objectToFormData(payload), payload)
						.catch((e: unknown) => e);
					const errors =
						response?.[0] || response?.errors || response?.data?.errors;

					if (!response) return;

					if (errors) {
						return;
					}

					const data = response?.[1] || response?.data || response;

					setModal(false);
					if (data.redirect) return router.push(data.redirect);
					if (data.reload) return router.push(document.location.pathname);
					if (data.replace && props.replace) return setreplace(data);

					return props?.onSuccess?.(data);
				}}
				className={props.className}
			>
				{replace
					? createElement(props.replace as () => React.ReactNode, replace)
					: props.children}
			</form>
		</FormProvider>
	);
}

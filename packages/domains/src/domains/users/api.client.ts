import { type UseMutationOptions, type UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

import request from "../../utils/request";
import { queryClient } from "../app/query";
import { dataSchema, type PaginationSchema, paginatedSchema } from "../app/schema";
import { type UserFormSchema, userSchema } from "./schema";

export const userApi = {
	useIndex<Opts extends UseQueryOptions>(
		pagination: Partial<PaginationSchema> = {},
		opts?: Omit<Opts, "queryFn" | "queryKey">,
	) {
		return useQuery({
			...(opts as {}),
			queryKey: ["users", "index", pagination],
			queryFn({ signal }) {
				return request("/users", {
					signal,
					output: paginatedSchema(userSchema),
				});
			},
		});
	},

	useShow(id: string, opts?: UseQueryOptions) {
		return useQuery({
			...(opts as {}),
			queryKey: ["users", "show", id],
			queryFn({ signal, queryKey: [, , id] }) {
				return request(`/users/${id}`, {
					signal,
					output: dataSchema(userSchema),
				});
			},
		});
	},

	useUpdate(id?: string, opts?: UseMutationOptions) {
		return useMutation({
			...(opts as {}),
			mutationFn(input: UserFormSchema) {
				return request(`/users/${id}`, {
					method: "PATCH",
					input,
					output: userSchema,
				});
			},
			onSuccess(a, _, c) {
				queryClient.invalidateQueries({ queryKey: ["users"] });
				opts?.onSuccess?.(a, void {}, c);
			},
		});
	},

	useSelf(opts?: UseMutationOptions) {
		return useMutation({
			...(opts as {}),
			mutationFn(input: UserFormSchema) {
				return request("/users/self", {
					method: "PATCH",
					input,
					output: userSchema,
				});
			},
			onSuccess(a, _, c) {
				queryClient.invalidateQueries({ queryKey: ["users"] });
				opts?.onSuccess?.(a, void {}, c);
			},
		});
	},

	useDelete(opts?: UseMutationOptions) {
		return useMutation({
			...(opts as {}),
			mutationFn(id: string) {
				return request(`/users/${id}`, {
					method: "DELETE",
				});
			},
			onSuccess(a, _, c) {
				queryClient.invalidateQueries({ queryKey: ["users"] });
				opts?.onSuccess?.(a, void {}, c);
			},
		});
	},
};

"use server"

import entityService from "@repo/services/entity"

export async function register (payload: any) {
	const response = await entityService.store(payload)({ user: "" })
}
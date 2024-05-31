"use server"

import { currentUser } from "@clerk/nextjs"
import entityService from "@repo/services/entity"

export async function register (payload: any) {
	const user = await currentUser()
	const response = await entityService.store(payload)({ user: user!.id })

	return response
}
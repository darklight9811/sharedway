import { auth } from "@clerk/nextjs/server";
import userService from "@repo/services/user";
import { cache } from "react";

export const currentUser = cache(() => {
	const clerkUser = auth().userId;

	return clerkUser
		? userService.byProvider({ provider: "clerk", value: clerkUser })({})
		: undefined;
});

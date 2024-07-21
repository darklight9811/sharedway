import { auth } from "@clerk/nextjs/server";
import userService from "@repo/services/user";
import { headers } from "next/headers";
import { cache } from "react";

export const currentUser = cache(() => {
	const clerkUser = auth().userId;

	return clerkUser
		? userService.byProvider({ provider: "clerk", value: clerkUser })({
				ip: headers().get("x-ip") as string,
			})
		: undefined;
});

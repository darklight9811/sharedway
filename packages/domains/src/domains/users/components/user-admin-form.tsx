import { Field } from "@repo/ds/form/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ds/ui/select";
import type { ComponentProps } from "react";

import { UserForm } from "./user-form";

export function UserAdminForm({ children, ...props }: ComponentProps<typeof UserForm>) {
	return (
		<UserForm {...props}>
			<Field
				name="type"
				label="Name"
				render={({ field }) => (
					<Select {...field}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="user">User</SelectItem>
							<SelectItem value="admin">Administrator</SelectItem>
							<SelectItem value="dev">Developer</SelectItem>
						</SelectContent>
					</Select>
				)}
			/>
			{children}
		</UserForm>
	);
}

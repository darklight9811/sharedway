import { faker } from "@faker-js/faker";

import { randomCuid2 } from "../../utils/random";
import type { UserSchema } from "../users/schema";

export function mockUser(overrides: Partial<UserSchema> = {}) {
	return {
		id: randomCuid2(),
		name: faker.person.fullName(),
		email: faker.internet.email(),
		email_verified: faker.datatype.boolean(),
		type: "user" as "user" | "admin",
		date_created: faker.date.recent(),
		...(overrides as {}),
	};
}

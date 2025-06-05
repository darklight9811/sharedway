import { resolve } from "node:path";

import { createCookie } from "react-router";
import { RemixI18Next } from "remix-i18next/server";

import i18n from "@repo/ds/lib/i18n";

export const localeCookie = createCookie("lng", {
	path: "/",
	sameSite: "lax",
	secure: process.env.NODE_ENV === "production",
	httpOnly: true,
});

const i18next = new RemixI18Next({
	detection: {
		supportedLanguages: i18n.supportedLngs,
		fallbackLanguage: i18n.fallbackLng,
		cookie: localeCookie,
	},
	i18next: {
		...i18n,
		backend: {
			loadPath: resolve("../../../../public/locales/{{lng}}/{{ns}}.json"),
		},
	},
});

export default i18next;

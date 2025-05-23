import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Fetch from "i18next-fetch-backend";
import { initReactI18next } from "react-i18next";

export { Trans, useTranslation } from "react-i18next";

import i18nConfig from "./i18n";

export default function starti18n() {
	return i18n
		.use(initReactI18next)
		.use(Fetch)
		.use(LanguageDetector)
		.init({
			...i18nConfig,
			backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
			lowerCaseLng: true,
			interpolation: {
				escapeValue: false,
			},
			detection: {
				order: ["htmlTag"],
				caches: [],
			},
		});
}

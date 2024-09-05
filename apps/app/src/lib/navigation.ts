import { createSharedPathnamesNavigation } from "next-intl/navigation";
export { default as Link } from "next/link"

export const locales = ["en-US", "pt-BR"] as const;
export const localePrefix = "never";

export const { redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({ locales });

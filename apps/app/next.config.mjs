import createNextIntlPlugin from "next-intl/plugin";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("@repo/env"));

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	transpilePackages: ["@repo/ds"],
	productionBrowserSourceMaps: true,
	async headers() {
		return [];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.clerk.com",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
			},
		],
	},
};

const withNextIntl = createNextIntlPlugin();

export default [withNextIntl].reduce((prev, curr) => curr(prev), config);

import createNextIntlPlugin  from "next-intl/plugin"

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("@repo/env"))

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	transpilePackages: ["@repo/ds"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.clerk.com",
			},
		],
	},
}

const withNextIntl = createNextIntlPlugin()

export default [withNextIntl].reduce((prev, curr) => curr(prev), config)
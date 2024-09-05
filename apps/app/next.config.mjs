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
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "Permissions-Policy",
						value: "payment=()",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "origin-when-cross-origin",
					},
					{
						key: "Content-Security-Policy",
						value: "default-src 'self' *.clerk.com *.utfs.io",
					},
				],
			},
		];
	},
	/**
	 * Typescript and eslint validation are being done in CICD through biomejs
	 */
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
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

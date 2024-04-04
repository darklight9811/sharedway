const createNextIntlPlugin = require("next-intl/plugin")

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

module.exports = [withNextIntl].reduce((prev, curr) => curr(prev), config)
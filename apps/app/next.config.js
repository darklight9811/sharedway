
console.log(process.env.DATABASE_URL)

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ds"],
};

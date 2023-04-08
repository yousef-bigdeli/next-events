/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_URL: process.env.DB_URL,
    DB_API_KEY: process.env.DB_API_KEY,
  }
}

module.exports = nextConfig

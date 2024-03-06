/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_ENDPONT: process.env.APP_ENDPONT
  }
};

export default nextConfig;

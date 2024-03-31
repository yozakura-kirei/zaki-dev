/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_ENDPONT: process.env.APP_ENDPONT,
    PG_USER: process.env.PG_USER,
    PG_PASSWORD: process.env.PG_PASSWORD,
    PG_HOST: process.env.PG_HOST,
    PG_DATABASE: process.env.PG_DATABASE,
    PG_PORT: process.env.PG_PORT,
    BASIC_USER: process.env.BASIC_USER,
    BASIC_PASSWORD: process.env.BASIC_PASSWORD,
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

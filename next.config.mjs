/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'sudhaeyehospital.in' }],
        destination: 'https://www.sudhaeyehospital.in',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

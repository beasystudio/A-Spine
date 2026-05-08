/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://a-spine.framer.website/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

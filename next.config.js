/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://078523.framer.website/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

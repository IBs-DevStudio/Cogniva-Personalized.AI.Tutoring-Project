/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin requests in development mode
  allowedDevOrigins: [
    '192.168.193.98',
    'localhost',
    '127.0.0.1'
  ],
  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

module.exports = nextConfig;

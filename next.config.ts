/** @type {import('next').NextConfig} */
const nextConfig = {
  // ข้ามการตรวจ Type Check ขณะ build บน Netlify
  typescript: {
    ignoreBuildErrors: true,
  },
  // ข้ามการตรวจ ESLint ขณะ build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

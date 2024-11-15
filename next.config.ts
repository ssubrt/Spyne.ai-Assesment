/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Disables type checking during build
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
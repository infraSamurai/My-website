/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Only apply rewrites in development (Docker Compose)
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://backend:5000/api/:path*',
        },
      ];
    }
    // In production, let the environment variable handle API routing
    return [];
  },
};

export default nextConfig;
 
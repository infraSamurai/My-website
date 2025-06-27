/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
    console.log('🔧 Next.js Config - BACKEND_URL:', process.env.BACKEND_URL);
    console.log('🔧 Next.js Config - Using backendUrl:', backendUrl);
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Temporary hardcode for testing - remove this after fixing env var
    const backendUrl = process.env.BACKEND_URL || 'https://my-website-9h1q.onrender.com';
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
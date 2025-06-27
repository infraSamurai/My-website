/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Hardcoded for production deployment
    const backendUrl = process.env.NODE_ENV === 'production'
      ? 'https://my-website-9h1q.onrender.com'
      : 'http://localhost:5001';
    console.log('🔵 Using backendUrl:', backendUrl);
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    let backendUrl;
    if (process.env.BACKEND_URL) {
      backendUrl = process.env.BACKEND_URL;
      console.log('✅ BACKEND_URL env var found:', backendUrl);
    } else {
      backendUrl = 'http://localhost:5001';
      console.log('⚠️  BACKEND_URL env var not found, using localhost development env:', backendUrl);
    }
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
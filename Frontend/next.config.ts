import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    // When deploying, set BACKEND_URL to your Render backend URL (e.g. https://my-app.onrender.com)
    // Make sure to remove the trailing slash if present, or handle it carefully.
    // Hardcoded for stability on Vercel
    const backendUrl = 'https://radio-base.onrender.com';
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

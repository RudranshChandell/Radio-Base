import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    // When deploying, set BACKEND_URL to your Render backend URL (e.g. https://my-app.onrender.com)
    // Make sure to remove the trailing slash if present, or handle it carefully.
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

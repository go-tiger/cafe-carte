import type { NextConfig } from 'next';

const basePath = process.env.PAGES_BASE_PATH ?? '';
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8030';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_API_URL: apiUrl },
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'avatars.githubusercontent.com' }],
  },
};

export default nextConfig;

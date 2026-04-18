import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  outputFileTracingIncludes: {
    '/*': ['content/relocation-guide.pdf'],
  },
};

export default nextConfig;

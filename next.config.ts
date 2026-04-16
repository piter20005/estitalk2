import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'd3t3ozftmdmh3i.cloudfront.net' },
      { protocol: 'https', hostname: '*.acast.com' },
      { protocol: 'https', hostname: 'i1.sndcdn.com' },
      { protocol: 'https', hostname: 'storage.buzzsprout.com' },
      { protocol: 'https', hostname: '*.libsyn.com' },
      { protocol: 'https', hostname: 'megaphone.imgix.net' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  experimental: {
    taint: true,
  },
};

export default nextConfig;

import type {NextConfig} from 'next';
import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
  dest: 'public',
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
 {
 protocol: 'https',
 hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
};

export default withPWAConfig(nextConfig);

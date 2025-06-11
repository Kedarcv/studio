import type {NextConfig} from 'next';
import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
  dest: 'public',
});

const nextConfig: NextConfig = {
  output: 'export',
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

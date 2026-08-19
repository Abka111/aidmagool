/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Uploaded media is served by the Go API on another host.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'backend.aiddev.net', pathname: '/uploads/**' },
      { protocol: 'http', hostname: 'localhost', pathname: '/uploads/**' },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/air', // 👈 Replace with your GitHub repo name
  trailingSlash: true,
};

export default nextConfig;

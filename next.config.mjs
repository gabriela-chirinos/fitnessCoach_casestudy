/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/fitnessCoach_casestudy',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.mp4$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    })
    return config
  },
}

export default nextConfig

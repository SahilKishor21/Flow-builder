/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the deprecated appDir option as it's default in Next.js 14
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: 'raw-loader',
    })
    return config
  },
}

module.exports = nextConfig
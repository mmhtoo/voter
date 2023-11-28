/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cuyhf47shu1kwgis.public.blob.vercel-storage.com',
        protocol: 'https',
        pathname: '/**',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig

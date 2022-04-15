/** @type {import('next').NextConfig} */

const withImages = require('next-images')
const nextConfig = withImages({
  images: {
    disableStaticImages: true
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://gour-store.devshift.ru/api/:path*' // Proxy to Backend
      }
    ]
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
    localeDetection: false,
  },
})

module.exports = nextConfig

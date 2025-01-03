// next.config.js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['rmc.mrjtrade.uz', 'cdn.sanity.io'], // Добавьте домен, откуда будут загружаться изображения
  },
  async headers() {
    return [
      {
        // Применять к API маршрутам
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      // Другие правила заголовков при необходимости
    ];
  },
};

export default withNextIntl(nextConfig);

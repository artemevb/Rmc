import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['rmc.mrjtrade.uz', 'cdn.sanity.io'], // Добавьте домен, откуда будут загружаться изображения
  },
};

export default withNextIntl(nextConfig);
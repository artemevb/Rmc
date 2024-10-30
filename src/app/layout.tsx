// src/app/[locale]/_layout.tsx
// import type { Metadata } from 'next';
import '@/src/app/[locale]/_styles/globals.css';
import Head from 'next/head';
import { ReactNode } from 'react';

// Определение интерфейса для параметров маршрута
interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

// Определение доступных локалей
const supportedLocales = ['ru', 'uz', 'en'] as const;
type SupportedLocale = typeof supportedLocales[number];

// Переводы для метаданных
const translations: Record<SupportedLocale, {
  title: string;
  description: string;
  keywords: string;
  openGraph: {
    locale: string;
    title: string;
    description: string;
  };
  twitter: {
    title: string;
    description: string;
  };
  structuredDataDescription: string;
}> = {
  ru: {
    title: 'RMC De Luxe – Оценка, аренда и продажа недвижимости в ОАЭ',
    description: 'Профессиональные услуги по оценке, аренде и продаже недвижимости в ОАЭ от RMC De Luxe. Надежный партнер для физических и корпоративных клиентов.',
    keywords: 'риэлторское агентство, недвижимость Ташкент, аренда недвижимости, продажа недвижимости, оценка недвижимости, RMC De Luxe, ОАЭ, недвижимость ОАЭ, элитная недвижимость',
    openGraph: {
      locale: 'ru_RU',
      title: 'RMC De Luxe – Оценка, аренда и продажа недвижимости в ОАЭ',
      description: 'Профессиональные услуги по оценке, аренде и продаже недвижимости в ОАЭ от RMC De Luxe. Надежный партнер для физических и корпоративных клиентов.',
    },
    twitter: {
      title: 'RMC De Luxe - Риэлторское Агентство в ОАЭ',
      description: 'Профессиональные услуги по оценке, аренде и продаже недвижимости в ОАЭ.',
    },
    structuredDataDescription: 'RMC De Luxe предоставляет услуги по оценке, аренде и продаже недвижимости в ОАЭ. Профессиональный подход для физических и корпоративных клиентов.',
  },
  uz: {
    title: 'RMC De Luxe – BAA-da mulkni baholash, ijaraga berish va sotish',
    description: 'RMC De Luxe tomonidan BAA-da mulkni baholash, ijaraga berish va sotish bo\'yicha professional xizmatlar. Jismoniy va korporativ mijozlar uchun ishonchli hamkor.',
    keywords: 'rieltorlik agentligi, Toshkent ko\'chmas mulk, ko\'chmas mulkni ijaraga berish, sotish, baholash, RMC De Luxe, BAA, BAA ko\'chmas mulk, elit ko\'chmas mulk',
    openGraph: {
      locale: 'uz_UZ',
      title: 'RMC De Luxe – BAA-da mulkni baholash, ijaraga berish va sotish',
      description: 'RMC De Luxe tomonidan BAA-da mulkni baholash, ijaraga berish va sotish bo\'yicha professional xizmatlar. Jismoniy va korporativ mijozlar uchun ishonchli hamkor.',
    },
    twitter: {
      title: 'RMC De Luxe - BAAdagi Rieltorlik Agentligi',
      description: 'BAA-da mulkni baholash, ijaraga berish va sotish bo\'yicha professional xizmatlar.',
    },
    structuredDataDescription: 'RMC De Luxe BAA-da mulkni baholash, ijaraga berish va sotish bo\'yicha xizmatlar ko\'rsatadi. Jismoniy va korporativ mijozlar uchun professional yondashuv.',
  },
  en: {
    title: 'RMC De Luxe – Valuation, Rental, and Sale of Real Estate in UAE',
    description: 'Professional real estate valuation, rental, and sales services in UAE by RMC De Luxe. A reliable partner for individual and corporate clients.',
    keywords: 'real estate agency, Tashkent real estate, rental properties, property sales, property valuation, RMC De Luxe, UAE real estate, luxury real estate',
    openGraph: {
      locale: 'en_US',
      title: 'RMC De Luxe – Valuation, Rental, and Sale of Real Estate in UAE',
      description: 'Professional real estate valuation, rental, and sales services in UAE by RMC De Luxe. A reliable partner for individual and corporate clients.',
    },
    twitter: {
      title: 'RMC De Luxe - Real Estate Agency in UAE',
      description: 'Professional real estate valuation, rental, and sales services in UAE.',
    },
    structuredDataDescription: 'RMC De Luxe provides real estate valuation, rental, and sales services in UAE. Professional approach for individual and corporate clients.',
  },
};

// Функция для получения переводов по локали
const getTranslation = (locale: string): typeof translations['ru'] => {
  if (supportedLocales.includes(locale as SupportedLocale)) {
    return translations[locale as SupportedLocale];
  }
  // По умолчанию английская локаль
  return translations.en;
};

export const dynamic = 'force-dynamic';

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  const t = getTranslation(locale);

  // Проверка корректности локали
  const currentLocale = supportedLocales.includes(locale as SupportedLocale) ? locale : 'en';

  // Каноническая ссылка
  const canonicalUrl = currentLocale === 'en' ? 'https://rmcestate.uz/en' : `https://rmcestate.uz/${currentLocale}`;

  // Структурированные данные
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "RMC De Luxe",
    "url": canonicalUrl,
    "description": t.structuredDataDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Узбекистан, г. Ташкент, ул.Чинабад 2",
      "addressLocality": "Ташкент",
      "postalCode": "100000",
      "addressCountry": "UZ"
    },
    "telephone": "+9989785558787",
    "openingHours": "Mo-Fr 09:00-18:00",
    "image": "https://rmcestate.uz/og-image.jpg",
    "priceRange": "$$$"
  };

  return (
    <html lang={currentLocale} className='p-0 m-0 h-full w-full'>
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Hreflang ссылки */}
        <link rel="alternate" hrefLang="ru" href="https://rmcestate.uz/ru" />
        <link rel="alternate" hrefLang="uz" href="https://rmcestate.uz/uz" />
        <link rel="alternate" hrefLang="en" href="https://rmcestate.uz/en" />
        <link rel="alternate" hrefLang="x-default" href="https://rmcestate.uz" />

        {/* Каноническая ссылка */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph изображения */}
        <meta property="og:image" content="https://rmcestate.uz/og-image.jpg" />
        <meta name="twitter:image" content="https://rmcestate.uz/og-image.jpg" />

        {/* Другие метатеги можно добавить здесь при необходимости */}
      </Head>
      <body className='h-full w-full p-0 m-0'>
        {children}
      </body>
      <Head>
        {/* Структурированные данные (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
    </html>
  );
}

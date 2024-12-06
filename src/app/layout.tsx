// src/app//_layout.tsx
// import type { Metadata } from 'next';
import '@/src/app/[locale]/_styles/globals.css';
import Head from 'next/head';
import { ReactNode } from 'react';

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

// const supportedLocales = ['ru', 'uz', 'en'] as const;
const supportedLocales = ['ru', 'en'] as const;
type SupportedLocale = typeof supportedLocales[number];

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
    title: 'RMC De Luxe – Аренда и продажа недвижимости в ОАЭ',
    description: 'Профессиональные услуги по аренде и продаже недвижимости в ОАЭ от RMC De Luxe. Надежный партнер для физических и корпоративных клиентов.',
    keywords: 'риэлторское агентство, недвижимость Ташкент, аренда недвижимости, продажа недвижимости, оценка недвижимости, RMC De Luxe, ОАЭ, недвижимость ОАЭ, элитная недвижимость',
    openGraph: {
      locale: 'ru_RU',
      title: 'RMC De Luxe – Аренда и продажа недвижимости в ОАЭ',
      description: 'Профессиональные услуги по аренде и продаже недвижимости в ОАЭ от RMC De Luxe. Надежный партнер для физических и корпоративных клиентов.',
    },
    twitter: {
      title: 'RMC De Luxe - Риэлторское Агентство в ОАЭ',
      description: 'Профессиональные услуги по аренде и продаже недвижимости в ОАЭ.',
    },
    structuredDataDescription: 'RMC De Luxe предоставляет услуги по аренде и продаже недвижимости в ОАЭ. Профессиональный подход для физических и корпоративных клиентов.',
  },
  en: {
    title: 'RMC De Luxe – Rental and Sale of Real Estate in the UAE',
    description: 'Professional real estate rental and sales services in the UAE by RMC De Luxe. A trusted partner for individual and corporate clients.',
    keywords: 'real estate agency, Tashkent real estate, rental properties, property sales, RMC De Luxe, UAE real estate, luxury real estate',
    openGraph: {
      locale: 'en_US',
      title: 'RMC De Luxe – Rental and Sale of Real Estate in the UAE',
      description: 'Professional real estate rental and sales services in the UAE by RMC De Luxe. A trusted partner for individual and corporate clients.',
    },
    twitter: {
      title: 'RMC De Luxe - Real Estate Agency in the UAE',
      description: 'Professional real estate rental and sales services in the UAE.',
    },
    structuredDataDescription: 'RMC De Luxe provides real estate rental and sales services in the UAE. A professional approach for individual and corporate clients.',
  },
};

const getTranslation = (locale: string): typeof translations['ru'] => {
  if (supportedLocales.includes(locale as SupportedLocale)) {
    return translations[locale as SupportedLocale];
  }
  return translations.en;
};

export const dynamic = 'force-dynamic';

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  const t = getTranslation(locale);

  const currentLocale = supportedLocales.includes(locale as SupportedLocale) ? locale : 'en';

  const domain = 'rmcdeluxe.com';

  const canonicalUrl = currentLocale === 'en' ? `https://${domain}/en` : `https://${domain}/${currentLocale}`;

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
    "image": "https://rmcdeluxe.com/og-im2age.jpg?v=2",
    "priceRange": "AED"
  };

  return (
    <html lang={currentLocale} className='p-0 m-0 h-full w-full'>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="alternate" hrefLang="ru" href={`https://${domain}/ru`} />
        <link rel="alternate" hrefLang="en" href={`https://${domain}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`https://${domain}`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:image" content="https://rmcestate.uz/og-im2age.jpg?v=2" />
        <meta name="twitter:image" content="https://rmcestate.uz/og-im2age.jpg?v=2" />
      </Head>
      <body className='h-full w-full p-0 m-0'>
        {children}
      </body>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
    </html>
  );
}

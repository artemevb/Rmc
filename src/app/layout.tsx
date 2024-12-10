// src/app/_layout.tsx

import '@/src/app/[locale]/_styles/globals.css';
import Head from 'next/head';
import { ReactNode } from 'react';

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

const supportedLocales = ['en'] as const;
type SupportedLocale = typeof supportedLocales[number];

const translations: Record<
  SupportedLocale,
  {
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
  }
> = {
  en: {
    title: 'RMC De Luxe – Rental and Sale of Real Estate in the UAE',
    description:
      'Professional real estate rental and sales services in the UAE by RMC De Luxe. A trusted partner for individual and corporate clients.',
    keywords:
      'real estate agency, Tashkent real estate, rental properties, property sales, RMC De Luxe, UAE real estate, luxury real estate',
    openGraph: {
      locale: 'en_US',
      title: 'RMC De Luxe – Rental and Sale of Real Estate in the UAE',
      description:
        'Professional real estate rental and sales services in the UAE by RMC De Luxe. A trusted partner for individual and corporate clients.',
    },
    twitter: {
      title: 'RMC De Luxe - Real Estate Agency in the UAE',
      description:
        'Professional real estate rental and sales services in the UAE.',
    },
    structuredDataDescription:
      'RMC De Luxe provides real estate rental and sales services in the UAE. A professional approach for individual and corporate clients.',
  },
};

const getTranslation = (
  locale: string
): typeof translations['en'] => {
  if (supportedLocales.includes(locale as SupportedLocale)) {
    return translations[locale as SupportedLocale];
  }
  return translations.en;
};

export const dynamic = 'force-dynamic';

export default function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = params;
  const t = getTranslation(locale);

  const currentLocale = supportedLocales.includes(
    locale as SupportedLocale
  )
    ? locale
    : 'en';

  const domain = 'rmcdeluxe.com';

  const canonicalUrl = `https://${domain}/en`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "RMC De Luxe",
    "url": canonicalUrl,
    "description": t.structuredDataDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Uzbekistan, Tashkent, Chinabad 2",
      "addressLocality": "Tashkent",
      "postalCode": "100000",
      "addressCountry": "UZ"
    },
    "telephone": "+9989785558787",
    "openingHours": "Mo-Fr 09:00-18:00",
    "image": "https://rmcdeluxe.com/og-image.jpg?v=2",
    "priceRange": "AED"
  };

  return (
    <html lang={currentLocale} className='p-0 m-0 h-full w-full'>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://${domain}/en`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://${domain}`}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          property="og:image"
          content="https://rmcdeluxe.com/og-image.jpg?v=2"
        />
        <meta
          name="twitter:image"
          content="https://rmcdeluxe.com/og-image.jpg?v=2"
        />
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="keywords" content={t.keywords} />
        <meta property="og:title" content={t.openGraph.title} />
        <meta
          property="og:description"
          content={t.openGraph.description}
        />
        <meta property="og:locale" content={t.openGraph.locale} />
        <meta name="twitter:title" content={t.twitter.title} />
        <meta
          name="twitter:description"
          content={t.twitter.description}
        />
      </Head>
      <body className='h-full w-full p-0 m-0'>
        {children}
      </body>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
    </html>
  );
}

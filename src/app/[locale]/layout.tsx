import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './_styles/globals.css';
import Header from '@/src/app/[locale]/_components/Header/Header';
import Footer from '@/src/app/[locale]/_components/Footer/Footer';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import CookieConsent from "./_components/CookieConsent";
import Head from 'next/head';
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700', '900'] });

const supportedLocales = ['ru', 'en'] as const;
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

// Функция для получения перевода на текущий язык
const getTranslation = (locale: string): typeof translations['ru'] => {
  if (supportedLocales.includes(locale as SupportedLocale)) {
    return translations[locale as SupportedLocale];
  }
  return translations.en; // По умолчанию английский язык
};

export type Locales = 'ru' | 'en';

export const metadata: Metadata = {
  title: 'RMC De Luxe – Аренда и продажа недвижимости в ОАЭ', // Дефолтное значение, будет заменено
  description: 'Профессиональные услуги по аренде и продаже недвижимости в ОАЭ от RMC De Luxe. Надежный партнер для физических и корпоративных клиентов.',
  keywords: 'риэлторское агентство, недвижимость Ташкент, аренда недвижимости, продажа недвижимости, RMC De Luxe, ОАЭ, недвижимость ОАЭ, элитная недвижимость',
  openGraph: {
    type: 'website',
    locale: 'ru_RU', // Дефолтное значение, будет заменено
    url: 'https://rmcdeluxe.com',
    title: 'RMC De Luxe – Аренда и продажа недвижимости в ОАЭ', // Дефолтное значение, будет заменено
    description: 'Профессиональные услуги по аренде и продаже недвижимости в ОАЭ от RMC De Luxe. Надежный партнер для физических и корпоративных клиентов.', // Дефолтное значение, будет заменено
    siteName: 'RMC De Luxe',
    images: [
      {
        url: 'https://rmcdeluxe.com/og-im2age.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'RMC De Luxe - Недвижимость в ОАЭ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RMC De Luxe - Риэлторское Агентство в ОАЭ', // Дефолтное значение, будет заменено
    description: 'Профессиональные услуги по аренде и продаже недвижимости в ОАЭ.', // Дефолтное значение, будет заменено
    images: 'https://rmcdeluxe.com/og-im2age.jpg?v=2',
  },
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://rmcdeluxe.com',
    languages: {
      ru: '/ru',
      en: '/en',
    },
  },
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string };
}>) {
  const locale: Locales =
    params?.locale === 'en' ? 'en' : 'ru';

  unstable_setRequestLocale(locale);

  const messages = await getMessages({ locale });
  const t = getTranslation(locale);

  // Структурированные данные
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "RMC De Luxe",
    "url": `https://rmcdeluxe.com/${locale}`,
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

  // Каноническая ссылка
  const canonicalUrl = locale === 'en' ? `https://rmcdeluxe.com/en` : `https://rmcdeluxe.com/${locale}`;

  return (
    <html lang={locale}>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="alternate" hrefLang="ru" href={`https://rmcdeluxe.com/ru`} />
        <link rel="alternate" hrefLang="en" href={`https://rmcdeluxe.com/en`} />
        <link rel="alternate" hrefLang="x-default" href={`https://rmcdeluxe.com`} />

        {/* Каноническая ссылка */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph изображения */}
        <meta property="og:image" content="https://rmcestate.uz/og-im2age.jpg?v=2" />
        <meta name="twitter:image" content="https://rmcestate.uz/og-im2age.jpg?v=2" />
      </Head>
      <body className={lato.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />

          <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />

          <Script
            id="yandex-metrika"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: ` 
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; 
                m[i].l=1*new Date(); 
                for (var j = 0; j < document.scripts.length; j++) { 
                  if (document.scripts[j].src === r) { return; } 
                } 
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(98684651, "init", {
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true,
                  webvisor: true
                });
              `,
            }}
          />

          {/* Внедрение <noscript> для Yandex Metrica */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <div>
                  <img src="https://mc.yandex.ru/watch/98684651" style="position: absolute; left: -9999px;" alt="" />
                </div>
              `,
            }}
          />
          <CookieConsent locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

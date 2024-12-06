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

const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700', '900'] });

export const metadata: Metadata = {
  title: 'RMC De Luxe – Аренда и продажа недвижимости в ОАЭ',
  description: 'Профессиональные услуги по аренде и продаже недвижимости в ОАЭ от RMC De Luxe. Надежный партнер для физических и корпоративных клиентов.',
  keywords:
    'риэлторское агентство, недвижимость Ташкент, аренда недвижимости, продажа недвижимости, RMC De Luxe, ОАЭ, недвижимость ОАЭ, элитная недвижимость',
  authors: [{ name: 'RMC De Luxe', url: 'https://rmcdeluxe.com' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://rmcdeluxe.com',
    title: 'RMC De Luxe – Аренда и продажа недвижимости в ОАЭ',
    description: 'Профессиональные услуги по аренде и продаже недвижимости в ОАЭ от RMC De Luxe. Надежный партнер для физических и корпоративных клиентов.',
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
    title: 'RMC De Luxe - Риэлторское Агентство в ОАЭ',
    description: 'Профессиональные услуги по аренде и продаже недвижимости в ОАЭ.',
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

export type Locales = 'ru' | 'en' | 'uz';

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

  // Структурированные данные
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "RMC De Luxe",
    "url": 'https://rmcdeluxe.com',
    "description": locale === 'ru'
      ? "RMC De Luxe предоставляет услуги по аренде и продаже недвижимости в ОАЭ. Профессиональный подход для физических и корпоративных клиентов."
      : "RMC De Luxe provides real estate rental and sales services in the UAE. Professional approach for individual and corporate clients.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Deira, Baniyas road, Twin Towers, 20 floor office number 10",
      "addressLocality": "Ташкент",
      "postalCode": "100000",
      "addressCountry": "ae"
    },
    "telephone": "+9989785558787",
    "openingHours": "Mo-Fr 09:00-18:00",
    "image": "https://rmcdeluxe.com/og-im2age.jpg?v=2",
    "priceRange": "AED"
  };

  return (
    <html lang={locale}>
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

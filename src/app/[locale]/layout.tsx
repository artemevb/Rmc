import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './_styles/globals.css';
import Header from '@/src/app/[locale]/_components/Header/Header';
import Footer from '@/src/app/[locale]/_components/Footer/Footer';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Head from 'next/head';
import Script from 'next/script';

const jost = Jost({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'RMC De Luxe предоставляет услуги по оценке, аренде и продаже недвижимости в ОАЭ. Профессиональный подход для физических и корпоративных клиентов.',
  description: 'RMC De Luxe предоставляет услуги по оценке, аренде и продаже недвижимости в ОАЭ. Профессиональный подход для физических и корпоративных клиентов.',
  keywords: 'риэлторское агентство, недвижимость Ташкент, аренда недвижимости, продажа недвижимости, оценка недвижимости, RMC De Luxe, ОАЭ, недвижимость ОАЭ, элитная недвижимость',
  authors: [{ name: 'RMC De Luxe', url: 'https://rmcestate.uz' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://rmcestate.uz',
    title: 'RMC De Luxe предоставляет услуги по оценке, аренде и продаже недвижимости в ОАЭ. Профессиональный подход для физических и корпоративных клиентов.',
    description: 'RMC De Luxe предоставляет услуги по оценке, аренде и продаже недвижимости в ОАЭ. Профессиональный подход для физических и корпоративных клиентов.',
    siteName: 'RMC De Luxe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RMC De Luxe - Риэлторское Агентство в ОАЭ',
    description: 'Профессиональные услуги по оценке, аренде и продаже недвижимости в ОАЭ.',
  },
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://rmcestate.uz',
    languages: {
      ru: '/ru',
      uz: '/uz',
      en: '/en',
    },
  },
};

export type Locales = 'ru' | 'uz' | 'en';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string };
}>) {
  const locale: Locales = params?.locale === 'uz' ? 'uz' : params?.locale === 'en' ? 'en' : 'ru';

  unstable_setRequestLocale(locale);

  // Получаем сообщения для текущей локали
  const messages = await getMessages({ locale });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "RMC De Luxe",
    "url": "https://rmcestate.uz",
    "description": "RMC De Luxe предоставляет услуги по оценке, аренде и продаже недвижимости в ОАЭ. Профессиональный подход для физических и корпоративных клиентов.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Узбекистан, г. Ташкент, ул.Чинабад 2",
      "addressLocality": "Ташкент",
      "postalCode": "100000",
      "addressCountry": "UZ"
    },
    "telephone": "+9989785558787",
    "openingHours": "Mo-Fr 09:00-18:00"
  };

  return (
    <html lang={locale}>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>

      <body className={jost.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
          <Head>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
          </Head>
          <Script
            id="yandex-metrika"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                ym(98684651, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
                });
              `,
            }}
          />
          <noscript>
            <div>
              <img src="https://mc.yandex.ru/watch/98684651" style={{ position: 'absolute', left: '-9999px' }} alt="" />
            </div>
          </noscript>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

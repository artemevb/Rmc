import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './_styles/globals.css';
import Header from '@/src/app/[locale]/_components/Header/Header';
import Footer from '@/src/app/[locale]/_components/Footer/Footer';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import CookieConsent from './_components/CookieConsent';

export type Locales = 'ru' | 'en' | 'uz';

const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700', '900'] });

const metadataByLocale: Record<Locales, Metadata> = {
  en: {
    title: 'Real Estate Purchase in Dubai, Rental and Sale | RMC De Luxe',
    description:
      'RMC De Luxe provides professional real estate services: renting, selling, and buying property in Dubai. Expert guidance on company formation, banking, and mortgages.',
    keywords: [
      'Dubai real estate',
      'rent apartments in Dubai',
      'buy property in UAE',
      'mortgage consulting',
      'company formation',
      'RMC De Luxe'
    ],
    authors: [{ name: 'RMC De Luxe', url: 'https://rmcdeluxe.com' }],
    viewport: 'width=device-width, initial-scale=1',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rmcdeluxe.com/en',
      title: 'Real Estate Purchase in Dubai, Rental and Sale | RMC De Luxe',
      description:
        'Comprehensive real estate solutions for apartments, villas, and commercial properties in Dubai. Sales, rentals, and investment consulting.',
      siteName: 'RMC De Luxe',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg?v=2',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Dubai Real Estate Services',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Real Estate Purchase in Dubai, Rental and Sale | RMC De Luxe',
      description:
        'Professional agency for rentals, sales, and property management in Dubai.',
      images: 'https://rmcdeluxe.com/og-image.jpg?v=2',
    },
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      canonical: 'https://rmcdeluxe.com/en',
      languages: {
        en: '/en',
        ru: '/ru',
        uz: '/uz',
      },
    },
  },
  ru: {
    title: 'Покупка Недвижимости в Дубае, Аренда и Продажа | RMC De Luxe',
    description:
      'RMC De Luxe — профессиональные услуги по аренде, продаже и покупке недвижимости в Дубае. Консультации по открытию компаний и ипотеке.',
    keywords: [
      'недвижимость в дубае',
      'купить квартиру в оаэ',
      'аренда недвижимости дубай',
      'ипотека в дубае',
      'формирование компании',
      'RMC De Luxe'
    ],
    authors: [{ name: 'RMC De Luxe', url: 'https://rmcdeluxe.com' }],
    viewport: 'width=device-width, initial-scale=1',
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: 'https://rmcdeluxe.com/ru',
      title: 'Покупка Недвижимости в Дубае, Аренда и Продажа | RMC De Luxe',
      description:
        'Все услуги в сфере недвижимости: аренда, продажа и покупка квартир, вилл и коммерческих объектов в Дубае.',
      siteName: 'RMC De Luxe',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg?v=2',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Недвижимость в Дубае',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Покупка Недвижимости в Дубае, Аренда и Продажа | RMC De Luxe',
      description:
        'Аренда, продажа и покупка недвижимости в Дубае. Полный спектр услуг и консультаций.',
      images: 'https://rmcdeluxe.com/og-image.jpg?v=2',
    },
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      canonical: 'https://rmcdeluxe.com/ru',
      languages: {
        en: '/en',
        ru: '/ru',
        uz: '/uz',
      },
    },
  },
  uz: {
    title: 'Dubayda Ko‘chmas Mulk Xaridi, Ijara va Sotish | RMC De Luxe',
    description:
      'RMC De Luxe Dubayda ko‘chmas mulk bo‘yicha profesional xizmatlar: ijara, sotish, sotib olish. Kompaniya ochish va ipoteka bo‘yicha maslahatlar.',
    keywords: [
      'Dubay ko‘chmas mulk',
      'Dubayda kvartira sotish',
      'ijara xizmatlari',
      'ipoteka maslahati',
      'kompaniya ro‘yxatdan o‘tkazish',
      'RMC De Luxe'
    ],
    authors: [{ name: 'RMC De Luxe', url: 'https://rmcdeluxe.com' }],
    viewport: 'width=device-width, initial-scale=1',
    openGraph: {
      type: 'website',
      locale: 'uz_UZ',
      url: 'https://rmcdeluxe.com/uz',
      title: 'Dubayda Ko‘chmas Mulk Xaridi, Ijara va Sotish | RMC De Luxe',
      description:
        'Kvartira va villalarni ijaraga olish, sotish yoki sotib olish. Shuningdek, kompaniya ro‘yxatdan o‘tkazish va ipoteka bo‘yicha maslahatlar.',
      siteName: 'RMC De Luxe',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg?v=2',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Dubay Ko‘chmas Mulk',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Dubayda Ko‘chmas Mulk Xaridi, Ijara va Sotish | RMC De Luxe',
      description:
        'Dubayda ijara, sotish va sotib olish bo‘yicha profesional xizmatlar. Ipoteka va kompaniya ochish bo‘yicha maslahatlar.',
      images: 'https://rmcdeluxe.com/og-image.jpg?v=2',
    },
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      canonical: 'https://rmcdeluxe.com/uz',
      languages: {
        en: '/en',
        ru: '/ru',
        uz: '/uz',
      },
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  const localeParam = params.locale;
  let locale: Locales;

  if (localeParam === 'ru') {
    locale = 'ru';
  } else if (localeParam === 'uz') {
    locale = 'uz';
  } else {
    locale = 'en';
  }

  return metadataByLocale[locale];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const localeParam = params.locale;
  const locale: Locales =
    localeParam === 'ru' ? 'ru'
    : localeParam === 'uz' ? 'uz'
    : 'en';

  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "RMC De Luxe",
    "url": `https://rmcdeluxe.com/${locale}`,
    "description": "We provide real estate services (rent, sale, purchase) in Dubai, plus expert advice on company formation and mortgages.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dubai Marina, Marina Plaza, 25th floor",
      "addressLocality": "Dubai",
      "postalCode": "00000",
      "addressCountry": "AE"
    },
    "telephone": "+97142255220",
    "openingHours": "Mo-Fr 09:00-18:00",
    "image": "https://rmcdeluxe.com/og-image.jpg?v=2",
    "priceRange": "AED 500,000 - 15,000,000"
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
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
          <Script
            id="faq-structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What services does RMC De Luxe offer?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "RMC De Luxe specializes in property rentals, sales, and purchases in Dubai, with additional support for company formation and mortgage consulting."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I buy or rent property in Dubai through RMC De Luxe?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Contact us to discuss your needs. We'll provide property listings, arrange viewings, handle paperwork, and guide you through the entire process."
                    }
                  }
                ]
              })
            }}
          />
          <Script
            id="yandex-metrika"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                  k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(98684651, "init", {
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true,
                  webvisor: true
                });
              `,
            }}
          />
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

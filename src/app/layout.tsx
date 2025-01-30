import '@/src/app/[locale]/_styles/globals.css';
import Head from 'next/head';
import { ReactNode } from 'react';

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

// Расширяем список поддерживаемых языков
const supportedLocales = ['en', 'ru', 'uz'] as const;
type SupportedLocale = typeof supportedLocales[number];

// Для каждой локали пропишем SEO-данные (title, description и т.д.).
// Здесь вы можете адаптировать ключевые слова (keywords) под реальный контент.
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
    title: 'RMC De Luxe – Rental, Sale, and Purchase of Real Estate in Dubai',
    description:
      'Professional real estate services in Dubai and the UAE: rentals, sales, and purchases of apartments and villas. A trusted partner for clients worldwide.',
    keywords: [
      'Dubai real estate',
      'UAE property',
      'apartments for sale in Dubai',
      'rental properties',
      'buying property in the UAE',
      'investment in Dubai',
      'RMC De Luxe'
    ].join(', '),
    openGraph: {
      locale: 'en_US',
      title: 'RMC De Luxe – Real Estate in Dubai and the UAE',
      description:
        'Rent, sell, or buy apartments and villas in Dubai with RMC De Luxe. Professional support for individuals and businesses.'
    },
    twitter: {
      title: 'RMC De Luxe – Dubai Real Estate',
      description:
        'Professional real estate agency in Dubai: rentals, sales, and purchases.'
    },
    structuredDataDescription:
      'RMC De Luxe provides real estate services in Dubai and the UAE, including rentals, sales, and property investments.'
  },
  ru: {
    title: 'RMC De Luxe – Аренда, Продажа и Покупка Недвижимости в Дубае',
    description:
      'Профессиональные услуги по аренде, продаже и покупке недвижимости в Дубае и ОАЭ. Надёжный партнёр для частных и корпоративных клиентов.',
    keywords: [
      'недвижимость в дубае',
      'купить квартиру в дубае',
      'продажа недвижимости дубай',
      'аренда квартиры дубаи',
      'новостройки дубай',
      'оаэ недвижимость',
      'RMC De Luxe'
    ].join(', '),
    openGraph: {
      locale: 'ru_RU',
      title: 'RMC De Luxe – Недвижимость в Дубае и ОАЭ',
      description:
        'Арендуйте, продавайте и покупайте недвижимость в Дубае вместе с RMC De Luxe. Профессиональная поддержка для частных и корпоративных клиентов.'
    },
    twitter: {
      title: 'RMC De Luxe – Недвижимость в Дубае',
      description:
        'Услуги по аренде, продаже и покупке недвижимости в Дубае и ОАЭ.'
    },
    structuredDataDescription:
      'RMC De Luxe предлагает услуги аренды, продажи и покупки недвижимости в Дубае и ОАЭ, включая квартиры и виллы.'
  },
  uz: {
    title: 'RMC De Luxe – Dubayda Ko‘chmas Mulkni Ijaraga Berish, Sotish va Sotib Olish',
    description:
      'Dubay va BAAda ko‘chmas mulk bo‘yicha professional xizmatlar: ijaraga berish, sotish va kvartiralar yoki villalarni sotib olish. Mahalliy va xalqaro mijozlar uchun ishonchli hamkor.',
    keywords: [
      'Dubay ko‘chmas mulk',
      'BAA mulk',
      'Dubayda kvartira sotib olish',
      'ijaraga beriladigan kvartiralar',
      'BAAda mulk sotish',
      'Dubaydagi investitsiya',
      'RMC De Luxe'
    ].join(', '),
    openGraph: {
      locale: 'uz_UZ',
      title: 'RMC De Luxe – Dubay va BAAda Ko‘chmas Mulk',
      description:
        'Dubayda kvartira yoki villa ijarasi, sotish va sotib olish RMC De Luxe bilan. Xususiy va korporativ mijozlar uchun professional qo‘llab-quvvatlash.'
    },
    twitter: {
      title: 'RMC De Luxe – Dubay Ko‘chmas Mulk',
      description:
        'Dubay va BAAda ko‘chmas mulkni ijaraga berish, sotish va sotib olish bo‘yicha professional xizmatlar.'
    },
    structuredDataDescription:
      'RMC De Luxe Dubay va BAAda ko‘chmas mulk bo‘yicha xizmatlar ko‘rsatadi: ijaraga berish, sotish, sotib olish hamda investitsiya imkoniyatlari.'
  }
};

// Функция для получения нужного блока перевода
const getTranslation = (locale: string): typeof translations['en'] => {
  if (supportedLocales.includes(locale as SupportedLocale)) {
    return translations[locale as SupportedLocale];
  }
  return translations.en;
};

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = params;
  const t = getTranslation(locale);

  // Определяем, есть ли локаль в списке
  const currentLocale = supportedLocales.includes(locale as SupportedLocale)
    ? locale
    : 'en';

  const domain = 'rmcdeluxe.com';
  const canonicalUrl = `https://${domain}/${currentLocale}`;

  // Структурированные данные (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'RMC De Luxe',
    url: canonicalUrl,
    description: t.structuredDataDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Uzbekistan, Tashkent, Chinabad 2',
      addressLocality: 'Tashkent',
      postalCode: '100000',
      addressCountry: 'UZ'
    },
    telephone: '+9989785558787',
    openingHours: 'Mo-Fr 09:00-18:00',
    image: 'https://rmcdeluxe.com/og-image.jpg?v=2',
    priceRange: 'AED'
  };

  return (
    <html lang={currentLocale} className="p-0 m-0 h-full w-full">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Альтернативные ссылки для каждой локали */}
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://${domain}/en`}
        />
        <link
          rel="alternate"
          hrefLang="ru"
          href={`https://${domain}/ru`}
        />
        <link
          rel="alternate"
          hrefLang="uz"
          href={`https://${domain}/uz`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://${domain}`}
        />

        {/* Канонический URL для текущей локали */}
        <link rel="canonical" href={canonicalUrl} />

        {/* OG-изображение и Twitter-изображение */}
        <meta
          property="og:image"
          content="https://rmcdeluxe.com/og-image.jpg"
        />
        <meta
          name="twitter:image"
          content="https://rmcdeluxe.com/og-image.jpg"
        />

        {/* SEO-теги */}
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="keywords" content={t.keywords} />

        {/* Open Graph */}
        <meta property="og:title" content={t.openGraph.title} />
        <meta
          property="og:description"
          content={t.openGraph.description}
        />
        <meta property="og:locale" content={t.openGraph.locale} />

        {/* Twitter */}
        <meta name="twitter:title" content={t.twitter.title} />
        <meta
          name="twitter:description"
          content={t.twitter.description}
        />
      </Head>
      <body className="h-full w-full p-0 m-0">
        {children}
      </body>
      <Head>
        {/* Структурированные данные JSON-LD */}
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

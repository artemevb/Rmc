// src/app/[locale]/page.tsx
import { GET_RESIDENTIAL_COMPLEXES, GET_LAYOUTS } from '../_components/PropertySearch/queries';
import PageContent from '../_components/PropertySearch/PageContent';
import { Locale } from '@/src/app/[locale]/_components/PropertySearch/locale';
import { apiVersion, dataset, projectId } from '@/src/sanity/env'; // Импортируем переменные окружения
import { Metadata } from 'next';

type LocaleMetadata = {
  [key: string]: Metadata;
};
interface PageProps {
  params: {
    locale?: string;
  };
}

const metadataByLocale: LocaleMetadata = {
  en: {
    title: 'Property Search | RMC De Luxe',
    description:
      'Find your ideal property in Dubai with RMC De Luxe. Our advanced search filters let you explore new developments, apartments, villas, and commercial spaces tailored to your budget and preferences. RMC De Luxe — 14 years of expertise, 200+ successful clients, and full legal support.',
    keywords: [
      'RMC De Luxe',
      'Dubai real estate',
      'property in Dubai',
      'property search',
      'apartments for sale',
      'villas for sale',
      'commercial property',
      'new developments',
      'investment in Dubai',
    ],
    openGraph: {
      title: 'Property Search | RMC De Luxe',
      description:
        'Explore a wide range of properties in Dubai with RMC De Luxe. Our expert team provides full support—whether you are renting, buying, or investing. Let us help you find the perfect home or investment opportunity.',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Logo',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Property Search | RMC De Luxe',
      description:
        'Find your ideal Dubai property with RMC De Luxe. From new developments to luxury villas, our filters make it easy to discover your next home or investment.',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Property Search',
        },
      ],
    },
  },

  ru: {
    title: 'Поиск недвижимости | RMC De Luxe',
    description:
      'Подберите идеальную недвижимость в Дубае вместе с RMC De Luxe. Гибкие фильтры позволят найти новостройки, квартиры, виллы и коммерческие объекты под ваш бюджет и запросы. RMC De Luxe — 14 лет опыта, более 200 успешных клиентов и полное юридическое сопровождение.',
    keywords: [
      'RMC De Luxe',
      'Дубай недвижимость',
      'поиск недвижимости',
      'квартиры в Дубае',
      'виллы в Дубае',
      'коммерческая недвижимость',
      'новостройки в Дубае',
      'инвестиции в ОАЭ',
    ],
    openGraph: {
      title: 'Поиск недвижимости | RMC De Luxe',
      description:
        'Откройте для себя широкий выбор недвижимости в Дубае с RMC De Luxe. Мы помогаем с покупкой, арендой и инвестициями, обеспечивая полную прозрачность и надежность.',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Logo',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Поиск недвижимости | RMC De Luxe',
      description:
        'Найдите недвижимость вашей мечты в Дубае вместе с RMC De Luxe. Удобные фильтры, юридическая поддержка и 14 лет опыта на рынке.',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Logo',
        },
      ],
    },
  },

  uz: {
    title: 'Ko‘chmas mulk qidirish | RMC De Luxe',
    description:
      'Dubaydagi ideal ko‘chmas mulkni RMC De Luxe bilan toping. Bizning qulay filtrlash tizimimiz yordamida yangi turar joy majmualari, xonadonlar, villalar va tijorat binolarini byudjet va ehtiyojlaringizga mos ravishda qidirishingiz mumkin. RMC De Luxe — 14 yillik tajriba, 200+ muvaffaqiyatli mijozlar va to‘liq huquqiy ko‘mak.',
    keywords: [
      'RMC De Luxe',
      'Dubay ko‘chmas mulki',
      'ko‘chmas mulk qidirish',
      'xonadonlar',
      'villar',
      'tijorat ko‘chmas mulki',
      'yangi turar joy majmualari',
      'investitsiya',
    ],
    openGraph: {
      title: 'Ko‘chmas mulk qidirish | RMC De Luxe',
      description:
        'RMC De Luxe bilan Dubayda keng turdagi ko‘chmas mulkni o‘rganing. Ijaraga, sotib olishga yoki investitsiya kiritishga yordam beramiz — hammasi ishonchli va shaffof tarzda amalga oshadi.',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Logo',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ko‘chmas mulk qidirish | RMC De Luxe',
      description:
        'Dubaydagi orzuingizdagi ko‘chmas mulkni RMC De Luxe bilan toping. Filtrlash tizimimiz barcha turdagi obyektlarni tez va oson qidirishga yordam beradi.',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Logo',
        },
      ],
    },
  },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const metadata = metadataByLocale[locale];
  return {
    ...metadata,
    alternates: {
      canonical: `https://rmcdeluxe.com/${locale}/property-search`,
    },
  };
}

const PropertySearchSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "RMC De Luxe",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+998 (78) 555 87 87",
          "contactType": "customer service",
          "areaServed": "AE",
          "availableLanguage": "en",
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Deira, Baniyas Road, Twin Towers, 20th Floor, Office Number 10",
          "addressLocality": "Dubai",
          "postalCode": "000000",
          "addressCountry": "AE",
        },
      }),
    }}
  />
);


const supportedLocales: Locale[] = ['ru', 'uz', 'en'];

export default async function Page({ params }: PageProps) {
  let { locale } = params;

  if (!locale || !supportedLocales.includes(locale as Locale)) {
    locale = 'en';
  }

  const GET_RESIDENTIAL_COMPLEXES_QUERY = encodeURIComponent(GET_RESIDENTIAL_COMPLEXES);
  const GET_LAYOUTS_QUERY = encodeURIComponent(GET_LAYOUTS);

  const SANITY_API_URL = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;

  // Функция для выполнения запросов к Sanity с отключенным кешированием
  const fetchSanityData = async (query: string) => {
    const response = await fetch(`${SANITY_API_URL}?query=${query}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;
  };

  // Получение данных параллельно
  const [complexes, layouts] = await Promise.all([
    fetchSanityData(GET_RESIDENTIAL_COMPLEXES_QUERY),
    fetchSanityData(GET_LAYOUTS_QUERY),
  ]);

  return (
    <>
      <PropertySearchSchema />
      <PageContent complexes={complexes} layouts={layouts} locale={locale as Locale} />
    </>
  );
}


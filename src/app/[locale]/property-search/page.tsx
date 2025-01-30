// src/app/[locale]/mortgage-calculator/page.tsx

import { GET_RESIDENTIAL_COMPLEXES, GET_LAYOUTS } from '../_components/PropertySearch/queries';
import PageContent from '../_components/PropertySearch/PageContent';
import { Locale } from '@/src/app/[locale]/_components/PropertySearch/locale';
import { apiVersion, dataset, projectId } from '@/src/sanity/env';
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
    title: 'Mortgage Calculator in Dubai | RMC De Luxe',
    description:
      'Use our Dubai mortgage calculator to estimate monthly payments for apartments, villas, or any property. Enter loan amount, interest rate, and down payment to find the best real estate options. RMC De Luxe — 14 years of expertise and full legal support.',
    keywords: [
      'mortgage calculator',
      'Dubai mortgage',
      'loan calculator',
      'property in Dubai',
      'interest rate',
      'RMC De Luxe',
      'RMC',
      'monthly payment',
      'buy real estate',
    ],
    openGraph: {
      title: 'Mortgage Calculator | RMC De Luxe',
      description:
        'Calculate your monthly mortgage payments for Dubai properties. Discover the cost of apartments, villas, and more with our advanced filters and expert support.',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Mortgage Calculator',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Mortgage Calculator in Dubai | RMC De Luxe',
      description:
        'Instantly calculate your monthly mortgage payments for real estate in Dubai. Explore apartments, villas, and commercial properties that fit your budget.',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Mortgage Calculator',
        },
      ],
    },
  },

  ru: {
    title: 'Поиск недвижимости | RMC De Luxe',
    description:
      'Воспользуйтесь ипотечным калькулятором, чтобы рассчитать ежемесячные платежи за недвижимость в Дубае. Укажите сумму кредита, процентную ставку и первый взнос, а мы подберём оптимальные варианты: квартиры, виллы и коммерческие объекты. RMC De Luxe — 14 лет на рынке и полное юридическое сопровождение.',
    keywords: [
      'ипотечный калькулятор',
      'калькулятор ипотеки',
      'ипотека кредит',
      'недвижимость в дубае',
      'процентная ставка',
      'RMC De Luxe',
      'RMC',
      'ежемесячный платёж',
      'купить недвижимость',
    ],
    openGraph: {
      title: 'Ипотечный калькулятор | RMC De Luxe',
      description:
        'Рассчитайте ипотеку для покупки квартиры или виллы в Дубае. Удобные инструменты и помощь экспертов в подборе недвижимости и оформлении документов.',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Ипотечный калькулятор',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ипотечный калькулятор в Дубае | RMC De Luxe',
      description:
        'Онлайн-калькулятор ипотеки для расчёта ежемесячных платежей. Подбор оптимальной недвижимости и полное сопровождение сделок в Дубае.',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Ипотечный калькулятор',
        },
      ],
    },
  },

  uz: {
    title: 'Ipoteka Kalkulyatori Dubayda | RMC De Luxe',
    description:
      'Dubaydagi ko‘chmas mulk uchun ipoteka to‘lovlarini hisoblash osonlashdi. Kredit summasi, foiz stavkasi va dastlabki to‘lovni kiriting — biz mos keluvchi xonadon yoki villa variantlarini ko‘rsatamiz. RMC De Luxe — 14 yillik tajriba va to‘liq huquqiy yordam.',
    keywords: [
      'ipoteka kalkulyatori',
      'Dubay ipoteka',
      'kredit kalkulyatori',
      'ko‘chmas mulk',
      'foiz stavkasi',
      'RMC De Luxe',
      'oylik to‘lov',
      'uy sotib olish',
    ],
    openGraph: {
      title: 'Ipoteka Kalkulyatori | RMC De Luxe',
      description:
        'Dubayda ipoteka bo‘yicha oylik to‘lovlarni tez hisoblang. Kredit shartlari va foiz stavkalarini kiriting, biz sizga mos keluvchi xonadon yoki villalarni taklif etamiz.',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Ipoteka Kalkulyatori',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ipoteka Kalkulyatori Dubayda | RMC De Luxe',
      description:
        'Dubayda uy yoki kvartira sotib olish uchun ipoteka to‘lovlarini hisoblang. Bizning kalkulyator yordami bilan to‘lash rejangizni osongina tuzing.',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'RMC De Luxe - Ipoteka Kalkulyatori',
        },
      ],
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale || 'en';
  const metadata = metadataByLocale[locale] || metadataByLocale.en;

  return {
    ...metadata,
    alternates: {
      canonical: `https://rmcdeluxe.com/${locale}/mortgage-calculator`,
      languages: {
        en: '/en/mortgage-calculator',
        ru: '/ru/mortgage-calculator',
        uz: '/uz/mortgage-calculator',
      },
    },
  };
}

function MortgageCalculatorSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: 'RMC De Luxe Mortgage Calculator',
    loanType: 'Mortgage',
    currency: 'AED',
    interestRate: '5.0',
    loanTerm: '300 months', 
    loanPaymentFrequency: 'Monthly',
    loanRepaymentForm: 'Amortized',
    provider: {
      '@type': 'Organization',
      name: 'RMC De Luxe',
      url: 'https://rmcdeluxe.com',
    },
    url: 'https://rmcdeluxe.com',
    description:
      'Online mortgage calculator for Dubai properties. Calculate monthly payments based on your loan amount, interest rate, and down payment.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

const supportedLocales: Locale[] = ['ru', 'uz', 'en'];

export default async function Page({ params }: PageProps) {
  let { locale } = params;
  if (!locale || !supportedLocales.includes(locale as Locale)) {
    locale = 'en';
  }

  const GET_RESIDENTIAL_COMPLEXES_QUERY = encodeURIComponent(GET_RESIDENTIAL_COMPLEXES);
  const GET_LAYOUTS_QUERY = encodeURIComponent(GET_LAYOUTS);

  const SANITY_API_URL = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;

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

  const [complexes, layouts] = await Promise.all([
    fetchSanityData(GET_RESIDENTIAL_COMPLEXES_QUERY),
    fetchSanityData(GET_LAYOUTS_QUERY),
  ]);

  return (
    <>
      <MortgageCalculatorSchema />
      <PageContent
        complexes={complexes}
        layouts={layouts}
        locale={locale as Locale}
      />
    </>
  );
}

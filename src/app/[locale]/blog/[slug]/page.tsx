import NewPages from "../../_components/Blog/NewsPage";
import Share from "../../_components/Blog/Share";
import OtherNews from "../../_components/Blog/OtherNews";
import { client } from '@/src/sanity/lib/client';


type InvestmentDubaiPageProps = {
  params: {
    locale?: string;
    slug: string;
  };
};

type Locales = 'en' | 'ru' | 'uz';

interface TitleObject {
  en?: string;
  ru?: string;
  uz?: string;
}

interface NewsContentBlock {
  _type: string;
  subtitle?: string | null;
  description?: {
    en?: string;
    ru?: string;
    uz?: string;
  };
  imageUrl?: string | null;
}

interface News {
  title: TitleObject;
  date?: string;
  viewCounter?: number;
  mainImage?: {
    asset?: {
      _id?: string;
      url?: string;
    }
  };
  content: NewsContentBlock[];
}

export const dynamic = 'force-dynamic';

function extractLocaleTitle(news: News, locale: Locales) {
  return news.title?.[locale] || news.title?.en || 'Default Title';
}

function extractLocaleDescription(news: News, locale: Locales) {
  const textBlock = news.content.find((block) => block._type === 'textBlock');

  const rawDescription = textBlock?.description?.[locale]
    || textBlock?.description?.en
    || 'Default description';

  // Сокращаем описание до первых двух предложений для мета-тегов
  const shortDescription = rawDescription
    .split('.')
    .slice(0, 2)
    .join('. ')
    .trim();

  return shortDescription;
}

function getLocaleOG(locale: Locales) {
  // Возвращаем соответствующую метку локали в формате, понятном для Open Graph
  // Например: 'ru_RU', 'en_US', 'uz_UZ'
  switch (locale) {
    case 'ru': return 'ru_RU';
    case 'uz': return 'uz_UZ';
    default: return 'en_US';
  }
}

export async function generateMetadata({ params }: InvestmentDubaiPageProps) {
  const locale: Locales = params?.locale === 'uz' ? 'uz'
    : params?.locale === 'en' ? 'en'
      : 'ru';
  const { slug } = params;

  const query = `*[_type == "news" && slug.current == $slug][0]{
  title,
  date,
  viewCounter,
  mainImage{
    asset->{
      _id,
      url
    }
  },
  content[] {
    _type,
    subtitle,
    description,
    "imageUrl": select(
      _type == 'image' => @.asset->url,
      null
    )
  }
}`;

  const news = await client.fetch(query, { slug }, { cache: 'no-store' });

  const seoTitle = extractLocaleTitle(news, locale);
  const seoDescription = extractLocaleDescription(news, locale);
  const seoImage = news.mainImage?.asset?.url || 'https://rmcdeluxe.com/og-image.jpg';
  const ogLocale = getLocaleOG(locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": seoTitle,
    "description": seoDescription,
    "image": [seoImage],
    "datePublished": news.date,
    "dateModified": news.date,
    "publisher": {
      "@type": "Organization",
      "name": "RMC Deluxe",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rmcdeluxe.com/og-image.jpg"
      }
    },
    "author": {
      "@type": "Person",
      "name": "RMC Deluxe Author"
    },
    "mainEntityOfPage": `https://rmcdeluxe.com/${locale}/${slug}`
  };

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        }
      ],
      url: `https://rmcdeluxe.com/${locale}/blog/${slug}`,
      type: 'article',
      locale: ogLocale,
      siteName: 'RMC Deluxe',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      image: seoImage,
    },
    alternates: {
      canonical: `https://rmcdeluxe.com/${locale}/${slug}`
    },
    robots: {
      index: true,
      follow: true
    },
    other: {
      'application/ld+json': JSON.stringify(structuredData)
    }
  };
}

export default async function Page({ params }: InvestmentDubaiPageProps) {
  const locale: Locales = params?.locale === 'uz' ? 'uz'
    : params?.locale === 'en' ? 'en'
      : 'ru';

  const { slug } = params;

  const query = `*[_type == "news" && slug.current == $slug][0]{
    title,
    date,
    viewCounter,
    mainImage{
      asset->{
        _id,
        url
      }
    },
    content[] {
      _type,
      subtitle,
      description,
      "imageUrl": select(
        _type == 'image' => @.asset->url,
        null
      )
    }
  }`;

  const news = await client.fetch(query, { slug }, { cache: 'no-store' });

  return (
    <div>
      <NewPages locale={locale} news={news} />
      <Share locale={locale} news={news} />
      <OtherNews locale={locale} />
    </div>
  );
}
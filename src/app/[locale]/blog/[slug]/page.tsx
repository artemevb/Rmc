import NewPages from "../../_components/Blog/NewsPage";
import Share from "../../_components/Blog/Share";
import OtherNews from "../../_components/Blog/OtherNews";
import { client } from '@/src/sanity/lib/client';
import type { Locales } from "@/src/app/[locale]/layout";

type InvestmentDubaiPageProps = {
    params: {
        locale?: string;
        slug: string;
    };
};
interface NewsContentBlock {
  _type: string;
  subtitle?: string;
  description?: { [key: string]: string };
  imageUrl?: string;
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

  const news = await client.fetch(query, { slug });

  const seoTitle = news.title || 'Default Title';
  const seoDescription = (news.content.find((block: NewsContentBlock) => block._type === 'textBlock')?.description?.en) || 'Default description';
  const seoImage = news.mainImage?.asset?.url || 'default-image.jpg';

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
          url: `https://rmcdeluxe.com/${locale}/${slug}`,
      },
      twitter: {
          card: 'summary_large_image',
          title: seoTitle,
          description: seoDescription,
          image: seoImage,
      },
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
      content[]{
        _type,
        subtitle,
        description,
        "imageUrl": select(
          _type == 'image' => @.asset->url,
          null
        )
      }
    }`;
    const news = await client.fetch(query, { slug });

    return (
        <div>
            <NewPages locale={locale} news={news} />
            <Share locale={locale} news={news} />
            <OtherNews locale={locale} />
        </div>
    );
}

import NewPages from "../../_components/Blog/NewsPage";
import Share from "../../_components/Blog/Share";
import OtherNews from "../../_components/Blog/OtherNews";
import type { Locales } from "@/src/app/[locale]/layout";
import { client } from '@/src/sanity/lib/client';

type InvestmentDubaiPageProps = {
    params: {
        locale?: string;
        slug: string;
    };
};

// Making the page an async server component
export default async function Page({ params }: InvestmentDubaiPageProps) {
    const locale: Locales = params?.locale === 'uz' ? 'uz'
        : params?.locale === 'en' ? 'en'
            : 'ru';

    const { slug } = params;

    // Fetch the news item from Sanity
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
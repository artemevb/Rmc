import { client } from '../../../../sanity/lib/client'
import type { Metadata } from 'next'
import Banner from "@/src/app/[locale]/_components/Builing_page_main/Banner";
import Schema from "@/src/app/[locale]/_components/InvestmentDubai/schema";
import Counter from "@/src/app/[locale]/_components/Main/Counter";
import Form from "@/src/app/[locale]/_components/Main/Form";
import StickyMenu from '@/src/app/[locale]/_components/Builing_page_main/StickyMenu';
import SliderInfo from '@/src/app/[locale]/_components/Builing_page_main/SliderInfo';
import GallerySlider from '@/src/app/[locale]/_components/Builing_page_main/GallerySlider';
import Conditions from '@/src/app/[locale]/_components/Builing_page_main/Conditions';
import Infrastructure from '@/src/app/[locale]/_components/Builing_page_main/Infrastructure';
import OtherBuildingsSlider from "@/src/app/[locale]/_components/Builing_page_main/OtherBuildingsSlider";
import Layouts from "../../_components/Builing_page_main/Layouts";
import type { Locales } from "@/src/app/[locale]/layout";

type InvestmentDubaiPageProps = {
  params: {
    locale?: string;
    slug: string;
  };
};

export async function generateMetadata(
  { params }: InvestmentDubaiPageProps
): Promise<Metadata> {
  const { slug } = params;
  const baseUrl = 'https://rmcdeluxe.com';

  const query = `*[_type == "residentialComplex" && slug.current == $slug][0]{
    subtitle,
    subtitle_main,
    desc_main,
    mainImage{
      asset->{
        url
      },
      alt
    }
  }`;

  const data = await client.fetch(query, { slug }, { cache: 'no-store' });

  const locale: Locales = params?.locale === 'uz' ? 'uz'
    : params?.locale === 'en' ? 'en'
      : 'ru';

  const title = data?.subtitle?.[locale] || data?.subtitle?.ru || 'Real Estate in Dubai';
  const description = data?.desc_main?.[locale] || data?.desc_main?.ru || 'Discover the best property in Dubai';

  // Формируем динамический канонический URL
  const canonicalUrl = `${baseUrl}/${locale}/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      images: data?.mainImage?.asset?.url ? [data.mainImage.asset.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function Page({ params }: InvestmentDubaiPageProps) {
  const locale: Locales = params?.locale === 'uz' ? 'uz'
    : params?.locale === 'en' ? 'en'
      : 'ru';

  const { slug } = params;

  const query = `*[_type == "residentialComplex" && slug.current == $slug][0]{
    _id,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    alt,
    subtitle,
    price,
    priceValue,
    district->{
      _id,
      name_ru,
      name_uz,
      name_en
    },
    type->{
      _id,
      name_ru,
      name_uz,
      name_en
    },
    rooms->{
      _id,
      number_ru,
      number_uz,
      number_en
    },
    completionTime->{
      _id,
      term_ru,
      term_uz,
      term_en
    },
    slug,
    gallery,
    subtitle_main,
    gallery_2,
    desc_main,
    gallery_3[] {
      _type,
      ...,
      asset->{
        _id,
        url
      }
    }
  }`;

  const data = await client.fetch(query, { slug }, { cache: 'no-store' });

  const otherQuery = `*[_type == "residentialComplex" && slug.current != $slug]{
    _id,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    price,
    subtitle,
    slug,
    type->{
      _id,
      name_ru,
      name_uz,
      name_en
    }
  }`;

  const otherData = await client.fetch(otherQuery, { slug }, { cache: 'no-store' });

  return (
    <div className="bg-white flex flex-col">
      <Banner locale={locale} data={data} />
      <StickyMenu />
      <section id="section1">
        <SliderInfo locale={locale} data={data} />
      </section>
      <section id="section2">
        <GallerySlider data={data} />
      </section>
      <section id="section3">
        <Layouts locale={locale} complexSlug={slug} />
      </section>
      <section id="section4">
        <Conditions locale={locale} complexSlug={slug} />
      </section>
      <section id="section5">
        <Infrastructure locale={locale} complexSlug={slug} />
      </section>
      <div className='mt-[120px] mdl:mt-[150px] xl:mt-[200px]'>
        <Counter />
      </div>
      <div className='mt-[120px] mdl:mt-[150px] xl:mt-[200px]'>
        <Schema />
      </div>
      <div className='mt-[120px] mdl:mt-[150px] xl:mt-[200px]'>
        <Form />
      </div>
      <div className='mt-[120px] mdl:mt-[150px] xl:mt-[200px] mb-[120px] mdx:mb-[150px] xl:mb-[200px]'>
        <OtherBuildingsSlider locale={locale} data={otherData} />
      </div>
    </div>
  );
}

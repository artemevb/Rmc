import { client } from '../../../../sanity/lib/client';
import Banner from "@/src/app/[locale]/_components/Builing_page_main/Banner";
import Schema from "@/src/app/[locale]/_components/InvestmentDubai/schema";
import Counter from "@/src/app/[locale]/_components/Main/Counter";
import Form from "@/src/app/[locale]/_components/Main/Form";
import StickyMenu from '@/src/app/[locale]/_components/Builing_page_main/StickyMenu'
import SliderInfo from '@/src/app/[locale]/_components/Builing_page_main/SliderInfo'
import GallerySlider from '@/src/app/[locale]/_components/Builing_page_main/GallerySlider'
import Conditions from '@/src/app/[locale]/_components/Builing_page_main/Conditions'
import Infrastructure from '@/src/app/[locale]/_components/Builing_page_main/Infrastructure'
import NewsComp from "@/src/app/[locale]/_components/Builing_page_main/OtherBuildingsSlider";
import Layouts from "../../_components/Builing_page_main/Layouts";
import type { Locales } from "@/src/app/[locale]/layout";

type InvestmentDubaiPageProps = {
  params: {
    locale?: string;
    slug: string;
  };
};

export default async function Page({ params }: InvestmentDubaiPageProps) {

  const locale: Locales = params?.locale === 'uz' ? 'uz'
    : params?.locale === 'en' ? 'en'
      : 'ru';

  const { slug } = params;

  // Запрос для текущего жилого комплекса с отключенным кэшированием
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
        gallery_3[]{
              _type,
              ...,
              asset->{
                _id,
                url
              }
        }
    }`;
  const data = await client.fetch(query, { slug }, { cache: 'no-store' });

  // Дополнительный запрос для других жилых комплексов (слайдер) с отключенным кэшированием
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
    slug
  }`;
  const otherData = await client.fetch(otherQuery, { slug }, { cache: 'no-store' });

  return (
    <div className="bg-white flex flex-col ">
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
        <NewsComp locale={locale} data={otherData} />
      </div>
    </div>
  );
}

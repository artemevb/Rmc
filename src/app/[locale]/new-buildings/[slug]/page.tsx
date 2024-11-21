import { client } from '../../../../sanity/lib/client';
// import { GET_RESIDENTIAL_COMPLEXES } from '../../_components/NewBuildings/queries';
// import { ResidentialComplex } from '../../_components/NewBuildings/types';
import Banner from "@/src/app/[locale]/_components/Builing_page_main/Banner";
import Schema from "@/src/app/[locale]/_components/InvestmentDubai/schema";
import Counter from "@/src/app/[locale]/_components/Main/Counter";
import Form from "@/src/app/[locale]/_components/Main/Form";
import StickyMenu from '@/src/app/[locale]/_components/Builing_page_main/StickyMenu'
import SliderInfo from '@/src/app/[locale]/_components/Builing_page_main/SliderInfo'
import GallerySlider from '@/src/app/[locale]/_components/Builing_page_main/GallerySlider'
import Conditions from '@/src/app/[locale]/_components/Builing_page_main/Conditions'
import Infrastructure from '@/src/app/[locale]/_components/Builing_page_main/Infrastructure'
// import ReviewsSlider from "../../_components/Builing_page_main/ReviewsSlider";
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

  // Запрос для текущего жилого комплекса
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
  const data = await client.fetch(query, { slug });

  // Дополнительный запрос для других жилых комплексов(слайдер)
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
  const otherData = await client.fetch(otherQuery, { slug });

  return (
    <div className="bg-white flex flex-col gap-[120px] mdl:gap-[150px] xl:gap-[200px] mb-[120px] mdx:mb-[150px] xl:mb-[200px]">
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
      {/* <section id="section6">
        <ReviewsSlider />
      </section> */}
      <Counter />
      <Schema />
      <Form />
      <NewsComp locale={locale} data={otherData} />
    </div>
  );
}

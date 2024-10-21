
import Banner from "@/src/app/[locale]/_components/Builing_page_main/Banner";
import Schema from "@/src/app/[locale]/_components/InvestmentDubai/schema";
import Counter from "@/src/app/[locale]/_components/Main/Counter";
import Form from "@/src/app/[locale]/_components/Main/Form";
import StickyMenu from '@/src/app/[locale]/_components/Builing_page_main/StickyMenu'
import SliderInfo from '@/src/app/[locale]/_components/Builing_page_main/SliderInfo'
import GallerySlider from '@/src/app/[locale]/_components/Builing_page_main/GallerySlider'

import Conditions from '@/src/app/[locale]/_components/Builing_page_main/Conditions'
import Infrastructure from '@/src/app/[locale]/_components/Builing_page_main/Infrastructure'
import ReviewsSlider from "../../_components/Builing_page_main/ReviewsSlider";
import OtherBuildingsSlider from "../../_components/Builing_page_main/OtherBuildingsSlider";
import Layouts from "../../_components/Builing_page_main/Layouts";
// import type { Locales } from "@/src/app/[locale]/layout";

// type InvestmentDubaiPageProps = {
//     params: {
//         locale?: string;
//     };
// };
// export default function page({ params }: InvestmentDubaiPageProps) {
export default function page() {
  // const locale: Locales = params?.locale === 'uz' ? 'uz'
  //     : params?.locale === 'en' ? 'en'
  //         : 'ru';
  return (
    <div className=" bg-white flex flex-col gap-[120px] mdl:gap-[150px] xl:gap-[200px] mb-[120px] mdx:mb-[150px] xl:mb-[200px]">
      <Banner />
      <StickyMenu />
      <section id="section1">
        <SliderInfo />
      </section>
      <section id="section2">
        <GallerySlider />
      </section>
      <section id="section3">
        <Layouts />
      </section>
      <section id="section4">
        <Conditions />
      </section>
      <section id="section5">
        <Infrastructure />
      </section>
      <section id="section6">
        <ReviewsSlider />
      </section>
      <Counter />
      <Schema />
      <Form />
      <OtherBuildingsSlider />
    </div>
  );
}

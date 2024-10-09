import Banner from "../_components/InvestmentDubai/Banner";
import Invest from "../_components/InvestmentDubai/invest";
import Consalting from "../_components/Main/Consalting";
// import SliderMap from "../_components/InvestmentDubai/SliderMap";
import Types from "../_components/InvestmentDubai/Types";
import Schema from "../_components/InvestmentDubai/schema";
import PopularReviews from "../_components/InvestmentDubai/PopularReviews";
import Counter from "../_components/Main/Counter";
import Form from "../_components/Main/Form";
import BlogSlider from "../_components/Main/Blogs";
import type { Locales } from "@/src/app/[locale]/layout";

type InvestmentDubaiPageProps = {
  params: {
    locale?: string;
  };
};

export default function InvestmentDubaiPage({ params }: InvestmentDubaiPageProps) {
  const locale: Locales = params?.locale === 'uz' ? 'uz'
    : params?.locale === 'en' ? 'en'
      : 'ru';
  return (
    <div className=" bg-white flex flex-col gap-[120px] mdl:gap-[150px] xl:gap-[200px]">
      <Banner />
      <Invest />
      <Consalting />
      {/* <SliderMap /> */}
      <Types />
      <Counter />
      <Schema />
      <PopularReviews />
      <Form />
      <BlogSlider locale={locale} />
    </div>
  );
}

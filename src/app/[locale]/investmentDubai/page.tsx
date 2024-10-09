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

interface NewsCompProps {
  locale: string;
}

export default function Main({ locale }: NewsCompProps) {
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

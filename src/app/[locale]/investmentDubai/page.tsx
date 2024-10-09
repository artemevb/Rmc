import Banner from "../_components/InvestmentDubai/Banner";
import Invest from "../_components/InvestmentDubai/invest";
import Consalting from "../_components/Main/Consalting";
import WhyUs from "../_components/Main/WhyUs";
import BuildingsSlider from "../_components/Main/BuildingsSlider";
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
      <WhyUs />
      <BuildingsSlider locale={locale} />
      <Counter />
      <Form />
      <BlogSlider locale={locale} />
    </div>
  );
}

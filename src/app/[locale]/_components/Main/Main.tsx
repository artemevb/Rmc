import Banner from "./Banner";
import AboutUs from "./AboutUs";
import Investition from "./Investition";
import Consalting from "./Consalting";
import Service from "./Service";
import WhyUs from "./WhyUs";
import BuildingsSlider from "./BuildingsSlider";
import Counter from "./Counter";
import Form from "./Form";
import BlogSlider from "./Blogs";

type Locale = 'uz' | 'ru' | 'en'; // Определение типа Locale

interface MainProps {
  locale: Locale; // Используем тип Locale
}

export default function Main({ locale }: MainProps) {
  return (
    <div className="bg-white flex flex-col gap-[120px] mdl:gap-[150px] xl:gap-[200px]">
      <Banner />
      <AboutUs />
      <Investition locale={locale} />
      <Service />
      <Consalting />
      <WhyUs />
      <BuildingsSlider />
      <Counter />
      <Form />
      <BlogSlider locale={locale} />
    </div>
  );
}

import Banner from "../_components/InvestmentDubai/Banner";
import Invest from "../_components/InvestmentDubai/invest";
import Form from "../_components/Main/Form";

interface NewsCompProps {
  locale: string;
}

export default function Main() {
  return (
    <div className=" bg-white flex flex-col gap-[120px] mdl:gap-[150px] xl:gap-[200px]">
      <Banner />
      <Invest />
      <Form />
    </div>
  );
}

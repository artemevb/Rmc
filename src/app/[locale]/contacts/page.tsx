import Info from "../_components/Contacts/Info";
import Invest from "../_components/InvestmentDubai/invest";
import Form from "../_components/Main/Form";


export default function Contacts() {
  return (
    <div className=" bg-white flex mt-[20px] mdx:mt-[40px] xl:mt-[70px] flex-col gap-[120px] mdl:gap-[150px] xl:gap-[200px]">
      <Info />
      <Invest />
      <Form />
    </div>
  );
}
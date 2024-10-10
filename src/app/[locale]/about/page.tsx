import Banner from "../_components/About/Banner";
import AboutCompany from "../_components/About/AboutCompany";
import PartnersSlider from "../_components/Contacts/SliderPartners";
import WhyUs from "../_components/Main/WhyUs";
import Services from "../_components/About/Services";
import Form from "../_components/Main/Form";


export default function About() {

    return (
        <div className=" bg-white flex flex-col gap-[120px] mdx:gap-[150px] xl:gap-[200px] mb-[120px] mdx:mb-[150px] xl:mb-[200px]">
            <Banner />
            <AboutCompany />
            <Services />
            <WhyUs />
            <PartnersSlider />
            <Form />
        </div>
    );
}

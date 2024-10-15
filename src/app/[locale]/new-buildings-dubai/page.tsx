import InDubai from "../_components/NewBuildingsDubai/InDubai";
import NewBuildingsMarket from "../_components/NewBuildings/NewBuildingsMarket";
import CatalogNewBuildings from "../_components/NewBuildings/CatalogNewBuildings";
import Schema from "../_components/InvestmentDubai/schema";
import PopularReviews from "../_components/InvestmentDubai/PopularReviews";
import Counter from "../_components/Main/Counter";
import Form from "../_components/Main/Form";
import BlogSlider from "../_components/Main/Blogs";
import type { Locales } from "@/src/app/[locale]/layout";
import Consalting from "../_components/Main/Consalting";

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
            <InDubai />
            <NewBuildingsMarket />
            <Consalting />
            <CatalogNewBuildings locale={locale} />
            <Counter />
            <Schema />
            <PopularReviews />
            <Form />
            <BlogSlider locale={locale} />
        </div>
    );
}

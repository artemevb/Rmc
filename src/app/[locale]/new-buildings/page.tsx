
import Main from "../_components/NewBuildingsMain/Main";
import Form from "../_components/NewBuildingsMain/Form";
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
            <Main locale={locale}/>
            <Form />
        </div>
    );
}

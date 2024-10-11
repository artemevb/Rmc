
import NewPages from "../../_components/Blog/NewsPage";
// import Share from "../../_components/Blog/Share";
// import OtherNews from "../../_components/NewsPages/OtherNews";
import type { Locales } from "@/src/app/[locale]/layout";

type InvestmentDubaiPageProps = {
    params: {
        locale?: string;
    };
};

export default function page({ params }: InvestmentDubaiPageProps) {
    const locale: Locales = params?.locale === 'uz' ? 'uz'
    : params?.locale === 'en' ? 'en'
        : 'ru';

    return (
        <div>
            <NewPages locale={locale}/>
            {/* <Share /> */}
            {/* <OtherNews /> */}
        </div>
    );
}
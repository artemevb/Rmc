import PopularNews from "../_components/Blog/PopularNews";
import type { Locales } from "@/src/app/[locale]/layout";
import News from "../_components/Blog/News";

type InvestmentDubaiPageProps = {
    params: {
        locale?: string;
    };
};

export default function Blog({ params }: InvestmentDubaiPageProps) {
    const locale: Locales = params?.locale === 'uz' ? 'uz'
        : params?.locale === 'en' ? 'en'
            : 'ru';

    return (
        <div className=" bg-white flex flex-col gap-[120px] mdx:gap-[150px] xl:gap-[200px] mb-[120px] mdx:mb-[150px] xl:mb-[200px] mt-[30px] mdx:mt-[40px]">
            <PopularNews locale={locale} />
            <News locale={locale} />
        </div>
    );
}

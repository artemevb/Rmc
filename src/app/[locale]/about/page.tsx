import Banner from "../_components/About/Banner";
import AboutCompany from "../_components/About/AboutCompany";
import PartnersSlider from "../_components/Contacts/SliderPartners";
import WhyUs from "../_components/Main/WhyUs";
import Services from "../_components/About/Services";
import Form from "../_components/Main/Form";
import { Metadata } from 'next';

type LocaleMetadata = {
    [key: string]: Metadata;
};

const metadataByLocale: LocaleMetadata = {
    en: {
        title: 'About Us | RMC De Luxe',
        description: 'RMC De Luxe is a real estate agency specializing in property rentals and sales. 14 years of experience, 200+ successful clients, and 20+ investment programs. Your reliable partner in real estate!',
        keywords: ['RMC De Luxe', 'real estate agency', 'property rentals', 'property sales', 'investment programs', 'legal support', 'tenant search', 'property valuation'],
        openGraph: {
            title: 'About Us | RMC De Luxe',
            description: 'Discover RMC De Luxe, a real estate agency with 14 years of experience in property rentals and sales. Your data is secure, and every step is transparent and reliable.',
            images: [
                {
                    url: 'https://rmcdeluxe.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'RMC De Luxe - About Us',
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'About Us | RMC De Luxe',
            description: 'Discover RMC De Luxe, a real estate agency with 14 years of experience in property rentals and sales. Your data is secure, and every step is transparent and reliable.',
            images: [
                {
                    url: 'https://rmcdeluxe.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'RMC De Luxe - About Us',
                },
            ],
        },
    },
    ru: {
        title: 'О нас | RMC De Luxe',
        description: 'RMC De Luxe — риэлторское агентство, предоставляющее комплексные услуги по аренде и продаже недвижимости. 14 лет опыта, 200+ успешных клиентов, 20+ инвестиционных программ. Ваш надежный партнер в сфере недвижимости.',
        keywords: ['RMC De Luxe', 'риэлторское агентство', 'аренда недвижимости', 'продажа недвижимости', 'инвестиционные программы', 'юридическое сопровождение', 'поиск арендаторов', 'оценка объектов недвижимости'],
        openGraph: {
            title: 'О нас | RMC De Luxe',
            description: 'Узнайте больше о RMC De Luxe, риэлторском агентстве с 14-летним опытом, предоставляющем услуги аренды и продажи недвижимости. Ваши данные под надежной защитой, а каждый шаг прозрачен и предсказуем.',
            images: [
                {
                    url: 'https://rmcdeluxe.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'RMC De Luxe - О нас',
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'О нас | RMC De Luxe',
            description: 'Узнайте больше о RMC De Luxe, риэлторском агентстве с 14-летним опытом, предоставляющем услуги аренды и продажи недвижимости. Ваши данные под надежной защитой, а каждый шаг прозрачен и предсказуем.',
            images: [
                {
                    url: 'https://rmcdeluxe.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'RMC De Luxe - О нас',
                },
            ],
        },
    },
    uz: {
        title: 'Biz haqimizda | RMC De Luxe',
        description: 'RMC De Luxe — ko‘chmas mulk agentligi, ijaraga berish va sotish bo‘yicha kompleks xizmatlarni taqdim etadi. 14 yillik tajriba, 200+ muvaffaqiyatli mijozlar, 20+ investitsiya dasturlari. Ko‘chmas mulkdagi ishonchli hamkoringiz!',
        keywords: ['RMC De Luxe', 'ko‘chmas mulk agentligi', 'ijaraga berish', 'ko‘chmas mulk sotish', 'investitsiya dasturlari', 'yuridik xizmatlar', 'ijarachilarni qidirish', 'ko‘chmas mulk baholash'],
        openGraph: {
            title: 'Biz haqimizda | RMC De Luxe',
            description: 'RMC De Luxe — ko‘chmas mulk ijarasi va savdosi bo‘yicha 14 yillik tajribaga ega agentlik. Xizmatlarimiz xavfsiz, har bir bosqich aniq va ishonchli.',
            images: [
                {
                    url: 'https://rmcdeluxe.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'RMC De Luxe - Biz haqimizda',
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Biz haqimizda | RMC De Luxe',
            description: 'RMC De Luxe — ko‘chmas mulk ijarasi va savdosi bo‘yicha 14 yillik tajribaga ega agentlik. Xizmatlarimiz xavfsiz, har bir bosqich aniq va ishonchli.',
            images: [
                {
                    url: 'https://rmcdeluxe.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'RMC De Luxe - Biz haqimizda',
                },
            ],
        },
    },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale || 'en';
    const metadata = metadataByLocale[locale];
    return {
        ...metadata,
        alternates: {
            canonical: `https://rmcdeluxe.com/${locale}/about`,
        },
    };
}

const AboutSchema = () => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "RMC De Luxe",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+998 (78) 555 87 87",
                    "contactType": "customer service",
                    "areaServed": "AE",
                    "availableLanguage": "en",
                },
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Deira, Baniyas Road, Twin Towers, 20th Floor, Office Number 10",
                    "addressLocality": "Dubai",
                    "postalCode": "000000",
                    "addressCountry": "AE",
                },
            }),
        }}
    />
);

export default function About() {

    return (
        <>
            <AboutSchema />
            <div className=" bg-white flex flex-col gap-[120px] mdx:gap-[150px] xl:gap-[200px] mb-[120px] mdx:mb-[150px] xl:mb-[200px]">
                <Banner />
                <AboutCompany />
                <Services />
                <WhyUs />
                <PartnersSlider />
                <Form />
            </div>
        </>
    );
}

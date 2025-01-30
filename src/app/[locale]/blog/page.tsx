import PopularNews from "../_components/Blog/PopularNews";
import type { Locales } from "@/src/app/[locale]/layout";
import News from "../_components/Blog/News";
import { Metadata } from 'next';

type InvestmentDubaiPageProps = {
    params: {
        locale?: string;
    };
};

type LocaleMetadata = {
    [key: string]: Metadata;
};

const metadataByLocale: LocaleMetadata = {
    en: {
        title: 'Articles | RMC De Luxe',
        description: 'Explore insightful articles on real estate sales, market trends, and tips for buying or selling properties. Stay informed with RMC De Luxe!',
        keywords: ['real estate articles', 'property sales', 'market trends', 'RMC De Luxe', 'buying tips', 'selling tips'],
        openGraph: {
            title: 'Articles | RMC De Luxe',
            description: 'Explore insightful articles on real estate sales, market trends, and tips for buying or selling properties. Stay informed with RMC De Luxe!',
            images: [
                {
                    url: 'https://rmcdeluxe.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'logo',
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Articles | RMC De Luxe',
            description: 'Explore insightful articles on real estate sales, market trends, and tips for buying or selling properties. Stay informed with RMC De Luxe!',
            images: [
                {
                    url: 'https://rmcdeluxe.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'logo',
                },
            ],
        },
    },
    ru: {
        title: 'Статьи | RMC De Luxe',
        description: 'Изучите статьи о продаже недвижимости, рыночных трендах и советах по покупке или продаже. Будьте в курсе с RMC De Luxe!',
        keywords: ['статьи о недвижимости', 'продажа недвижимости', 'рыночные тренды', 'RMC De Luxe', 'советы по покупке', 'советы по продаже'],
        openGraph: {
            title: 'Статьи | RMC De Luxe',
            description: 'Изучите статьи о продаже недвижимости, рыночных трендах и советах по покупке или продаже. Будьте в курсе с RMC De Luxe!',
            images: [
                {
                    url: 'https://rmcdeluxe.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'logo',
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Статьи | RMC De Luxe',
            description: 'Изучите статьи о продаже недвижимости, рыночных трендах и советах по покупке или продаже. Будьте в курсе с RMC De Luxe!',
            images: [
                {
                    url: 'https://rmcdeluxe.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'logo',
                },
            ],
        },
    },
    uz: {
        title: 'Maqolalari | RMC De Luxe',
        description: 'Ko‘chmas mulk savdosi, bozor tendensiyalari va mulk sotib olish yoki sotish bo‘yicha maslahatlarni o‘rganing. RMC De Luxe bilan xabardor bo‘ling!',
        keywords: ['ko‘chmas mulk maqolalari', 'mulk savdosi', 'bozor tendensiyalari', 'RMC De Luxe', 'sotib olish bo‘yicha maslahatlar', 'sotish bo‘yicha maslahatlar'],
        openGraph: {
            title: 'Maqolalari | RMC De Luxe',
            description: 'Ko‘chmas mulk savdosi, bozor tendensiyalari va mulk sotib olish yoki sotish bo‘yicha maslahatlarni o‘rganing. RMC De Luxe bilan xabardor bo‘ling!',
            images: [
                {
                    url: 'https://rmcdeluxe.com/articles-og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'logo',
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Maqolalari | RMC De Luxe',
            description: 'Ko‘chmas mulk savdosi, bozor tendensiyalari va mulk sotib olish yoki sotish bo‘yicha maslahatlarni o‘rganing. RMC De Luxe bilan xabardor bo‘ling!',
            images: [
                {
                    url: 'https://rmcdeluxe.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'logo',
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
            canonical: `https://rmcdeluxe.com/${locale}/blog`,
        },
    };
}

const BlogSchema = () => (
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

export default function Blog({ params }: InvestmentDubaiPageProps) {
    const locale: Locales = params?.locale === 'uz' ? 'uz'
        : params?.locale === 'en' ? 'en'
            : 'ru';

    return (
        <div className=" bg-white flex flex-col mb-[120px] mdx:mb-[150px] xl:mb-[200px] mt-[30px] mdx:mt-[40px]">
            <BlogSchema />
            <PopularNews locale={locale} />
            <News locale={locale} />
        </div>
    );
}

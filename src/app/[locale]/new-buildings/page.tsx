import Main from "../_components/NewBuildingsMain/Main";
import Form from "../_components/NewBuildingsMain/Form";
import type { Locales } from "@/src/app/[locale]/layout";
import { Metadata } from "next";

type InvestmentDubaiPageProps = {
  params: {
    locale?: string;
  };
};

export function generateMetadata({ params }: InvestmentDubaiPageProps): Metadata {
  const locale: Locales =
    params?.locale === "uz"
      ? "uz"
      : params?.locale === "en"
      ? "en"
      : "ru";

  const seoContent = {
    ru: {
      title: "Новостройки в Дубае – Инвестиции и покупка недвижимости",
      description:
        "Подбор новостроек в Дубае. Квартиры, апартаменты, виллы от застройщиков. Узнайте о ценах, планировках и выгодных инвестиционных возможностях.",
      keywords: "квартиры оаэ, новостройки, недвижимость в эмиратах, инвестиции, купить, жилого комплекса, жилые комплексы, цены новостройки, жк комплексы, квартиры новостройки, квартиры в эмиратах",
      url: "https://rmcdeluxe.com/ru/new-buildings",
    },
    en: {
      title: "New Developments in Dubai – Property Investments & Purchases",
      description:
        "Discover the latest property developments in Dubai. Apartments, villas, and investment opportunities. Learn about prices, floor plans, and ROI.",
      keywords: "UAE apartments, new buildings, real estate in the Emirates, investments, buy, residential complex, residential complexes, new building prices, residential complexes, new building apartments, apartments in the Emirates",
      url: "https://rmcdeluxe.com/en/new-buildings",
    },
    uz: {
      title: "Dubaydagi yangi qurilishlar – Investitsiya va ko‘chmas mulk",
      description:
        "Dubaydagi eng so‘nggi qurilish loyihalarini kashf eting. Xonadonlar, villalar va investitsiya imkoniyatlari haqida ma’lumot oling.",
      keywords: "BAA kvartiralari, yangi qurilgan binolar, Amirlikdagi ko'chmas mulk, investitsiyalar, sotib olish, turar-joy majmuasi, turar-joy majmualari, yangi binolar narxlari, turar-joy majmualari, yangi qurilgan kvartiralar, Amirlikdagi kvartiralar",
      url: "https://rmcdeluxe.com/uz/new-buildings",
    },
  };

  const currentSEO = seoContent[locale];

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: [currentSEO.keywords],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: currentSEO.url,
      images: [
        {
          url: "https://rmcdeluxe.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Dubai Real Estate",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: currentSEO.title,
      description: currentSEO.description,
      images: ["https://rmcdeluxe.com/og-image.jpg"],
    },
    alternates: {
      canonical: currentSEO.url,
      languages: {
        ru: "https://rmcdeluxe.com/ru/new-buildings",
        en: "https://rmcdeluxe.com/en/new-buildings",
        uz: "https://rmcdeluxe.com/uz/new-buildings",
      },
    },
  };
}
export default function InvestmentDubaiPage({ params }: InvestmentDubaiPageProps) {
  const locale: Locales =
    params?.locale === "uz"
      ? "uz"
      : params?.locale === "en"
      ? "en"
      : "ru";

  return (
    <div className="bg-white flex flex-col">
      <h1 className="sr-only">
        {locale === "ru"
          ? "Новостройки в Дубае"
          : locale === "en"
          ? "New Developments in Dubai"
          : "Dubaydagi yangi qurilishlar"}
      </h1>
      <Main locale={locale} />
      <Form />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name":
              locale === "ru"
                ? "Новостройки"
                : locale === "en"
                ? "New Developments"
                : "Yangi Qurilishlar",
            "description":
              locale === "ru"
                ? "Подбор новостроек в Дубае."
                : locale === "en"
                ? "Property listings in Dubai."
                : "Dubaydagi yangi qurilishlar ro'yhati.",
            "url": "https://example.com",
            "offers": [
              {
                "@type": "Offer",
                "name": "Mangrove By Emaar",
                "price": "1500000",
                "priceCurrency": "AED",
                "itemOffered": {
                  "@type": "Apartment",
                  "numberOfRooms": 3,
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Dubai",
                  },
                  "image": "https://rmcdeluxe.com/og-image.jpg",
                },
              },
              {
                "@type": "Offer",
                "name": "Violet 3",
                "price": "2000000",
                "priceCurrency": "AED",
                "itemOffered": {
                  "@type": "House",
                  "numberOfRooms": 5,
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Dubai",
                  },
                  "image": "https://rmcdeluxe.com/og-image.jpg",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

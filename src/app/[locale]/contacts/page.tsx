import { Metadata } from 'next';
import Info from '../_components/Contacts/Info';
import PartnersSlider from '../_components/Contacts/SliderPartners';
import Form from '../_components/Main/Form';

type LocaleMetadata = {
  [key: string]: Metadata;
};

const metadataByLocale: LocaleMetadata = {
  en: {
    title: 'Contact | RMC De Luxe',
    description: 'Get in touch with us to learn more about our services and offers. We are always ready to answer your questions! Phone: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Address: Deira, Baniyas Road, Twin Towers, 20th Floor, Office Number 10',
    keywords: ["contacts", "communication", "services", "company", "email", "phone", "address", "RMC De Luxe", "RMC", "location map", "phone numbers", "our address", "how to find us"],
    openGraph: {
      title: 'Contact | RMC De Luxe',
      description: 'Get in touch with us to learn more about our services and offers. Phone: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Address: Deira, Baniyas Road, Twin Towers, 20th Floor, Office Number 10',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Contact Information',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact | RMC De Luxe',
      description: 'Get in touch with us to learn more about our services and offers. Phone: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Address: Deira, Baniyas Road, Twin Towers, 20th Floor, Office Number 10',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Contact Information',
        },
      ],
    },
  },
  ru: {
    title: 'Контакты | RMC De Luxe',
    description: 'Свяжитесь с нами, чтобы узнать больше о наших услугах и предложениях. Мы всегда готовы ответить на ваши вопросы! Телефон: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Адрес: Дейра, Банияс Роуд, Твин Тауэрс, 20 этаж, Офис №10',
    keywords: ['контакты', 'связь', 'услуги', 'компания', 'email', 'телефон', 'адрес', 'RMC De Luxe', 'RMC', 'карта месторасположение','тел номера', 'наш адрес', 'как нас найти',],
    openGraph: {
      title: 'Контакты | RMC De Luxe',
      description: 'Свяжитесь с нами, чтобы узнать больше о наших услугах и предложениях. Телефон: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Адрес: Дейра, Банияс Роуд, Твин Тауэрс, 20 этаж, Офис №10',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Информация для связи',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Контакты | RMC De Luxe',
      description: 'Свяжитесь с нами, чтобы узнать больше о наших услугах и предложениях. Телефон: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Адрес: Дейра, Банияс Роуд, Твин Тауэрс, 20 этаж, Офис №10',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Информация для связи',
        },
      ],
    },
  },
  uz: {
    title: 'Kontakt | RMC De Luxe',
    description: 'Bizning xizmatlarimiz va takliflarimiz haqida ko‘proq bilib olish uchun biz bilan bog‘laning. Biz har doim savollaringizga javob berishga tayyormiz! Telefon: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Manzil: Deira, Baniyas Road, Twin Towers, 20-qavat, Ofis №10',
    keywords: ["kontaktlar", "aloqa", "xizmatlar", "kompaniya", "elektron pochta", "telefon", "manzil", "RMC De Luxe", "RMC", "joylashuv xaritasi", "telefon raqamlari", "bizning manzilimiz", "bizni qanday topish mumkin"],
    openGraph: {
      title: 'Kontakt | RMC De Luxe',
      description: 'Bizning xizmatlarimiz va takliflarimiz haqida ko‘proq bilib olish uchun biz bilan bog‘laning. Telefon: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Manzil: Deira, Baniyas Road, Twin Towers, 20-qavat, Ofis №10',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Aloqa ma’lumotlari',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Kontakt | RMC De Luxe',
      description: 'Bizning xizmatlarimiz va takliflarimiz haqida ko‘proq bilib olish uchun biz bilan bog‘laning. Telefon: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Manzil: Deira, Baniyas Road, Twin Towers, 20-qavat, Ofis №10',
      images: [
        {
          url: 'https://rmcdeluxe.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Aloqa ma’lumotlari',
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
      canonical: `https://rmcdeluxe.com/${locale}/contacts`,
    },
  };
}

const ContactSchema = () => (
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

export default function Contacts() {
  return (
    <>
      <ContactSchema />
      <div className="bg-white flex mt-[20px] mdx:mt-[40px] xl:mt-[70px] flex-col gap-[120px] mdl:gap-[150px] xl:gap-[200px] mb-[120px] mdx:mb-[150px] xl:mb-[200px]">
        <Info />
        <PartnersSlider />
        <Form />
      </div>
    </>
  );
}

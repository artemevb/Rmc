import { Metadata } from 'next';
import Info from '../_components/Contacts/Info';
import PartnersSlider from '../_components/Contacts/SliderPartners';
import Form from '../_components/Main/Form';

type InvestmentDubaiPageProps = {
  params: {
    locale?: string;
  };
};

const metadataRu = {
  title: 'Контакты | RMC De Luxe',
  description: 'Свяжитесь с нами, чтобы узнать больше о наших услугах и предложениях. Мы всегда готовы ответить на ваши вопросы! Телефон: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Адрес: Deira, Baniyas road, Twin Towers, 20 floor office number 10',
  keywords: ['контакты', 'связь', 'услуги', 'компания', 'email', 'телефон', 'адрес'],
  openGraph: {
    title: 'Контакты | RMC De Luxe',
    description: 'Свяжитесь с нами, чтобы узнать больше о наших услугах и предложениях. Телефон: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Адрес: Deira, Baniyas road, Twin Towers, 20 floor office number 10',
    images: [
      {
        url: 'https://rmcestate.uz/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Контактная информация',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Контакты | RMC De Luxe',
    description: 'Свяжитесь с нами, чтобы узнать больше о наших услугах и предложениях. Телефон: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Адрес: Deira, Baniyas road, Twin Towers, 20 floor office number 10',
    images: [
      {
        url: 'https://rmcestate.uz/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Контактная информация',
      },
    ],
  },
};

const metadataEn = {
  title: 'Contact | RMC De Luxe',
  description: 'Get in touch with us to learn more about our services and offers. We are always ready to answer your questions! Phone: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Address: Deira, Baniyas road, Twin Towers, 20 floor office number 10',
  keywords: ['contact', 'communication', 'services', 'company', 'email', 'phone', 'address'],
  openGraph: {
    title: 'Contact | RMC De Luxe',
    description: 'Get in touch with us to learn more about our services and offers. Phone: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Address: Deira, Baniyas road, Twin Towers, 20 floor office number 10',
    images: [
      {
        url: 'https://rmcestate.uz/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Deira, Baniyas road, Twin Towers, 20 floor office number 10',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | RMC De Luxe',
    description: 'Get in touch with us to learn more about our services and offers. Phone: +998 (78) 555 87 87, Email: rmcrmc603@gmail.com, Address: Deira, Baniyas road, Twin Towers, 20 floor office number 10',
    images: [
      {
        url: 'https://rmcestate.uz/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Deira, Baniyas road, Twin Towers, 20 floor office number 10',
      },
    ],
  },
};

export async function generateMetadata({ params }: InvestmentDubaiPageProps): Promise<Metadata> {
  const metaData = params?.locale === 'ru' ? metadataRu : metadataEn;

  return metaData;
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
          "areaServed": "RU",
          "availableLanguage": "ru"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Deira, Baniyas road, Twin Towers, 20 floor office number 10",
          "addressLocality": "Dubai",
          "postalCode": "000000",
          "addressCountry": "UZ"
        }
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

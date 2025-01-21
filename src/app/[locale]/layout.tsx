import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './_styles/globals.css';
import Header from '@/src/app/[locale]/_components/Header/Header';
import Footer from '@/src/app/[locale]/_components/Footer/Footer';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import CookieConsent from "./_components/CookieConsent";

const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700', '900'] });


export const metadata: Metadata = {
  title: 'RMC De Luxe | Real Estate Sales, Rentals & Property Management in Dubai',
  description:
    'RMC De Luxe offers comprehensive real estate services in Dubai: property sales and purchases, rentals and management, plus consultations on company formation, account opening, and mortgage processing.',
  keywords:
    'Dubai real estate, property sales, property purchases, rentals, property management, company formation, mortgage processing, RMC De Luxe',
  authors: [{ name: 'RMC De Luxe', url: 'https://rmcdeluxe.com' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rmcdeluxe.com',
    title: 'RMC De Luxe | Real Estate Sales, Rentals & Property Management in Dubai',
    description:
      'Comprehensive real estate services: property sales and purchases, rentals, management, and guidance on company formation, account setup, and mortgage processes in Dubai.',
    siteName: 'RMC De Luxe',
    images: [
      {
        url: 'https://rmcdeluxe.com/og-image.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'RMC De Luxe - Dubai Real Estate Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RMC De Luxe | Real Estate Sales, Rentals & Property Management in Dubai',
    description:
      'Full real estate solutions in Dubai: sales and purchases, rental services, and expert support for company formation and mortgage processing.',
    images: 'https://rmcdeluxe.com/og-image.jpg?v=2',
  },
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://rmcdeluxe.com',
    languages: {
      en: '/en',
      ru: '/ru',
      uz: '/uz',
    },
  },
};

export type Locales = 'ru' | 'en' | 'uz';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string };
}>) {
  // Force English for this example or auto-detect based on params
  // Here we keep it flexible but default to English
  const locale: Locales =
    params?.locale === 'en' ? 'en' :
    params?.locale === 'uz' ? 'uz' :
    'ru';

  unstable_setRequestLocale(locale);

  const messages = await getMessages({ locale });

  // You can also update your structured data to be in English only if you wish
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "RMC De Luxe",
    "url": "https://rmcdeluxe.com",
    "description": "We provide property sales, purchases, rentals, management, and advisory services for company formation and mortgages in Dubai.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dubai Marina, Marina Plaza, 25th floor",
      "addressLocality": "Dubai",
      "postalCode": "00000",
      "addressCountry": "AE"
    },
    "telephone": "+97142255220",
    "openingHours": "Mo-Fr 09:00-18:00",
    "image": "https://rmcdeluxe.com/og-image.jpg?v=2",
    "priceRange": "AED 500,000 - 15,000,000",
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Real Estate Sales and Purchases",
        "itemOffered": {
          "@type": "Apartment",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dubai Marina",
            "addressCountry": "AE"
          }
        }
      },
      {
        "@type": "Offer",
        "name": "Rentals and Property Management",
        "itemOffered": {
          "@type": "RealEstateListing",
          "description": "Comprehensive rental and management services for residential and commercial properties."
        }
      },
      {
        "@type": "Offer",
        "name": "Company Formation & Mortgage Consulting",
        "itemOffered": {
          "@type": "FinancialService",
          "description": "Guidance on business setup, bank accounts, and mortgage processes in Dubai."
        }
      }
    ]
  };

  return (
    <html lang={locale}>
      <body className={lato.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />

          <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />

          {/* Example FAQ structured data (English only) */}
          <Script
            id="faq-structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What are the main real estate services offered by RMC De Luxe in Dubai?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "RMC De Luxe specializes in property sales, purchases, rentals, and property management. We also offer expert consultations on company formation, account opening, and mortgage processes in Dubai."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I get started with renting or selling a property in Dubai?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Simply contact us with your requirements, and our team will provide personalized recommendations and property tours. We handle everything from paperwork to property management."
                    }
                  }
                ]
              })
            }}
          />

          <Script
            id="yandex-metrika"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                  k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(98684651, "init", {
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true,
                  webvisor: true
                });
              `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <div>
                  <img src="https://mc.yandex.ru/watch/98684651" style="position: absolute; left: -9999px;" alt="" />
                </div>
              `,
            }}
          />
          <CookieConsent locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// src/app/[locale]/RootLayout.tsx или layout.tsx

import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './_styles/globals.css';
import Header from '@/src/app/[locale]/_components/Header/Header';
import Footer from '@/src/app/[locale]/_components/Footer/Footer';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// Используем шрифт Jost
const jost = Jost({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Rmc',
  description: 'Rmc',
};

// Экспортируем тип Locales
export type Locales = 'ru' | 'uz' | 'en';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string };
}>) {
  const locale: Locales = params?.locale === 'uz' ? 'uz' : params?.locale === 'en' ? 'en' : 'ru';

  unstable_setRequestLocale(locale);

  // Получаем сообщения для текущей локали
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={jost.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale}/>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

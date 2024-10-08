import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './_styles/globals.css';
import Header from '@/src/app/[locale]/_components/Header/Header';
import Footer from '@/src/app/[locale]/_components/Footer/Footer';

// Используем шрифт Jost
const jost = Jost({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Rmc',
  description: 'Rmc',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale}>
      <body className={jost.className}>
        <div className='flex flex-col w-full mx-auto'>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}

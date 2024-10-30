// src/app/[locale]/_layout.tsx

import '@/src/app/[locale]/_styles/globals.css';

export const metadata = {
    title: 'RMC De Luxe – Оценка, аренда и продажа недвижимости в ОАЭ',
    description: 'Профессиональные услуги по оценке, аренде и продаже недвижимости в ОАЭ от RMC De Luxe. Надежный партнер для физических и корпоративных клиентов.',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
}
export const dynamic = 'force-dynamic';

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  return (
    <html lang="en" className='p-0 m-0 h-full w-full'>
      <body className='h-full w-full p-0 m-0'>{children}</body>
    </html>
  );
}

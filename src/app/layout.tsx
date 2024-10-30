// src/app/[locale]/_layout.tsx

import '@/src/app/[locale]/_styles/globals.css';

export const metadata = {
    title: 'RMC Admin Dashboard',
    description: 'RMC Admin Dashboard',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
}

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  return (
    <html lang="en" className='p-0 m-0 h-full w-full'>
      <body className='h-full w-full p-0 m-0'>{children}</body>
    </html>
  );
}

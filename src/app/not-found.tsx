import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
// import logo from "@/public/images/errors/Logo_black_text.png";
import '@/src/app/[locale]/_styles/globals.css';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div
      className="relative flex items-end justify-start h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(/images/errors/404.png)`,
      }}
    >
      <div className="p-6 mb-8 ml-6 bg-opacity-80 bg-gray-800 rounded-lg">
        <h2 className="text-[35px] mdx:text-[65px] xl:text-[80px] font-semibold text-white mb-2">
          {t('title', { siteName: 'RMC De Luxe' })}
        </h2>
        <p className=" text-white mb-6 text-[16px] mdx:text-[20px]">
          {t('description')}
        </p>
        <Link href="/" className="px-4 py-2 bg-[#E1AF93] text-white font-semibold text-[17px] hover:bg-[#EAC7B4] transition w-[180px] h-[49px]">
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}

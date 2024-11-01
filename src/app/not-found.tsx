import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import '@/src/app/[locale]/_styles/globals.css';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div
      className="relative flex items-end justify-start h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(/images/errors/404.png)`,
      }}
    >
      <div className="absolute top-0 left-[35%] xl:left-0 w-[142px] xl:w-[175px] mt-6 xl:ml-[48px] 4xl:ml-[214px]">
        <div className="w-full h-full max-h-[60px] max-w-[175px]">
          <Image
            src="/images/errors/Logo.png"
            alt="RMC De Luxe Logo"
            width={178}
            height={60}
            quality={100}
            objectFit="cover"
            className="w-[142px] mdx:w-[178px] h-[48px] mdx:h-[60px]"
            priority
          />
        </div>
      </div>
      <div className="p-6 mb-8 ml-6 4xl:ml-[214px] max-w-[180px] mdx:max-w-[233px] w-full">
        <h2 className="text-[35px] mdx:text-[65px] xl:text-[80px] font-semibold text-white mb-2">
          {t('title', { siteName: 'RMC De Luxe' })}
        </h2>
        <p className="text-white mb-6 text-[16px] mdx:text-[20px] whitespace-nowrap">
          {t('description')}
        </p>
        <Link href="/">
          <div className=" bg-corporate text-white font-semibold text-[17px] hover:bg-[#EAC7B4] transition w-[180px] mdx:w-[223px] flex justify-center items-center h-[49px]">
            {t('backHome')}
          </div>
        </Link>
      </div>
    </div>
  );
}

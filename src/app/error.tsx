'use client';

import { useTranslations } from 'next-intl';
import '@/src/app/[locale]/_styles/globals.css';
import React from 'react';
import Image from "next/image";
import error1 from "@/public/images/errors/505.png";
import logo from "@/public/images/errors/rmclogo.png";
import Link from 'next/link';


export default function GlobalError() {
  const t = useTranslations('error-page');

  return (
    <html className="py-[20px] max-h-screen">
      <body className="h-full flex flex-col justify-between items-center bg-gray-100 px-[18px]">
        <div className='max-w-[532px] w-full flex flex-col items-center space-y-6'>
          <div className='w-full flex justify-center'>
            <Image
              src={logo}
              quality={100}
              alt="Логотип"
              className="object-contain max-w-[172px] mdx:max-w-[267px]"
            />
          </div>
          <div>
            <div className='w-full flex justify-center'>
              <Image
                src={error1}
                quality={100}
                alt="error 500"
                className="object-contain"
              />
            </div>
            <div className='w-full flex flex-col items-center justify-center'>
              <h1 className='text-[30px] mdx:text-[45px] xl:text-[55px] font-medium text-corporate'>{t('text-1')}</h1>
              <h4 className='w-full xl:max-w-[398px] text-[16px] mdx:text-[20px] xl:text-[20px] text-center mt-[8px]'>
                {t('text-2')}
              </h4>
            </div>
          </div>
          <Link href="/">
            <button
              className="mt-4 px-4 py-2 bg-corporate text-white hover:bg-hover_corporate transition w-[223px] h-[49px] font-semibold"
            >
              {t('goHome')}
            </button>
          </Link>
        </div>
      </body>
    </html>
  );
}


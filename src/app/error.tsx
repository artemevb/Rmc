'use client';

import '@/src/app/[locale]/_styles/globals.css';
import React from 'react';
import Image from "next/image";
import error1 from "@/public/images/errors/rmclogo.png";
import logo from "@/public/images/errors/Logo_black_text.png";
import { useRouter } from 'next/navigation';

export default function GlobalError({
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <html className="py-[20px] max-h-screen">
      <body className="h-full flex flex-col justify-between items-center bg-gray-100 px-[18px]">
        <div className='max-w-[532px] w-full flex flex-col items-center space-y-6'>
          <div className='w-full flex justify-center'>
            <Image
              src={logo}
              quality={100}
              alt="Логотип"
              className="object-contain max-w-[142px] mdx:max-w-[177px]"
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
              <h1 className='text-[30px] mdx:text-[45px] xl:text-[55px] font-medium text-corporate'>Ошибка сервера</h1>
              <h4 className='w-full xl:max-w-[398px] text-[16px] mdx:text-[20px] xl:text-[20px] text-center mt-[8px]'>
                Что-то пошло не так. Но мы уже занимаемся решением этой проблемы
              </h4>
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-corporate text-white hover:bg-hover_corporate transition w-[223px] h-[49px] font-semibold"
          >
            На главную
          </button>
        </div>
      </body>
    </html>
  );
}


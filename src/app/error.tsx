'use client';

import '@/src/app/[locale]/_styles/globals.css';
import React, { useEffect } from 'react';
import Image from "next/image";
import error1 from "@/public/images/errors/505.png";
import logo from "@/public/images/errors/Logo_black_text.png";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Логирование ошибки в сервис отчётности ошибок
    console.error('Ошибка:', error);
  }, [error]);

  return (
    <html className=" py-[20px] max-h-screen">
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
              <h1 className='text-[30px] mdx:text-[45px] xl:text-[55px] font-medium text-[#E1AF93]'>Ошибка сервера</h1>
              <h4 className='w-full xl:max-w-[398px] text-[16px] mdx:text-[20px] xl:text-[20px] text-center mt-[8px]'>Что-то пошло не так. Но мы уже занимаемся решением этой проблемы</h4>
            </div>
          </div>
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 bg-[#E1AF93] text-white hover:bg-[#EAC7B4] transition w-[223px] h-[49px] font-semibold"
          >
            На главную
          </button>
        </div>
      </body>
    </html>
  );
}

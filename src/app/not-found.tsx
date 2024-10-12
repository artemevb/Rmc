"use client";

import Image from "next/image";
import notfound from "@/public/images/errors/404.png";
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('not-found');

  return (
    <div className="relative w-full h-screen">
      {/* Контейнер для изображения */}
      <div className="absolute inset-0 z-0">
        <Image
          quality={100}
          src={notfound}
          fill // Используем свойство fill вместо layout="fill"
          style={{ objectFit: "cover" }} // Используем style для objectFit
          alt="Not Found Image"
          priority // Опционально: загрузка изображения с высоким приоритетом
        />
      </div>
      
      {/* Контейнер для текста */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="mt-4 text-lg">{t('message')}</p>
      </div>
    </div>
  );
}

"use client";

import Image from 'next/image';
import eyes from '../../../../../public/svg/eyes-gray.svg';
import { FC } from 'react';

// Интерфейс для пропсов компонента
interface NewPageProps {
  news: News | null;
  locale: string;
}

// Интерфейс для объекта новости
interface News {
  date: string;
  viewCounter?: number;
  title: { [key: string]: string };
  content?: ContentItem[];
}

// Тип для элементов массива content
type ContentItem = TextBlock | ImageBlock;

// Интерфейс для текстового блока
interface TextBlock {
  _type: 'textBlock';
  subtitle?: { [key: string]: string };
  description?: { [key: string]: string };
}

// Интерфейс для блока изображения
interface ImageBlock {
  _type: 'image';
  imageUrl: string;
}

const NewPage: FC<NewPageProps> = ({ news, locale }) => {
  if (!news) return <div>Loading...</div>;

  // Функция для форматирования текста с переводами строк
  const formatTextWithNewlines = (text: string): JSX.Element[] => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  // Функция для форматирования даты
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с нуля
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="w-full max-w-[954px] mx-auto flex gap-6 px-4">
      {/* Main news content */}
      <div className="w-full">
        <div className="mt-4">
          {news.date && (
            <div className="flex items-center gap-[12px] mdx:gap-[20px] w-full h-[23px]">
              <p className="text-[#E1AF93] text-[16px] mdx:text-[18px] xl:text-[20px]">
                {formatDate(news.date)}
              </p>
              <hr className="w-[1px] h-full bg-[#B3B3B3] mx-2" />
              {news.viewCounter !== undefined && (
                <p className="text-[#B3B3B3] text-[16px] mdx:text-[18px] xl:text-[20px] flex items-center gap-[7px]">
                  <Image
                    src={eyes}
                    width={24}
                    height={24}
                    quality={100}
                    alt="Eyes Icon"
                    className="w-full h-full object-cover"
                  />
                  {news.viewCounter}
                </p>
              )}
            </div>
          )}

          {news.title && news.title[locale] && (
            <h1 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium mb-[16px] text-[#252324] leading-[38px] mdx:leading-[45px] xl:leading-[70px]">
              {formatTextWithNewlines(news.title[locale])}
            </h1>
          )}
        </div>

        {/* Rendering content array */}
        {news.content?.map((item, index) => (
          <div className="mb-[30px] mdx:mb-[40px] xl:mb-[60px]" key={index}>
            {item._type === 'textBlock' && (
              <>
                {item.subtitle && item.subtitle[locale] && (
                  <h3 className="text-[30px] mdx:text-[45px] xl:text-[55px] lh font-medium text-[#252324]">
                    {formatTextWithNewlines(item.subtitle[locale])}
                  </h3>
                )}
                {item.description && item.description[locale] && (
                  <div>
                    <p className="text-[16px] mdx:text-[20px] py-[15px]">
                      {formatTextWithNewlines(item.description[locale])}
                    </p>
                  </div>
                )}
              </>
            )}

            {item._type === 'image' && item.imageUrl && (
              <div className="mt-[30px] mb-[10px] flex flex-row justify-center">
                <Image
                  src={item.imageUrl}
                  width={1500}
                  height={1500}
                  quality={100}
                  alt="News Image"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewPage;

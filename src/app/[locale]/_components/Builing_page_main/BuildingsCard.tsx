'use client';
import React from 'react';
import Image from 'next/image';

interface NewCardProps {
  subtitle: string;       // Название новостройки (или подзаголовок)
  imageSrc: string;       // Ссылка на изображение
  coast: string;          // Цена
  buildingType?: string;  // Тип новостройки (optional, т.к. не всегда может быть заполнен)
}

const NewCard: React.FC<NewCardProps> = ({ coast, subtitle, imageSrc, buildingType }) => {
  return (
    <div className="w-full bg-white h-full flex flex-col overflow-hidden ">
      {/* Изображение */}
      <div className="relative w-full">
        <Image
          src={imageSrc}
          width={1000}
          height={1000}
          quality={100}
          alt="Изображение новостройки"
          className="w-full h-auto object-cover xl:max-w-[467px] min-h-[300px] mdx:min-h-[400px] xl:min-h-[500px]"
        />
      </div>

      {/* Текстовая часть */}
      <div className="w-full flex flex-col gap-2">
        <h3 className="text-[20px] mdx:text-[24px] xl:text-[28px] font-semibold text-gray-900">
          {subtitle}
        </h3>
        <p className="text-[16px] mdx:text-[18px] text-gray-700">
          {coast}
        </p>
        {buildingType && (
          <p className="text-[14px] mdx:text-[16px] text-gray-600">
            {buildingType}
          </p>
        )}
      </div>
    </div>
  );
};

export default NewCard;

"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from "next-intl";
import { ResidentialComplex } from '../NewBuildings/types';
import Link from 'next/link';

// Импортируем нашу обновлённую карточку
import NewCard from '../Builing_page_main/BuildingsCard'; // путь может отличаться, если у вас другой файл

function getNameField(locale: 'ru' | 'en' | 'uz'): 'name_ru' | 'name_en' | 'name_uz' {
  switch (locale) {
    case 'uz':
      return 'name_uz';
    case 'en':
      return 'name_en';
    default:
      return 'name_ru';
  }
}

interface NewsCompProps {
  locale: 'ru' | 'en' | 'uz'; // предполагаем, что Locales = 'ru' | 'en' | 'uz'
  data: ResidentialComplex[];
}

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const OtherBuildingsSlider: FC<NewsCompProps> = ({ locale, data }) => {
  const t = useTranslations('Building_page_main.Other');

  // Настройки слайдера
  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className='w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8'>
      <h2 className='text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-medium'>
        {t('title')} {/* "Вам может быть интересно", "Другие комплексы" и т.д. */}
      </h2>
      <div className='w-full h-auto'>
        <Slider {...settings} className='h-auto w-full'>
        {data.map((item) => {
            const fieldName = getNameField(locale);
            const buildingType = item.type ? item.type[fieldName] : undefined;

            const price = item.price || t('noPrice');
            const subtitle = item.subtitle?.[locale] || t('noTitle');

            return (
              <div className='px-[10px] xl:max-h-[700px] max-h-full' key={item._id}>
                <Link href={`/${locale}/new-buildings/${item.slug?.current || '#'}`} passHref>
                  <NewCard
                    coast={price}
                    subtitle={subtitle}
                    imageSrc={item.mainImage?.asset?.url || '/fallback.jpg'} 
                    buildingType={buildingType}
                  />
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default OtherBuildingsSlider;

"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FC } from 'react';
import BuildingsCard from '../Builing_page_main/BuildingsCard';
import dynamic from 'next/dynamic';
import { useTranslations } from "next-intl";
import { ResidentialComplex } from '../NewBuildings/types';
import Link from 'next/link';

interface NewsCompProps {
  locale: string;
  data: ResidentialComplex[];
}

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const NewsComp: FC<NewsCompProps> = ({ locale, data }) => {
  const t = useTranslations('Building_page_main.Other');

  // Настройки слайдера
  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <div className='w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 mb-[90px] mdx:mb-[150px] 2xl:mb-[190px]'>
      <h2 className='text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-medium'>
        {t("title")}
      </h2>
      <div className='w-full h-auto'>
        <Slider {...settings} className='h-auto w-full'>
          {data.map((item) => (
            <div className='px-[10px] xl:max-h-[600px] max-h-full' key={item._id}>
              <Link href={`/${locale}/new-buildings/${item.slug?.current || '#'}`} passHref>
                  <BuildingsCard
                    coast={item.price || 'от неизвестной суммы'}
                    subtitle={item.subtitle?.[locale as 'ru' | 'uz' | 'en'] || 'Без названия'}
                    imageSrc={item.mainImage?.asset?.url || 'нет фото'}
                  />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewsComp;

// components/Gallery.tsx
"use client";

import React from "react";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from '@/src/sanity/lib/client';
import { useTranslations } from 'next-intl';
import ReactPlayer from 'react-player';
import arrowleft from "@/public/svg/ArrowLeftSlider.png";
import arrowright from "@/public/svg/ArrowRightSlider.png";
import { GalleryData, GalleryItem } from '@/src/sanity/typesGallery';

// Инициализация imageUrlBuilder для изображений
const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

// Динамический импорт Slider с отключенным SSR
const Slider = dynamic(() => import('react-slick'), { ssr: false });

// Интерфейсы для стрелок
interface CustomArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const NextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div className="absolute top-[-100px] right-2 z-10 cursor-pointer" onClick={onClick}>
        <Image src={arrowright} alt="Следующий" width={70} height={70} />
    </div>
);

const PrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div className="absolute top-[-100px] right-[85px] z-10 cursor-pointer" onClick={onClick}>
        <Image src={arrowleft} alt="Предыдущий" width={70} height={70} />
    </div>
);

// Интерфейс для настроек слайдера
interface SliderSettings {
    arrows: boolean;
    dots: boolean;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    nextArrow: React.ReactElement;
    prevArrow: React.ReactElement;
    responsive: {
        breakpoint: number;
        settings: {
            slidesToShow: number;
            slidesToScroll: number;
            arrows: boolean;
        };
    }[];
}

interface GalleryProps {
    data: GalleryData;
}

const Gallery: React.FC<GalleryProps> = ({ data }) => {
    const t = useTranslations('Building_page_main.Gallery');

    // Проверка на наличие данных
    if (!data || !data.gallery_3 || data.gallery_3.length === 0) {
        return null; // Компонент не будет отображаться, если данных нет
        // Альтернативно, можно отобразить сообщение:
        // return <div className="text-center text-gray-500">{t("noGalleryData")}</div>;
    }

    const settings: SliderSettings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 968,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className="w-full h-full flex flex-col mx-auto max-w-[1440px]">
            <div className="relative max-2xl:mx-2.5">
                <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium pb-10 leading-[38px] mdx:leading-[50px] xl:leading-[70px] max-mdx:max-w-[324px]">
                    {t('title')}
                </h2>
                <Slider {...settings}>
                    {data.gallery_3.map((item: GalleryItem, index: number) => {
                        // Уникальный ключ для элемента
                        const key = item._type === 'image' ? item.asset?._id || index : item.url || index;

                        return (
                            <div key={key} className="px-[4px] mdx:px-[10px] w-full h-full">
                                {/* Родительский контейнер для изображения или видео с фиксированным соотношением сторон */}
                                <div className="w-full aspect-video overflow-hidden relative">
                                    {item._type === "image" && item.asset ? (
                                        <Image
                                            src={urlFor(item.asset).url() || "/images/default-image.png"}
                                            alt={`Gallery item ${index + 1}`}
                                            layout="fill"
                                            objectFit="cover"
                                            quality={100}
                                        />
                                    ) : item._type === "image" && !item.asset ? (
                                        <div className="text-red-500">
                                            {t("imageLoadError", { index: index + 1 })} {/* Добавьте соответствующий ключ в файл перевода */}
                                        </div>
                                    ) : item._type === "youtubeVideo" && item.url ? (
                                        <div className="absolute inset-0">
                                            <ReactPlayer
                                                url={item.url}
                                                controls
                                                width="100%"
                                                height="100%"
                                                className="react-player"
                                                config={{
                                                    youtube: {
                                                        playerVars: { modestbranding: 1 },
                                                    },
                                                }}
                                            />
                                        </div>
                                    ) : item._type === "youtubeVideo" && !item.url ? (
                                        <div className="text-red-500">
                                            {t("videoLoadError", { index: index + 1 })}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
};

export default Gallery;


// components/Gallery.tsx
"use client";

import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from '@/src/sanity/lib/client';
import { useTranslations } from 'next-intl';
import ReactPlayer from 'react-player';
import arrowleft from "@/public/svg/ArrowLeftSlider.png";
import arrowright from "@/public/svg/ArrowRightSlider.png";
import { GalleryData, GalleryItem, GalleryImage } from '@/src/sanity/typesGallery';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

const Slider = dynamic(() => import('react-slick'), { ssr: false });

interface CustomArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// Компонент кастомной следующей стрелки
const NextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div className="absolute top-[-100px] right-2 z-10 cursor-pointer" onClick={onClick}>
        <Image src={arrowright} alt="Next arrow icon" width={70} height={70} />
    </div>
);

// Компонент кастомной предыдущей стрелки
const PrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div className="absolute top-[-100px] right-[85px] z-10 cursor-pointer" onClick={onClick}>
        <Image src={arrowleft} alt="Previous arrow icon" width={70} height={70} />
    </div>
);

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
    data?: GalleryData;
}

// Эта функция проверяет, является ли GalleryItem типом GalleryImage с непустым asset.
const isGalleryImageWithAsset = (item: GalleryItem): item is GalleryImage & { asset: NonNullable<GalleryImage['asset']> } =>
    item._type === 'image' && item.asset !== null;

const Gallery: React.FC<GalleryProps> = ({ data }) => {
    const t = useTranslations('Building_page_main.Gallery');

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Ранний возврат, если данных нет
    if (!data || !data.gallery_3 || data.gallery_3.length === 0) {
        return null;
    }

    // **Подготовка изображений для Lightbox с использованием функции-предиката**
    const images = data.gallery_3
        .filter(isGalleryImageWithAsset) // Используем функцию-предикат для фильтрации изображений с валидным asset
        .map((item, index) => ({
            src: urlFor(item.asset).url() || "/public/images/new-buildings/Building4.png",
            alt: `Gallery item ${index + 1}`,
        }));

    // Настройки для Slider
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

    // Функция для открытия Lightbox на определённом индексе
    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className="w-full h-full flex flex-col mx-auto max-w-[1440px] mt-[120px] mdl:mt-[150px] xl:mt-[200px]">
            <div className="relative max-2xl:mx-2.5">
                <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium pb-10 leading-[38px] mdx:leading-[50px] xl:leading-[70px] max-mdx:max-w-[324px]">
                    {t('title')}
                </h2>
                <Slider {...settings}>
                    {data.gallery_3.map((item: GalleryItem, index: number) => {
                        // **Генерация уникального ключа для каждого элемента**
                        // Предпочтительно использовать уникальный идентификатор; при отсутствии использовать индекс
                        const key = item._type === 'image' ? item.asset?._id || index : item.url || index;

                        return (
                            <div key={key} className="px-[4px] mdx:px-[10px] w-full h-full">
                                {/* Контейнер с фиксированным соотношением сторон для изображения или видео */}
                                <div className="w-full aspect-video overflow-hidden relative">
                                    {item._type === "image" && item.asset ? (
                                        // **Отображение изображения**
                                        <Image
                                            src={urlFor(item.asset).url() || "/images/default-image.png"}
                                            alt={`Gallery item ${index + 1}`}
                                            layout="fill"
                                            objectFit="cover"
                                            quality={100}
                                            className="cursor-pointer"
                                            onClick={() => openLightbox(index)}
                                        />
                                    ) : item._type === "image" && !item.asset ? (
                                        // **Обработка отсутствующего asset для изображения**
                                        <div className="text-red-500">
                                            {t("imageLoadError", { index: index + 1 })}
                                        </div>
                                    ) : item._type === "youtubeVideo" && item.url ? (
                                        // **Отображение YouTube видео**
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
                                        // **Обработка отсутствующего URL для видео**
                                        <div className="text-red-500">
                                            {t("videoLoadError", { index: index + 1 })}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </Slider>

                {/* Компонент Lightbox для изображений */}
                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    slides={images}
                    index={currentIndex}
                    plugins={[Zoom]}
                />
            </div>
        </div>
    );
};

export default Gallery;

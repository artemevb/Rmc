"use client"

import React from "react";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/src/sanity/lib/client';
import { SanityImageAssetDocument, SanityFileAssetDocument } from '@/src/sanity/types'; // Импорт типов
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useTranslations } from 'next-intl';
import ReactPlayer from 'react-player';

// Константы проекта Sanity
const PROJECT_ID = 'cog5nktd'; // Замените на ваш projectId
const DATASET = 'production'; // Замените на ваш dataset

// Инициализация imageUrlBuilder для изображений
const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

// Функция для построения URL файлов
const getFileUrl = (asset: SanityFileAssetDocument): string | undefined => {
    if (!asset || !asset._ref) return undefined;
    const refParts = asset._ref.split('-');
    if (refParts.length < 3) return undefined;
    const extension = refParts.pop();
    const assetId = refParts.slice(1).join('-');
    return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${assetId}.${extension}`;
};

// Импорт стрелок для слайдера
import arrowleft from "@/public/svg/ArrowLeftSlider.png";
import arrowright from "@/public/svg/ArrowRightSlider.png";

// Динамический импорт Slider с отключенным SSR
const Slider = dynamic(() => import('react-slick'), { ssr: false });

// Определение интерфейса для стрелок
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

// Определение интерфейса для элементов галереи
interface GalleryItem {
    _type: 'image' | 'file';
    asset: SanityImageAssetDocument | SanityFileAssetDocument;
}

// Определение интерфейса для настроек слайдера
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
    data: { gallery_3: GalleryItem[] };
}

export default function Gallery({  data }: GalleryProps) {
    const t = useTranslations('Building_page_main.Gallery');

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
                    {data.gallery_3.map((item, index) => (
                        <div key={item.asset._id || index} className="px-[4px] mdx:px-[10px] w-full h-full ">
                            <div className="w-full h-full max-h-[650px] overflow-hidden">
                                {item._type === "image" && (
                                    <Image
                                        src={urlFor(item.asset).url()}
                                        alt={`Gallery item ${index + 1}`}
                                        width={3000}
                                        height={650}
                                        quality={100}
                                        className="object-cover w-full h-full"
                                        layout="responsive"
                                    />
                                )}
                                {item._type === "file" && (
                                    <div className="h-full xl:max-h-[380px]">
                                        {getFileUrl(item.asset as SanityFileAssetDocument) ? (
                                            <ReactPlayer
                                                url={getFileUrl(item.asset as SanityFileAssetDocument)!} // Утверждаем, что не null
                                                controls
                                                width="100%"
                                                height="100%"
                                            />
                                        ) : (
                                            <div className="text-red-500">
                                                Не удалось загрузить видео для элемента {index + 1}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

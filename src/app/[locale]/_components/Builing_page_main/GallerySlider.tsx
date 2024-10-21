"use client"

import React from "react";
import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image, { StaticImageData } from 'next/image';
// import Link from 'next/link';
import { useTranslations } from 'next-intl';

import build1 from "@/public/images/main_buildings/gallerySlider1.png";
import build2 from "@/public/images/main_buildings/gallerySlider2.png";


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

// interface local {
//     locale: string;
// }

const NextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
        className="absolute top-[-100px] right-2 z-10 cursor-pointer "
        onClick={onClick}
    >
        <Image
            src={arrowright}
            alt="Следующий"
            width={70}
            height={70}
        />
    </div>
);

const PrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
        className="absolute top-[-100px] right-[85px] z-10 cursor-pointer"
        onClick={onClick}
    >
        <Image
            src={arrowleft}
            alt="Предыдущий"
            width={70}
            height={70}
        />
    </div>
);

// Определение интерфейса для элементов недвижимости
interface EquipmentItem {
    image: StaticImageData;
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
// export default function Banner({ locale }: local) {
export default function Gallery() {
    const t = useTranslations('Building_page_main.Gallery');

    const equipmentData: EquipmentItem[] = [
        {
            image: build1
        },
        {
            image: build2
        }
    ];

    const settings: SliderSettings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 2, // По умолчанию показывать 3 слайда
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 968, // Для экранов шириной до 468px
                settings: {
                    slidesToShow: 1, // Показывать 1 слайд
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
                    {equipmentData.map((item, index) => (
                        <div key={index} className="px-[4px] mdx:px-[10px] w-full h-full ">
                            <div className="w-full h-full max-h-[650px] overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={'Buildings'}
                                    quality={100}
                                    className="object-cover w-full h-full xl:min-h-[450px]"
                                    layout="responsive"
                                />

                            </div>
                        </div>
                    ))}
                </Slider>
                {/* <div className="flex w-full justify-center mt-10">
                    <Link href={`/${locale}/new-buildings-tashkent`}>
                        <button className="border flex items-center justify-center py-3 bg-[#E1AF93] hover:bg-[#EAC7B4] text-white font-semibold text-lg w-[223px]">
                            {t('button-more')}
                        </button>
                    </Link>
                </div> */}
            </div>
        </div>
    );
}

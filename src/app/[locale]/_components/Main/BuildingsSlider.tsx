"use client"

import React from "react";
import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import build1 from "@/public/images/main/whyus/slide1.png";
import build2 from "@/public/images/main/whyus/slide1.png";
import build3 from "@/public/images/main/whyus/slide1.png";
import build4 from "@/public/images/main/whyus/slide1.png";

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
    title: string;
    description: string;
    image: StaticImageData;
    price: string;
    slug: string;
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

export default function Banner() {
    const t = useTranslations('Main.Buildings');

    const equipmentData: EquipmentItem[] = [
        {
            title: "Safa One",
            description: "Luxury Apartment",
            image: build1,
            price: "от $1,900,000",
            slug: "1-safa-one",
        },
        {
            title: "Safa Two",
            description: "Modern Apartment",
            image: build2,
            price: "от $399,000",
            slug: "2-safa-two",
        },
        {
            title: "Peninsula Two",
            description: "Urban Living",
            image: build3,
            price: "от $245,000",
            slug: "3-peninsula-two",
        },
        {
            title: "Marina Vista",
            description: "Seaside Apartment",
            image: build4,
            price: "от $612,000",
            slug: "4-marina-vista",
        },
    ];

    const settings: SliderSettings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // По умолчанию показывать 3 слайда
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1000, // Для экранов шириной до 1000px
                settings: {
                    slidesToShow: 2, // Показывать 2 слайда
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 468, // Для экранов шириной до 468px
                settings: {
                    slidesToShow: 1, // Показывать 1 слайд
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className="w-full h-auto flex flex-col mx-auto max-w-[1440px]">
            <div className="relative mx-2.5">
                <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium pb-10">
                    Новостройки{t('title')}
                </h2>
                <Slider {...settings}>
                    {equipmentData.map((item, index) => (
                        <div key={index} className="px-2.5 mdx:px-1.5">
                            <div className="relative flex flex-col items-center max-h-[600px] overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover w-full h-full"
                                    layout="responsive"
                                    priority={index < 2} // Оптимизация загрузки первых изображений
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent">
                                    <h3 className="text-xl mdx:text-2xl text-3xl font-medium text-white">{item.title}</h3>
                                    <p className="text-base mdx:text-lg text-white">{item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="flex w-full justify-center mt-10">
                    <Link href="/buildings">
                        <button className="border flex items-center justify-center py-3 bg-[#E1AF93] hover:bg-[#EAC7B4] text-white font-semibold text-lg w-[223px]">
                            Смотреть все
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Banner.tsx
"use client"

import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { GET_RESIDENTIAL_COMPLEXES } from '../NewBuildings/queries';
import { ResidentialComplex } from '../NewBuildings/types';
import { client } from '@/src/sanity/lib/client';

import arrowleft from "@/public/svg/ArrowLeftSlider.png";
import arrowright from "@/public/svg/ArrowRightSlider.png";

const Slider = dynamic(() => import('react-slick'), { ssr: false });

type Locale = 'ru' | 'uz' | 'en';

interface CustomArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface LocalProps {
    locale: Locale;
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

const Banner: React.FC<LocalProps> = ({ locale }) => {
    const t = useTranslations('Main.Buildings');
    const [complexes, setComplexes] = useState<ResidentialComplex[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: ResidentialComplex[] = await client.fetch(GET_RESIDENTIAL_COMPLEXES);
                setComplexes(data);
            } catch (err) {
                console.error("Ошибка при получении данных:", err); // Логирование err для отладки
                setError("Не удалось загрузить данные.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const settings: SliderSettings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 468,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    if (loading) {
        return <div className="text-center py-20">{t('loading')}</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    return (
        <div className="w-full h-auto flex flex-col mx-auto max-w-[1440px]">
            <div className="relative mx-2.5">
                <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium pb-10">
                    {t('title')}
                </h2>
                {complexes.length > 0 ? (
                    <Slider {...settings}>
                        {complexes.map((complex) => (
                            <div key={complex._id} className="px-2.5 mdx:px-1.5">
                                <Link href={`/${locale}/new-buildings/${complex.slug?.current || '#'}`} passHref>
                                    <div className="relative flex flex-col items-center max-h-[600px] max-w-[467px] overflow-hidden">
                                        {complex.mainImage?.asset?.url ? (
                                            <Image
                                                src={complex.mainImage.asset.url}
                                                alt={complex.mainImage.alt?.[locale as keyof typeof complex.mainImage.alt] || complex.subtitle?.[locale as keyof typeof complex.subtitle] || "Изображение отсутствует"}
                                                className="object-cover w-full h-full"
                                                width={467}
                                                height={600}
                                                priority={false}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                {t('noImage')}
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent">
                                            <h3 className="text-[28px] mdx:text-[30px] xl:text-[35px] font-medium text-white">
                                                {complex.subtitle?.[locale as keyof typeof complex.subtitle] || ""}
                                            </h3>
                                            <p className="text-base mdx:text-lg text-white">
                                                {complex.price}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="text-center py-20">{t('noData')}</div>
                )}
                <div className="flex w-full justify-center mt-10">
                    <Link href={`/${locale}/new-buildings`}>
                        <button className="border flex items-center justify-center py-3 bg-[#E1AF93] hover:bg-[#EAC7B4] text-white font-semibold text-lg w-[223px]">
                            {t('button-more')}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;

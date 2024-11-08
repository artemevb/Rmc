"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import azizi from "@/public/images/partners/azizi.jpg";
import sobha from "@/public/images/partners/sobha_realty.jpg";
import p4 from "@/public/images/partners/partner-4.svg";
import p5 from "@/public/images/partners/partner-5.png";
import p6 from "@/public/images/partners/partner-6.png";
import ArrowLeft from '@/public/svg/partners/ArrowLeftSlider.png';
import ArrowRight from '@/public/svg/partners/ArrowRightSlider.png';
import { StaticImageData } from 'next/image';
import { useTranslations } from 'next-intl';

interface Partner {
    id: number;
    image: StaticImageData;
    url: string;
}

const PartnersComp: React.FC = () => {
    const t = useTranslations('Partners');
    const sliderRef = useRef<Slider>(null);
    const [partnerSlides, setPartnerSlides] = useState<Partner[][]>([]);

    // Мемоизация массива партнеров
    const partners: Partner[] = useMemo(() => [
        { id: 1, image: azizi, url: 'https://home.azizidevelopments.com/' },
        { id: 2, image: sobha, url: 'https://www.sobharealty.com/' },
        { id: 4, image: p4, url: 'https://www.emaar.com/' },
        { id: 5, image: p5, url: 'https://www.damacproperties.com/' },
        { id: 6, image: p6, url: 'https://danubeproperties.com/' },
    ], []);

    const chunkArray = (array: Partner[], chunkSize: number): Partner[][] => {
        const chunks: Partner[][] = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    useEffect(() => {
        const chunks = chunkArray(partners, 6);
        setPartnerSlides(chunks);
    }, [partners]);

    const isStatic = partners.length <= 6;

    const settings = useMemo(() => ({
        infinite: !isStatic,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !isStatic,
        autoplay: !isStatic,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: !isStatic,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: !isStatic,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: !isStatic,
                },
            },
        ],
    }), [isStatic]); // Мемоизация настроек слайдера

    const handlePrev = () => {
        sliderRef.current?.slickPrev();
    };

    const handleNext = () => {
        sliderRef.current?.slickNext();
    };

    return (
        <div className='w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 mb-[90px] relative'>
            <h2 className='text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-medium text-left'>
                {t('title')}
            </h2>

            {/* Отображаем кнопки навигации только если слайдер не статичен */}
            {!isStatic && (
                <div className='flex justify-center items-center gap-[8px] absolute bottom-[-55px] mdx:bottom-auto mdx:top-0 right-[18px]'>
                    <button onClick={handlePrev} className='rounded-full transition'>
                        <Image
                            src={ArrowLeft}
                            alt="Предыдущий"
                            width={150}
                            height={150}
                            className='w-[50px] mdx:w-[60px] h-full'
                        />
                    </button>
                    <button onClick={handleNext} className='rounded-full transition'>
                        <Image
                            src={ArrowRight}
                            alt="Следующий"
                            width={150}
                            height={150}
                            className='w-[50px] mdx:w-[60px] h-full'
                        />
                    </button>
                </div>
            )}

            <div className='w-full h-auto'>
                <Slider ref={sliderRef} {...settings} className='h-auto w-full'>
                    {partnerSlides.map((slide, slideIndex) => (
                        <div key={slideIndex} className='px-[10px]'>
                            <div className='grid grid-cols-2 xl:grid-cols-3 py-[25px]'>
                                {slide.map(partner => (
                                    <div key={partner.id} className='flex justify-center items-center border border-[#EAEAEA] h-[140px] mdx:h-[200px] xl:h-[250px] px-[8px] mdx:px-[30px] xl:px-[70px] py-[65px] cursor-pointer'>
                                        <a href={partner.url} target="_blank" rel="noopener noreferrer">
                                            <Image
                                                src={partner.image}
                                                alt={`Partner ${partner.id}`}
                                                className='object-contain'
                                                quality={100}
                                                width={500}
                                                height={500}
                                            />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default PartnersComp;

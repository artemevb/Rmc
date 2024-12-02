"use client";
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Image from 'next/image';
import arrowLeft from "@/public/svg/ArrowLeftSlider.png";
import arrowRight from "@/public/svg/ArrowRightSlider.png";

import defaultImage from "@/public/images/main_buildings/Slide-1-full.png";
import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from '@/src/sanity/env';

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource): string => {
    return builder.image(source).width(1920).height(800).url() || defaultImage.src;
};

interface LocalizedField {
    uz?: string;
    en?: string;
    ru?: string;
}

interface GalleryImage {
    asset: {
        _ref: string;
    };
}

interface BannerData {
    subtitle_main?: LocalizedField;
    desc_main?: LocalizedField;
    gallery_2?: GalleryImage[];
}

interface BannerProps {
    locale: string;
    data?: BannerData;
}

export default function Banner({ locale, data }: BannerProps) {
    const t = useTranslations('Building_page_main');
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [slides, setSlides] = useState<{ imageSrc: string; title: string }[]>([]);

    useEffect(() => {

        if (data?.gallery_2 && Array.isArray(data.gallery_2)) {
            const mappedSlides = data.gallery_2.map((image, index) => ({
                imageSrc: urlFor(image.asset._ref),
                title: `Slide ${index + 1}`
            }));
            setSlides(mappedSlides);
        } else {
            setSlides([]);
        }
    }, [data]);

    const getLocalizedField = (field?: LocalizedField): string => {
        if (!field) return '';
        switch (locale) {
            case 'uz':
                return field.uz || '';
            case 'en':
                return field.en || '';
            case 'ru':
                return field.ru || '';
            default:
                return '';
        }
    };

    const subtitle = getLocalizedField(data?.subtitle_main);
    const description = getLocalizedField(data?.desc_main);
    const hasSubtitle = subtitle.trim().length > 0;
    const hasDescription = description.trim().length > 0;
    const hasText = hasSubtitle || hasDescription;

    if (!data || (!hasText && slides.length === 0)) {
        return null;
    }

    return (
        <div className="w-full h-auto flex flex-col mx-auto max-w-[1440px]">

            {hasText && (
                <div className='xl:flex xl:justify-between '>
                    {hasSubtitle && (
                        <div className='max-2xl:mx-[16px] w-full max-w-[263px] mdx:max-w-[413px] xl:max-w-[593px]'>
                            <h1 className='text-[33px] mdx:text-[65px] xl:text-[78px] font-medium leading-[41px] mdx:leading-[70px] xl:leading-[90px]'>
                                {subtitle}
                            </h1>
                            <a href="tel:+998785558787">
                                <button className='w-[223px] bg-corporate hover:bg-hover_corporate font-semibold h-[49px] text-[#fff] text-[17px] mt-[24px] mdx:mt-[30px] xl:mt-[40px] transition-all duration-300'>
                                    {t('button-call')}
                                </button>
                            </a>
                        </div>
                    )}
                    {hasDescription && (
                        <div className='text-[16px] mdx:text-[20px] max-w-[588px] xl:mb-[86px] hidden 2xl:block'>
                            {description.length > 310
                                ? `${description.substring(0, 310)}...`
                                : description}
                        </div>
                    )}
                </div>
            )}

            {slides.length > 0 && (
                <div className="relative mySwiper max-2xl:mx-[16px] mt-[40px] xl:mt-[60px]">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{ prevEl, nextEl }}
                        autoplay={{
                            delay: 5500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="relative"
                        spaceBetween={30}
                        slidesPerView={1}
                        speed={1500}
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={slide.imageSrc || defaultImage.src}
                                    quality={100}
                                    alt={`New buildings photo ${index + 1}`}
                                    layout="responsive"
                                    width={3000}
                                    height={500}
                                    className="w-full h-auto min-h-[250px] max-h-[500px] object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div>
                        {/* Navigation buttons */}
                        <div className="flex gap-[8px] mt-[30px] mdx:mt-[40px] xl:absolute xl:top-[-150px] xl:right-[33.5%]">
                            {/* Ensure navigation elements exist before rendering */}
                            {arrowLeft && (
                                <div
                                    ref={setPrevEl}
                                    className="transform z-10 cursor-pointer"
                                >
                                    <Image
                                        src={arrowLeft}
                                        quality={100}
                                        alt="Previous Slide"
                                        className="w-[50px] h-[50px]"
                                    />
                                </div>
                            )}
                            {arrowRight && (
                                <div
                                    ref={setNextEl}
                                    className="transform z-10 cursor-pointer"
                                >
                                    <Image
                                        src={arrowRight}
                                        quality={100}
                                        alt="Next Slide"
                                        className="w-[50px] h-[50px]"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {hasDescription && (
                <div className='mt-[20px] text-[16px] mdx:text-[20px] max-w-[588px] xl:hidden px-4'>
                    {description.length > 310
                        ? `${description.substring(0, 310)}...`
                        : description}
                </div>
            )}
        </div>
    );
}

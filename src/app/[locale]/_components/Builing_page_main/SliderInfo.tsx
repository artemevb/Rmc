"use client"
import { useState } from 'react';
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
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '@sanity/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Initialize Sanity client
const client = sanityClient({
    projectId: 'cog5nktd',
    dataset: 'production',
    useCdn: true,
});

const builder = imageUrlBuilder(client);

// Function to generate image URL
function urlFor(source: SanityImageSource): string {
    return builder.image(source).width(1920).height(800).url() || defaultImage.src;
}

// Define interfaces
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
    gallery?: GalleryImage[];
}

interface BannerProps {
    locale: string;
    data?: BannerData;
}

export default function Banner({ locale, data }: BannerProps) {
    const t = useTranslations('Building_page_main');
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);

    const getLocalizedField = (field: LocalizedField | undefined): string => {
        if (!field) return '';
        return locale === 'uz' ? field.uz || '' :
               locale === 'en' ? field.en || '' :
               field.ru || '';
    };

    // Safely map over gallery to create slides, defaulting to an empty array if undefined
    const slides = data?.gallery?.map((image, index) => ({
        imageSrc: urlFor(image.asset._ref),
        title: `Slide ${index + 1}`
    })) || [];

    // Determine if any text data is present
    const hasSubtitle = !!getLocalizedField(data?.subtitle_main);
    const hasDescription = !!getLocalizedField(data?.desc_main);
    const hasText = hasSubtitle || hasDescription;

    return (
        <div className="w-full h-auto flex flex-col mx-auto max-w-[1440px]">
            {/* Conditionally render the text section only if there is text data */}
            {hasText && (
                <div className='xl:flex xl:justify-between xl:items-center'>
                    {hasSubtitle && data?.subtitle_main && (
                        <div className='max-2xl:mx-[16px] w-full max-w-[223px] mdx:max-w-[413px] xl:max-w-[513px]'>
                            <h1 className='text-[35px] mdx:text-[65px] xl:text-[80px] font-medium leading-[41px] mdx:leading-[70px] xl:leading-[90px]'>
                                {getLocalizedField(data.subtitle_main)}
                            </h1>
                            <a href="tel:+998785558787">
                                <button className='w-[223px] bg-[#E1AF93] hover:bg-[#EAC7B4] font-semibold h-[49px] text-[#fff] text-[17px] mt-[24px] mdx:mt-[30px] xl:mt-[40px]'>
                                    {t('button-call')}
                                </button>
                            </a>
                        </div>
                    )}
                    {hasDescription && data?.desc_main && (
                        <div className='text-[16px] mdx:text-[20px] max-w-[588px] xl:mb-[86px] hidden 2xl:block'>
                            {getLocalizedField(data.desc_main).length > 310
                                ? `${getLocalizedField(data.desc_main).substring(0, 310)}...`
                                : getLocalizedField(data.desc_main)}
                        </div>
                    )}
                </div>
            )}

            {/* Render the Swiper only if there are slides */}
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
                                    src={slide.imageSrc || defaultImage.src} // Use defaultImage if imageSrc is unavailable
                                    quality={100}
                                    alt={`New buildings photo`}
                                    layout="responsive"
                                    width={3000}
                                    height={500}
                                    className="w-full h-auto min-h-[250px] max-h-[500px] object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div>
                        {hasSubtitle && data?.subtitle_main && (
                            <div className='mt-[20px] text-[16px] mdx:text-[20px] max-w-[588px] xl:hidden'>
                                {getLocalizedField(data.subtitle_main)}
                            </div>
                        )}
                        <div className="flex gap-[8px] mt-[30px] mdx:mt-[40px] xl:absolute xl:top-[-150px] xl:right-[33.5%]">
                            <div
                                ref={setPrevEl}
                                className="transform z-10 cursor-pointer"
                            >
                                <Image
                                    src={arrowLeft}
                                    quality={100}
                                    alt="Previous"
                                    className="w-[50px] h-[50px]"
                                />
                            </div>
                            <div
                                ref={setNextEl}
                                className="transform z-10 cursor-pointer"
                            >
                                <Image
                                    src={arrowRight}
                                    quality={100}
                                    alt="Next"
                                    className="w-[50px] h-[50px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

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
import { dataset, projectId } from '@/src/sanity/env'; // Убедитесь, что пути указаны правильно

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

// Инициализация imageUrlBuilder
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource): string => {
    return builder.image(source).width(1920).height(800).url() || defaultImage.src;
};

// Определение интерфейсов
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
    gallery_2?: GalleryImage[]; // Обновлено для использования gallery_2
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

    // Состояния для Lightbox
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState<{ src: string; alt: string }[]>([]);

    useEffect(() => {
        // Обновлено для использования data.gallery_2
        if (data?.gallery_2 && Array.isArray(data.gallery_2)) {
            const mappedSlides = data.gallery_2.map((image, index) => ({
                imageSrc: urlFor(image.asset),
                title: `Slide ${index + 1}`
            }));
            setSlides(mappedSlides);

            // Подготовка изображений для Lightbox
            const mappedImages = data.gallery_2.map((image, index) => ({
                src: urlFor(image.asset),
                alt: `New buildings photo ${index + 1}`
            }));
            setImages(mappedImages);
        } else {
            setSlides([]);
            setImages([]);
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

    // Определение наличия текста
    const subtitle = getLocalizedField(data?.subtitle_main);
    const description = getLocalizedField(data?.desc_main);
    const hasSubtitle = subtitle.trim().length > 0;
    const hasDescription = description.trim().length > 0;
    const hasText = hasSubtitle || hasDescription;

    // Если нет данных или нет слайдов и текста, ничего не отображаем
    if (!data || (slides.length === 0 && !hasText)) {
        return null;
    }

    // Функция для открытия Lightbox
    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className="w-full h-auto flex flex-col mx-auto max-w-[1440px]">
            {/* Условный рендеринг блока с текстом */}
            {hasText && (
                <div className='xl:flex xl:justify-between xl:items-center'>
                    {hasSubtitle && (
                        <div className='max-2xl:mx-[16px] w-full max-w-[263px] mdx:max-w-[413px] xl:max-w-[593px]'>
                            <h1 className='text-[33px] mdx:text-[65px] xl:text-[78px] font-medium leading-[41px] mdx:leading-[70px] xl:leading-[90px]'>
                                {subtitle}
                            </h1>
                            <a href="tel:+998785558787">
                                <button className='w-[223px] bg-corporate hover:bg-hover_corporate font-semibold h-[49px] text-[#fff] text-[17px] mt-[24px] mdx:mt-[30px] xl:mt-[40px]'>
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

            {/* Условный рендеринг Swiper только если есть слайды */}
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
                        onSlideChange={() => { }}
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="w-full h-auto relative cursor-pointer"
                                    onClick={() => openLightbox(index)}
                                >
                                    <Image
                                        src={slide.imageSrc || defaultImage.src} // Используем defaultImage, если imageSrc недоступен
                                        quality={100}
                                        alt={`New buildings photo ${index + 1}`}
                                        fill
                                        className="w-full h-auto min-h-[250px] max-h-[500px] object-cover"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div>
                        {/* Описание для мобильных устройств, если отсутствует subtitle */}
                        {hasDescription && (
                            <div className='mt-[20px] text-[16px] mdx:text-[20px] max-w-[588px] xl:hidden'>
                                {description.length > 310
                                    ? `${description.substring(0, 310)}...`
                                    : description}
                            </div>
                        )}
                        <div className="flex gap-[8px] mt-[30px] mdx:mt-[40px] xl:absolute xl:top-[-150px] xl:right-[33.5%]">
                            {/* Убедитесь, что элементы навигации существуют перед их рендерингом */}
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

                    {/* Компонент Lightbox для изображений */}
                    <Lightbox
                        open={lightboxOpen}
                        close={() => setLightboxOpen(false)}
                        slides={images}
                        index={currentIndex}
                        plugins={[Zoom]}
                    />
                </div>
            )}
        </div>
    );
}



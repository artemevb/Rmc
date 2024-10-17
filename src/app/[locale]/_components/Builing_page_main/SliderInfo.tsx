"use client"
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import { useTranslations } from 'next-intl';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Image from 'next/image';

import arrowLeft from "@/public/svg/ArrowLeftSlider.png";
import arrowRight from "@/public/svg/ArrowRightSlider.png";

import photo2 from "@/public/images/main_buildings/Slide-1-full.png";
import photo3 from "@/public/images/main_buildings/Slide-1-full.png";
import photo4 from "@/public/images/main_buildings/Slide-1-full.png";

import photo2mob from "@/public/images/main_buildings/Slide-1-table.png";
import photo3mob from "@/public/images/main_buildings/Slide-1-table.png";
import photo4mob from "@/public/images/main_buildings/Slide-1-table.png";

export default function Banner() {
    const t = useTranslations('Building_page_main');
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);

    const [houseDetails] = useState({
        title: 'Infinity Клубный дом',
        description: `Дом имеет свой приватный, закрытый двор, с несколькими зонами отдыха для взрослых и детей. Отдельно предусмотрено помещение для консьержа и охраны. Из окон квартир открывается вид на эксклюзивный ландшафтный двор-парк общей площадью более 1 Га, с прогулочными аллеями, водными объектами и летним кинотеатром.`,
    });

    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    const mobileSlides = [
        { imageSrc: photo2mob },
        { imageSrc: photo3mob },
        { imageSrc: photo4mob },
    ];

    const desktopSlides = [
        { imageSrc: photo2 },
        { imageSrc: photo3 },
        { imageSrc: photo4 },
    ];

    const slides = isMobile ? mobileSlides : desktopSlides;

    return (
        <div className="w-full h-auto flex flex-col mx-auto max-w-[1440px]">
            <div className='xl:flex xl:justify-between xl:items-center'>
                <div className='max-2xl:mx-[16px] w-full max-w-[223px] mdx:max-w-[413px] xl:max-w-[513px]'>
                    <h1 className='text-[35px] mdx:text-[65px] xl:text-[80px] font-medium leading-[41px] mdx:leading-[70px] xl:leading-[90px]'>{houseDetails.title}</h1>
                    <a href="tel:+998785558787">
                        <button className='w-[223px] bg-[#E1AF93] hover:bg-[#EAC7B4] font-semibold h-[49px] text-[#fff] text-[17px] mt-[24px] mdx:mt-[30px] xl:mt-[40px]'>
                            {t('button-call')}
                        </button>
                    </a>
                </div>
                <div className=''>
                    <div className='text-[16px] mdx:text-[20px] max-w-[588px] xl:mb-[86px] hidden 2xl:block'>
                        {houseDetails.description}
                    </div>

                </div>
            </div>
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
                                src={slide.imageSrc}
                                quality={100}
                                alt={`Slide ${index + 1}`}
                                layout='responsive'
                                className="w-full h-auto min-h-[250px] max-h-[500px] object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div >
                    <div className='mt-[20px] text-[16px] mdx:text-[20px] max-w-[588px] xl:hidden'>
                        {houseDetails.description}
                    </div>
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
        </div>
    );
}

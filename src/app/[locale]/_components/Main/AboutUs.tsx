"use client";
import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Image from 'next/image';

import photo5 from "@/public/images/main/main_small_slider.jpg";
import photo6 from "@/public/images/main/main_small_slider-2.jpg";
import photo7 from "@/public/images/main/main_small_slider-3.jpg";
import photo8 from "@/public/images/main/main_small_slider-4.jpg";
import photo9 from "@/public/images/main/main_small_slider-5.jpg";

import arrowLeft from "@/public/svg/arrowLeftWhite.svg";
import arrowRight from "@/public/svg/arrowRightWhite.svg";

export default function Banner() {
    const t = useTranslations('Main.AboutUs');
    const [activeTab, setActiveTab] = useState('buy');

    const tabs = [
        {
            id: 'buy',
            label: t('tabs.buy.label'),
            content: t('tabs.buy.content')
        },
        {
            id: 'rent',
            label: t('tabs.rent.label'),
            content: t('tabs.rent.content')
        },
        {
            id: 'manage',
            label: t('tabs.manage.label'),
            content: t('tabs.manage.content')
        },
    ];

    const prevRef = useRef<HTMLDivElement | null>(null);
    const nextRef = useRef<HTMLDivElement | null>(null);

    // Состояние для навигационных элементов
    const [navigation, setNavigation] = useState<{
        prevEl: HTMLDivElement | null;
        nextEl: HTMLDivElement | null;
    }>({
        prevEl: null,
        nextEl: null,
    });

    useEffect(() => {
        setNavigation({
            prevEl: prevRef.current,
            nextEl: nextRef.current,
        });
    }, []);

    return (
        <div className="w-full h-auto flex flex-col mx-auto max-w-[1440px]">
            <div className='mx-[10px]'>
                <div className="flex flex-col xl:flex-row xl:justify-between gap-[35px]">
                    <div className='lh'>
                        <h2 className="text-[30px] mdx:text-[35px] mdl:text-[40px] slg:text-[45px] xl:text-[50px] font-medium text-gray-800">{t('title')}</h2>
                        <h3 className="text-[30px] mdx:text-[35px] mdl:text-[40px] slg:text-[45px] xl:text-[50px] font-medium text-corporate">RMC DE LUXE</h3>
                    </div>

                    <div className="w-full mx-auto xl:mt-0 mt-6 max-w-[1000px] xl:max-w-[710px]">
                        <div className="flex justify-between items-center border-b text-[16px] mdx:text-[20px] border-gray-300 ">
                            {tabs.map((tab) => (
                                <div
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`${activeTab === tab.id ? 'text-corporate border-b border-corporate' : 'text-gray-400'
                                        } cursor-pointer pb-[25px]`}
                                >
                                    {tab.label}
                                </div>
                            ))}
                        </div>
                        <div className="py-4 text-gray-600 text-[16px] mdx:text-[20px]">
                            {tabs.find((tab) => tab.id === activeTab)?.content.split('\n').map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative mySwiper mt-8">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={navigation}
                        autoplay={{
                            delay: 5500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="relative"
                        spaceBetween={30}
                        slidesPerView={1}
                        speed={1500}
                        onSwiper={(swiper) => {
                            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 1,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {[photo5, photo6, photo7, photo8, photo9].map((photo, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full min-h-[200px] md:h-[250px] mdx:min-h-[350px] lg:h-[400px] xl:h-[590px] overflow-hidden">
                                    <Image
                                        src={photo}
                                        alt={`Building ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        quality={100}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div ref={prevRef} className="absolute xl:left-5 left-3 top-2 mdx:left-3 mdx:top-4 xl:top-7 z-10 cursor-pointer hidden xl:block">
                        <Image src={arrowLeft} quality={100} className='w-[50px] h-[50px] mdx:w-[60px] mdx:h-[60px] xl:w-[70px] xl:h-[70px]' alt="Previous" />
                    </div>
                    <div ref={nextRef} className="absolute xl:left-[100px] left-[68px] mdx:left-[85px] top-2 mdx:top-4 xl:top-7 z-10 cursor-pointer hidden xl:block">
                        <Image src={arrowRight} quality={100} className='w-[50px] h-[50px] mdx:w-[60px] mdx:h-[60px] xl:w-[70px] xl:h-[70px]' alt="Next" />
                    </div>
                </div>
            </div>
        </div>
    );
}

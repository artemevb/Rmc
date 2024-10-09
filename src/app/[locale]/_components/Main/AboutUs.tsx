"use client";
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Image from 'next/image';
import photo1 from "@/public/images/main/photo.png";
import photo2 from "@/public/images/main/photo2_new.png";
import photo3 from "@/public/images/main/photo3_new.png";

import arrowLeft from "@/public/svg/arrowLeftWhite.svg";
import arrowRight from "@/public/svg/arrowRightWhite.svg";

export default function Banner() {
    const t = useTranslations('Main.AboutUs');
    const [activeTab, setActiveTab] = useState('rent');

    const tabs = [
        {
            id: 'rent',
            label: t('tabs.rent.label'),
            content: t('tabs.rent.content')
        },
        {
            id: 'buy',
            label: t('tabs.buy.label'),
            content: t('tabs.buy.content')
        },
        {
            id: 'manage',
            label: t('tabs.manage.label'),
            content: t('tabs.manage.content')
        },
    ];

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="w-full h-auto flex flex-col mx-auto max-w-[1440px]">
            <div className='mx-[10px]'>
                <div className="flex flex-col xl:flex-row xl:justify-between gap-[35px]">
                    <div className='lh'>
                        <h2 className="text-[30px] mdx:text-[35px] mdl:text-[40px] slg:text-[45px] xl:text-[50px] font-medium text-gray-800">{t('title')}</h2>
                        <h3 className="text-[30px] mdx:text-[35px] mdl:text-[40px] slg:text-[45px] xl:text-[50px] font-medium text-[#E1AF93]">RMC DE LUXE</h3>
                    </div>

                    <div className="w-full mx-auto xl:mt-0 mt-6 max-w-[1000px] xl:max-w-[710px]">
                        <div className="flex justify-between items-center border-b text-[16px] mdx:text-[20px] border-gray-300 ">
                            {tabs.map((tab) => (
                                <div
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`${activeTab === tab.id ? 'text-[#E1AF93] border-b border-[#E1AF93]' : 'text-gray-400'
                                        }   cursor-pointer pb-[25px]`}
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

                <div className="relative mySwiper mt-8 ">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        autoplay={{
                            delay: 4500, // 3 seconds
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="relative"
                        spaceBetween={30}
                        slidesPerView={1}
                        onSwiper={(swiper) => {
                            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }}
                    >
                        <SwiperSlide>
                            <Image
                                src={photo1}
                                quality={100}
                                alt="Building"
                                layout="responsive"
                                objectFit="w-full h-auto object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src={photo2}
                                quality={100}
                                alt="Building"
                                layout="responsive"
                                objectFit="w-full h-auto object-cover "
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src={photo3}
                                quality={100}
                                alt="Building"
                                layout="responsive"
                                objectFit="w-full h-auto object-cover "
                            />
                        </SwiperSlide>
                    </Swiper>
                    <div ref={prevRef} className="absolute xl:left-5 left-2 top-2 mdx:left-3 mdx:top-4 xl:top-7 z-10 cursor-pointer">
                        <Image src={arrowLeft} className='w-[50px] h-[50px] mdx:w-[60px] mdx:h-[60px] xl:w-[70px] xl:h-[70px]' alt="Previous" />
                    </div>
                    <div ref={nextRef} className="absolute xl:left-[100px] left-[65px] mdx:left-[85px] top-2 mdx:top-4 xl:top-7 z-10 cursor-pointer ">
                        <Image src={arrowRight} className='w-[50px] h-[50px] mdx:w-[60px] mdx:h-[60px] xl:w-[70px] xl:h-[70px]' alt="Next" />
                    </div>
                </div>
            </div>
        </div>
    );
}
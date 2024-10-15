"use client";
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Image from 'next/image';

import arrowLeft from "@/public/svg/arrowLeftWhite.svg";
import arrowRight from "@/public/svg/arrowRightWhite.svg";

import photo2 from "@/public/images/main/Full-photo-2.png";
import photo3 from "@/public/images/main/Full-photo-3.png";
import photo4 from "@/public/images/main/Full-photo-4.png";
import photo5 from "@/public/images/main/Full-photo-5.png";

import photo2mob from "@/public/images/main/Slide1Mobile.png";
import photo3mob from "@/public/images/main/Slide2Mobile.png";
import photo4mob from "@/public/images/main/Slide3Mobile.png";
import photo5mob from "@/public/images/main/Slide4Mobile.png";

export default function Banner() {
  const t = useTranslations('Main.Banner');
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const [navigation, setNavigation] = useState<{
    prevEl: HTMLDivElement | null;
    nextEl: HTMLDivElement | null;
  }>({
    prevEl: null,
    nextEl: null,
  });

  // Media query to detect if the screen is below the 'mdx' breakpoint
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  useEffect(() => {
    setNavigation({
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    });
  }, []);

  const mobileSlides = [
    {
      imageSrc: photo2mob,
      title: t('slides.slide2.title'),
      description: t('slides.slide2.description'),
    },
    {
      imageSrc: photo3mob,
      title: t('slides.slide3.title'),
      description: t('slides.slide3.description'),
    },
    {
      imageSrc: photo4mob,
      title: t('slides.slide4.title'),
      description: t('slides.slide4.description'),
    },
    {
      imageSrc: photo5mob,
      title: t('slides.slide5.title'),
      description: t('slides.slide5.description'),
    },
  ];

  const desktopSlides = [
    {
      imageSrc: photo2,
      title: t('slides.slide2.title'),
      description: t('slides.slide2.description'),
    },
    {
      imageSrc: photo3,
      title: t('slides.slide3.title'),
      description: t('slides.slide3.description'),
    },
    {
      imageSrc: photo4,
      title: t('slides.slide4.title'),
      description: t('slides.slide4.description'),
    },
    {
      imageSrc: photo5,
      title: t('slides.slide5.title'),
      description: t('slides.slide5.description'),
    },
  ];

  // Choose the correct slides based on the screen size
  const slides = isMobile ? mobileSlides : desktopSlides;

  return (
    <div className="w-full h-auto flex flex-col mx-auto">
      <div className="relative mySwiper">
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
          speed={1200}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Image
                src={slide.imageSrc}
                quality={100}
                alt={`Slide ${index + 1}`}
                layout="responsive"
                className="w-full h-auto min-h-[650px] object-cover"
              />
              <div className="absolute bottom-10 2xl:bottom-14 ml-[10px] mdx:ml-[20px] xl:left-10 3xl:left-[10%] text-white">
                <h2
                  className="text-[35px] mdx:text-[55px] mdl:text-[60px] lg:text-[70px] xl:text-[75px] 3xl:text-[80px] font-medium max-w-[520px] lg:max-w-[650px] xl:max-w-[710px]"
                  style={{ lineHeight: '1.1' }}
                >
                  {slide.title}
                </h2>
                <p className="text-[16px] mdx:text-[20px] mt-[8px] mdx:mt-[12px] xl:mt-[20px]">
                  {slide.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="max-xl:mx-2 ">
          <div
            ref={prevRef}
            className="absolute mdx:right-[100px] 3xl:right-[15.5%] 4xl:right-[14.4%]  max-mdx:top-[45%] mdx:bottom-2 transform z-10 mdx:mb-6 2xl:mb-14 cursor-pointer hidden xl:block"
          >
            <Image
              src={arrowLeft}
              quality={100}
              alt="Previous"
              className="w-[50px] h-[50px] mdx:h-[60px] mdx:w-[60px] xl:w-[70px] xl:h-[70px]"
            />
          </div>
          <div
            ref={nextRef}
            className="absolute mdx:right-5 3xl:right-[10.4%] mdx:bottom-2 max-mdx:top-[45%] max-mdx:left-[70px] transform z-10 mdx:mb-6 2xl:mb-14 cursor-pointer hidden xl:block"
          >
            <Image
              src={arrowRight}
              quality={100}
              alt="Next"
              className="w-[50px] h-[50px] mdx:h-[60px] mdx:w-[60px] xl:w-[70px] xl:h-[70px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

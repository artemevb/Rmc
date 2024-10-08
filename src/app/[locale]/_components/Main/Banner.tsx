"use client"
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Image from 'next/image';

import arrowLeft from "@/public/svg/arrowLeftWhite.svg";
import arrowRight from "@/public/svg/arrowRightWhite.svg";
import photo1 from "@/public/images/main/Full-photo.png";

export default function Banner() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const slides = [
    {
      imageSrc: photo1,
      title: 'Найдите идеальное место для жизни',
      description: 'Откройте двери в новое будущее с нами'
    },
    {
      imageSrc: photo1,
      title: 'Ваш новый дом ждет вас',
      description: 'Сделайте первый шаг к вашей мечте'
    }
  ];

  return (
    <div className="w-full h-auto flex flex-col mx-auto">
      <div className='relative mySwiper'>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="relative"
          spaceBetween={30}
          slidesPerView={1}
          onSwiper={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Image
                src={slide.imageSrc}
                alt={`Slide ${index + 1}`}
                layout="responsive"
                className="w-full h-auto min-h-[650px] object-cover"
              />
              <div className="absolute bottom-10 2xl:bottom-14 ml-[10px] mdx:ml-[20px] xl:left-10 3xl:left-[10%] text-white ">
                <h2 className="text-[35px] mdx:text-[55px] mdl:text-[60px] lg:text-[70px] xl:text-[75px] 3xl:text-[80px] font-medium max-w-[520px] lg:max-w-[650px] xl:max-w-[710px]" style={{ lineHeight: "1.1" }}>{slide.title}</h2>
                <p className="text-[16px] mdx:text-[20px] mt-[8px] mdx:mt-[12px] xl:mt-[20px]" >{slide.description}</p>

                <div>
                  <button className="bg-[#E1AF93] text-[17px] font-semibold text-white py-2 px-4 mdx:py-3 w-full max-w-[175px] mdx:max-w-[223px] mt-[30px]">Подробнее</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='max-xl:mx-2'>
          <div ref={prevRef} className="absolute mdx:right-[100px] 3xl:right-[16%] max-mdx:top-[45%] mdx:bottom-2 transform z-10 mdx:mb-6 2xl:mb-14 cursor-pointer">
            <Image src={arrowLeft} alt="Previous" className='w-[50px] h-[50px] mdx:h-[60px] mdx:w-[60px] xl:w-[70px] xl:h-[70px]' />
          </div>
          <div ref={nextRef} className="absolute mdx:right-5 3xl:right-[10.4%] mdx:bottom-2 max-mdx:top-[45%] max-mdx:left-[70px] transform z-10 mdx:mb-6 2xl:mb-14 cursor-pointer">
            <Image src={arrowRight} alt="Next" className='w-[50px] h-[50px] mdx:h-[60px] mdx:w-[60px] xl:w-[70px] xl:h-[70px]' />
          </div>
        </div>
      </div>
    </div>
  );
}

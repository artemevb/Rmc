"use client";

import { useRef, useState, useEffect } from 'react';
import { Swiper as SwiperClass, NavigationOptions } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Image from 'next/image';

import arrowLeft from "@/public/svg/arrowLeftWhite.svg";
import arrowRight from "@/public/svg/arrowRightWhite.svg";
import { urlFor } from '@/src/sanity/lib/image';
import { client } from '@/src/sanity/lib/client';

interface Slide {
  image: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
        lqip?: string; // Добавлено для использования в placeholder
      };
    };
  };
  title: {
    ru?: string;
    uz?: string;
    en: string;
  };
  description: {
    ru?: string;
    uz?: string;
    en: string;
  };
}

export default function Banner({ locale }: { locale: string }) {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    const fetchSlides = async () => {
      const query = `*[_type == "slider"][1]{
        slides[] {
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions,
                lqip // Предполагается, что lqip доступен
              }
            }
          },
          title,
          description
        }
      }`;

      const data = await client.fetch(query);
      if (data && data.slides) {
        setSlides(data.slides);
      }
    };

    fetchSlides();
  }, []);

  return (
    <div className="w-full h-auto flex flex-col mx-auto">
      <div className="relative mySwiper">
        {slides.length > 0 && (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper: SwiperClass) => {
              if (
                prevRef.current &&
                nextRef.current &&
                swiper.params.navigation &&
                typeof swiper.params.navigation !== 'boolean'
              ) {
                const navigationParams = swiper.params.navigation as NavigationOptions;
                navigationParams.prevEl = prevRef.current;
                navigationParams.nextEl = nextRef.current;

                if (swiper.navigation) {
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }
            }}
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
            {slides.map((slide, index) => {
              const imageSrc = urlFor(slide.image)
                .width(1920)
                .height(800)
                .format('webp') // Используем формат WebP
                .url();
              const titleText = slide.title[locale as keyof typeof slide.title] || slide.title.en;
              const descriptionText = slide.description[locale as keyof typeof slide.description] || slide.description.en;

              return (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-auto min-h-[700px] xl:min-h-[800px]">
                    <Image
                      src={imageSrc}
                      quality={100} // Сниженное качество
                      alt={`Slide ${index + 1}`}
                      fill
                      className="w-full h-full object-cover"
                      sizes="(max-width: 2000px) 100vw,
                             (max-width: 1500px) 50vw,
                             33vw" // Адаптивные размеры
                      loading="lazy" // Ленивая загрузка
                      placeholder="blur"
                      blurDataURL={slide.image.asset.metadata.lqip || undefined} // Используем lqip если доступно
                    />
                    <div className="absolute bottom-10 2xl:bottom-14 ml-[10px] mdx:ml-[20px] xl:left-10 3xl:left-[10%] text-white">
                      {titleText && (
                        <h2
                          className="text-[35px] mdx:text-[55px] mdl:text-[60px] lg:text-[70px] xl:text-[75px] 3xl:text-[80px] font-medium max-w-[520px] lg:max-w-[650px] xl:max-w-[710px]"
                          style={{ lineHeight: '1.1' }}
                        >
                          {titleText}
                        </h2>
                      )}
                      {descriptionText && (
                        <p className="text-[16px] mdx:text-[20px] mt-[8px] mdx:mt-[12px] xl:mt-[20px]">
                          {descriptionText}
                        </p>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        <div className="max-xl:mx-2 ">
          <div
            ref={prevRef}
            className="absolute mdx:right-[100px] 3xl:right-[15.5%] 4xl:right-[14.4%] max-mdx:top-[45%] mdx:bottom-2 transform z-10 mdx:mb-6 2xl:mb-14 cursor-pointer hidden xl:block"
          >
            <Image
              src={arrowLeft}
              quality={80} // Сниженное качество для стрелок
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
              quality={80} // Сниженное качество для стрелок
              alt="Next"
              className="w-[50px] h-[50px] mdx:h-[60px] mdx:w-[60px] xl:w-[70px] xl:h-[70px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

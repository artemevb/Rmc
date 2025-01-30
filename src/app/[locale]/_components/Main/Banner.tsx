"use client";

import { useRef, useState, useEffect } from 'react';
import { Swiper as SwiperClass, NavigationOptions } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Image from 'next/image';
// import { useTranslations } from "next-intl";
import arrowLeft from "@/public/svg/arrowLeftWhite.svg";
import arrowRight from "@/public/svg/arrowRightWhite.svg";
import { urlFor } from '@/src/sanity/lib/image';
import { client } from '@/src/sanity/lib/client';
import QuestionSent from '../Modal/ApplicationNewBuildings';

interface Slide {
  image: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
        lqip?: string;
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
  buttonText?: {
    ru?: string;
    uz?: string;
    en?: string;
  };
}

export default function Banner({ locale }: { locale: string }) {
  // const t = useTranslations('Main.Banner');
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const [slides, setSlides] = useState<Slide[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                lqip
              }
            }
          },
          title,
          description,
          buttonText // Ensure buttonText is fetched
        }
      }`;

      try {
        const data = await client.fetch(query);
        if (data && data.slides) {
          setSlides(data.slides);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
              delay: 6000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="relative"
            spaceBetween={30}
            slidesPerView={1}
            speed={2000}
          >
            {slides.map((slide, index) => {
              const imageSrc = urlFor(slide.image)
                .width(1920)
                .height(800)
                .format('webp')
                .url();
              const titleText = slide.title[locale as keyof typeof slide.title] || slide.title.en;
              const descriptionText = slide.description[locale as keyof typeof slide.description] || slide.description.en;
              const buttonText = slide.buttonText
                ? (slide.buttonText[locale as keyof typeof slide.buttonText] || slide.buttonText.en)
                : undefined; 

              return (
                <SwiperSlide key={index}>
                  <div
                    className="relative w-full h-auto min-h-[500px] mdx:min-h-[600px] xl:min-h-[630px] xl:max-h-[630px] 4xl:min-h-[850px] bg-center bg-cover"
                    style={{
                      background: `linear-gradient(380deg, rgba(0, 0, 0, 0.765) 0%, rgba(0, 0, 0, 0.2) 90%), url(${imageSrc}) lightgray 50% / cover no-repeat`,
                    }}
                  >
                    <div className="absolute inset-0"></div>

                    {/* Container for text and button */}
                    <div className="absolute bottom-10 2xl:bottom-14 ml-[10px] mdx:ml-[20px] xl:left-10 3xl:left-[10%] text-white z-10 flex flex-col space-y-4">
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
                      {buttonText && ( 
                        <div className="mt-4">
                          <button
                            onClick={openModal}
                            className="bg-corporate hover:bg-hover_corporate text-white py-3 w-auto font-semibold shadow-md transition duration-300 px-[43.5px] text-[16px] mdx:text-[17px]"
                          >
                            {buttonText}
                          </button>
                        </div>
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
      <QuestionSent isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

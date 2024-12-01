"use client";
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '@sanity/client';
import defaultImage from "@/public/images/main/Full-photo-3.png";
import arrowLeft from "@/public/svg/arrowLeftWhite.svg";
import arrowRight from "@/public/svg/arrowRightWhite.svg";
import ApplicationNewBuildings from '../Modal/ApplicationNewBuildings';
import Image from "next/image";
// Define the types for your props
interface BannerProps {
  locale: string;
  data: {
    gallery: Array<{
      asset: {
        _ref: string;
      };
    }>;
    subtitle?: {
      uz?: string;
      en?: string;
      ru?: string;
    };
    price?: string;
  };
}

const client = sanityClient({
  projectId: 'cog5nktd',
  dataset: 'production',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

// Function to generate image URL
function urlFor(source: string) {
  return builder.image(source);
}

export default function Banner({ locale, data }: BannerProps) {
  const t = useTranslations('Building_page_main');


  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

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

  const getLocalizedField = (field: { uz?: string; en?: string; ru?: string } | undefined) => {
    if (!field) return '';
    return locale === 'uz' ? field.uz : locale === 'en' ? field.en : field.ru;
  };

  // Use images from Sanity
  const slides = data?.gallery.map((image, index) => ({
    imageSrc: urlFor(image.asset._ref).width(1920).height(800).url(),
    title: `Slide ${index + 1}`,
    price: `${t('from')} $55000`,
  })) || []; // Provide a default value in case data.gallery is undefined

  return (
    <div className="w-full h-full  flex flex-col mx-auto ">
      <div className="relative mySwiper ">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={navigation}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="relative"
          spaceBetween={30}
          slidesPerView={1}
          speed={1500}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative ">
              <img
                src={slide.imageSrc || defaultImage.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto min-h-[450px] xl:min-h-[728px] max-mdx:max-h-[700px] object-cover"
                style={{ width: '100%', height: 'auto' }}
              />
              {/* Градиентный затемнитель */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-50"></div>
              <div className="absolute bottom-10 2xl:bottom-14 ml-[10px] mdx:ml-[20px] xl:left-10 3xl:left-[10%] text-white">
                <h2
                  className="text-[35px] mdx:text-[55px] mdl:text-[60px] lg:text-[70px] xl:text-[75px] 3xl:text-[80px] font-medium max-w-[520px] lg:max-w-[650px] xl:max-w-[710px]"
                  style={{ lineHeight: '1.1' }}
                >
                  {getLocalizedField(data.subtitle) || t('default-subtitle')}
                </h2>
                <p className="text-[16px] mdx:text-[20px] mb-[25px] mdx:mb-[35px] mt-[10px]">
                  {data?.price ? `${data.price.toLocaleString()}` : t('default-price')}
                </p>
                <div className="w-full gap-[12px] mdx:gap-[20px] flex font-semibold text-[17px] pr-[16px]">
                  <button
                    onClick={openModal}
                    className="min-w-[158px] w-full bg-corporate hover:bg-hover_corporate h-[49px] mdx:w-[223px]"
                  >
                    {t('button-more')}
                  </button>
                  <a href="tel:+998785558787">
                    <button className="min-w-[158px] w-full bg-transparent border border-[#FFFFFF] h-[49px] mdx:w-[223px]">
                      {t('button-call')}
                    </button>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="max-xl:mx-2">
          <div
            ref={prevRef}
            className="absolute mdx:right-[100px] 3xl:right-[15.5%] 4xl:right-[14.4%]  max-mdx:top-[45%] mdx:bottom-2 transform z-10 mdx:mb-6 2xl:mb-14 cursor-pointer hidden xl:block"
          >
            <Image
              quality={100}
              src={arrowLeft.src}
              width={70}
              height={70}
              alt="Previous"
              className="w-[50px] h-[50px] mdx:h-[60px] mdx:w-[60px] xl:w-[70px] xl:h-[70px]"
            />
          </div>
          <div
            ref={nextRef}
            className="absolute mdx:right-5 3xl:right-[10.4%] mdx:bottom-2 max-mdx:top-[45%] max-mdx:left-[70px] transform z-10 mdx:mb-6 2xl:mb-14 cursor-pointer hidden xl:block"
          >
            <Image
              quality={100}
              width={70}
              height={70}
              src={arrowRight.src}
              alt="Next"
              className="w-[50px] h-[50px] mdx:h-[60px] mdx:w-[60px] xl:w-[70px] xl:h-[70px]"
            />
          </div>
        </div>
      </div>
      <ApplicationNewBuildings isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

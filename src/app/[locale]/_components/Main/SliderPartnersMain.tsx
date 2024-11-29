"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import Slider from "react-slick";
import azizi from "@/public/images/partners/azizi.jpg";
import sobha from "@/public/images/partners/sobha_realty.jpg";
import p4 from "@/public/images/partners/partner-4.svg";
import p5 from "@/public/images/partners/partner-5.png";
import p6 from "@/public/images/partners/partner-6.png";
import tiger from "@/public/images/partners/tiger.webp";
import ArrowLeft from "@/public/svg/partners/ArrowLeftSlider.png";
import ArrowRight from "@/public/svg/partners/ArrowRightSlider.png";
import { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

interface Partner {
  id: number;
  image: StaticImageData;
  url: string;
}

const PartnersComp: React.FC = () => {
  const t = useTranslations("Partners");
  const sliderRef = useRef<Slider>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Мемоизация массива партнеров
  const partners: Partner[] = useMemo(
    () => [
      { id: 1, image: azizi, url: "https://home.azizidevelopments.com/" },
      { id: 2, image: sobha, url: "https://www.sobharealty.com/" },
      { id: 3, image: tiger, url: "https://www.tigergroup.ae/" },
      { id: 4, image: p4, url: "https://www.emaar.com/" },
      { id: 5, image: p5, url: "https://www.damacproperties.com/" },
      { id: 6, image: p6, url: "https://danubeproperties.com/" },
    ],
    []
  );

  // Функция для обновления ширины окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth); // Установить начальную ширину экрана

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Настройки слайдера с учетом ширины окна
  const settings = useMemo(
    () => ({
      infinite: true,
      speed: 1500,
      slidesToShow: windowWidth >= 1200 ? 3 : windowWidth >= 600 ? 2 : 2, // Мин. 2 слайда на всех экранах
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3, // Показывать 3 слайда на больших экранах
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2, // Показывать минимум 2 слайда
            slidesToScroll: 1,
            infinite: true,
          },
        },
      ],
    }),
    [windowWidth] // Настройки пересчитываются, когда изменяется ширина окна
  );

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 relative">
      <h2 className="text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-medium text-left">
        {t("title")}
      </h2>

      <div className="flex justify-center items-center gap-[8px] absolute bottom-[-60px] mdx:bottom-auto mdx:top-0 right-[18px] ">
        <button onClick={handlePrev} className="rounded-full transition">
          <Image
            src={ArrowLeft}
            alt="Предыдущий"
            width={150}
            height={150}
            className="w-[50px] mdx:w-[60px] h-full"
          />
        </button>
        <button onClick={handleNext} className="rounded-full transition">
          <Image
            src={ArrowRight}
            alt="Следующий"
            width={150}
            height={150}
            className="w-[50px] mdx:w-[60px] h-full"
          />
        </button>
      </div>

      <div className="w-full h-auto">
        <Slider ref={sliderRef} {...settings} className="h-auto w-full">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className=" flex justify-center items-center"
            >
              <div className="flex justify-center items-center border border-[#EAEAEA] h-[120px] mdx:h-[200px] xl:h-[250px] px-[8px] mdx:px-[30px] xl:px-[70px] py-[65px] cursor-pointer">
                <a href={partner.url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={partner.image}
                    alt={`Partner ${partner.id}`}
                    className="object-contain"
                    quality={100}
                    width={500}
                    height={500}
                  />
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PartnersComp;


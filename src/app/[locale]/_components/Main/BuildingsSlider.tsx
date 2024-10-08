"use client";

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import Link from 'next/link';

import build1 from "@/public/images/main/whyus/slide1.png";
import build2 from "@/public/images/main/whyus/slide1.png";
import build3 from "@/public/images/main/whyus/slide1.png";
import build4 from "@/public/images/main/whyus/slide1.png";

import arrowleft from "@/public/svg/ArrowLeftSlider.png";
import arrowright from "@/public/svg/ArrowRightSlider.png";

export default function Banner() {
    const equipmentData = [
        {
            title: "Safa One",
            description: "Luxury Apartment",
            image: build1,
            price: "от $1,900,000",
            slug: "1-safa-one",
        },
        {
            title: "Safa Two",
            description: "Modern Apartment",
            image: build2,
            price: "от $399,000",
            slug: "2-safa-two",
        },
        {
            title: "Peninsula Two",
            description: "Urban Living",
            image: build3,
            price: "от $245,000",
            slug: "3-peninsula-two",
        },
        {
            title: "Marina Vista",
            description: "Seaside Apartment",
            image: build4,
            price: "от $612,000",
            slug: "4-marina-vista",
        },
    ];

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <div
                className="absolute top-[-50px] right-[10px] z-10 transform -translate-y-1/2 cursor-pointer"
                onClick={onClick}
            >
                <Image
                    src={arrowright}
                    alt="NEXT"
                    className="object-cover  h-full w-[70px]"
                />
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div
                className="absolute top-[-50px] right-[90px] z-10 transform -translate-y-1/2 cursor-pointer"
                onClick={onClick}
            >
                <Image
                    src={arrowleft}
                    alt="NEXT"
                    className="object-cover w-[70px] h-full"
                />
            </div>
        );
    };

    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // По умолчанию показывать 3 слайда
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1000, // Для экранов шириной до 1000px
                settings: {
                    slidesToShow: 2, // Показывать 2 слайда
                    slidesToScroll: 1,
                    nextArrow: false,
                    prevArrow: false,
                },
            },
            {
                breakpoint: 468, // Для экранов шириной до 468px
                settings: {
                    slidesToShow: 1, // Показывать 1 слайд
                    slidesToScroll: 1,
                    nextArrow: false,
                    prevArrow: false,
                },
            },
        ],
    };


    return (
        <div className="w-full h-auto flex flex-col mx-auto max-w-[1440px]">
            <div className="mx-[10px]">
                <h2 className="text-[30px] mdx:text-[40px] mdl:text-[45px] xl:text-[50px] 2xl:text-[55px] font-medium lh pb-[40px]">
                    Новостройки
                </h2>
                <Slider {...settings}>
                    {equipmentData.map((item, index) => (
                        <div key={index} className="max-mdx:px-[6px] px-[10px]">
                            <div className="relative flex flex-col items-center max-h-[600px] overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <h3 className="max-mdx:text-[28px] mdx:text-[30px] text-[35px] font-medium">{item.title}</h3>
                                    <p className="text-[16px] mdx:text-[20px] text-white">{item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="flex w-full justify-center mt-10">
                    <Link href="/buildings" className="border flex items-center justify-center py-3 bg-[#E1AF93] hover:bg-[#EAC7B4] text-[#fff] font-semibold text-[17px] max-w-[223px] w-full">
                        Смотреть все
                    </Link>
                </div>
            </div>
        </div>
    );
}

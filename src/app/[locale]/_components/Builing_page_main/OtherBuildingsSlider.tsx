"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';
import BuildingsCard from '../Builing_page_main/BuildingsCard';
import Slider from 'react-slick';
import { useTranslations } from "next-intl";
// import Link from "next/link";
// import {
//     GET_RESIDENTIAL_COMPLEXES,
//     GET_DISTRICTS,
//     GET_HOUSING_TYPES,
//     GET_ROOMS,
//     GET_COMPLETION_TIMES,
// } from '../NewBuildings/queries';
// import { ResidentialComplex, District, HousingType, Room, CompletionTime } from '../NewBuildings/types';
// import { client } from '@/src/sanity/lib/client';

const fakeNews = [
    {
        slug: "harizma",
        head: {
            heading: "Harizma",
            photo: { url: "/images/new_buildings/Building1.png" },
            coast: "от $700 000"
        }
    },
    {
        slug: "dinasty",
        head: {
            heading: "Династия",
            photo: { url: "/images/new_buildings/Building2.png" },
            coast: "от $700 000"
        }
    },
    {
        slug: "assalom-sohil",
        head: {
            heading: "Assalom Sohil",
            photo: { url: "/images/new_buildings/Building3.png" },
            coast: "от $700 000"
        }
    }
];

export default function NewsComp() {
    const t = useTranslations('Building_page_main.Other');
    const [visibleNews] = useState(fakeNews); // Используем фейковые данные


    // Настройки слайдера
    const settings = {
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    return (
        <div className='w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 mb-[90px] mdx:mb-[150px] 2xl:mb-[190px] '>
            <h2 className='text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-medium'>
                {t("title")}
            </h2>
            <div className='w-full h-auto '>
                <Slider {...settings} className='h-auto w-full '>
                    {visibleNews.map((item, i) => (
                        <div className='px-[10px] xl:max-h-[600px] max-h-full' key={i}>
                            {/* <Link href={`/${locale}/blog/${item.slug}`}> */}
                            <BuildingsCard
                                coast={item.head.coast}
                                subtitle={item.head.heading}
                                imageSrc={item.head.photo.url}
                            />
                            {/* </Link> */}
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}


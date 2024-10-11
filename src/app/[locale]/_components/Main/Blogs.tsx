"use client";
// Import statements
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import blog1 from "@/public/images/main/blogs/slide-1.png";
import blog2 from "@/public/images/main/blogs/slide-2.png";
import blog3 from "@/public/images/main/blogs/slide-3.png";
import NewCardMain from './NewCardMain';
import { StaticImageData } from 'next/image';
import Slider from 'react-slick';
import { useTranslations } from "next-intl";
import Link from "next/link";

interface NewsPhoto {
    url: StaticImageData;
}

interface NewsHead {
    heading: string;
    date: string;
    views: string;
    photo: NewsPhoto;
}

interface NewsItem {
    slug: string;
    head: NewsHead;
}

interface NewsCompProps {
    locale: string;
}

export default function NewsComp({ locale }: NewsCompProps) {
    const t = useTranslations('Main.Blogs');
    const [visibleNews, setVisibleNews] = useState<NewsItem[]>([]); // Only visibleNews state

    // Temporary data
    const temporaryNews: NewsItem[] = [
        {
            slug: 'news-1',
            head: {
                heading: 'Тенденции и прогнозы рынка недвижимости на 2024 год',
                date: '31.07.2024',
                photo: { url: blog2 },
                views: '102',
            },
        },
        {
            slug: 'news-2',
            head: {
                heading: 'Лучшие районы для инвестиций в недвижимость',
                date: '31.07.2024',
                photo: { url: blog3 },
                views: '102',
            },
        },
        {
            slug: 'news-3',
            head: {
                heading: 'Топ-10 новых жилых комплексов',
                date: '31.07.2024',
                photo: { url: blog1 },
                views: '112',
            },
        },
        {
            slug: 'news-4',
            head: {
                heading: 'Лучшие районы для инвестиций в недвижимость',
                date: '31.07.2024',
                photo: { url: blog2 },
                views: '152',
            },
        },

    ];

    // Slider settings
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

    // Function to get random news without repeats
    const getRandomNews = (arr: NewsItem[], count: number): NewsItem[] => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random()); // Shuffle array
        return shuffled.slice(0, count); // Return first `count` elements
    };

    // Initial load of 4 random news items
    useEffect(() => {
        setVisibleNews(getRandomNews(temporaryNews, 4)); // Only set visibleNews
    }, []);

    return (
        <div className='w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 mb-[90px] mdx:mb-[150px] 2xl:mb-[190px] '>
            <h2 className='text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-medium'>
                {t("title")}
            </h2>
            <div className='w-full h-auto '>
                <Slider {...settings} className='h-auto w-full '>
                    {visibleNews.map((item, i) => (
                        <div className='px-[10px] xl:h-[420px] max-h-full' key={i}>
                            <Link href={`/${locale}/blog/${item.slug}`}>
                                <NewCardMain
                                    subtitle={item.head.heading}
                                    date={item.head.date}
                                    imageSrc={item.head.photo?.url}
                                    views={item.head.views}
                                />
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
            {/* <div className='w-full h-auto grid mdx:grid-cols-2 gap-[30px] mdx:gap-[16px] xl:hidden'>
                {visibleNews.map((item, i) => (
                    <Link key={i} href={`/${locale}/blog/${item.slug}`}>
                        <NewCardMain
                            subtitle={item.head.heading}
                            date={item.head.date}
                            imageSrc={item.head.photo?.url}
                            views={item.head.views}
                        />
                    </Link>
                ))}
            </div> */}
            <div className="flex items-center justify-center xl:mt-[60px] mdx:mt-[40px] mt-[30px]">
                <Link href={`/${locale}/blog`} className='bg-[#E1AF93] hover:bg-[#EAC7B4] text-white py-[12px] px-4 w-[223px]  flex justify-center font-semibold text-[17px]'>
                    {t("button-more")}
                </Link>
            </div>
        </div>
    );
}

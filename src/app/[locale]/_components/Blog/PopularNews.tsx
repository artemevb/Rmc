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
    const t = useTranslations('Blog');
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
    ];

    const getRandomNews = (arr: NewsItem[], count: number): NewsItem[] => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    useEffect(() => {
        setVisibleNews(getRandomNews(temporaryNews, 3));
    }, []);

    return (
        <div className='w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 mb-[90px] mdx:mb-[150px] 2xl:mb-[190px] '>
            <h2 className='text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-medium'>
                {t("title")}
            </h2>
            {/* Grid Layout */}
            <div className='w-full h-auto grid mdx:grid-cols-2 2xl:grid-cols-12 gap-[12px] mdx:gap-[16px]'>
                {/* Первый блок */}
                {visibleNews[0] && (
                    <div className="h-full mdx:col-span-2 2xl:col-span-8 2xl:max-w-[956px] 2xl:max-h-[600px] ">
                        <Link href={`/${locale}/blog/${visibleNews[0].slug}`}>
                            <NewCardMain
                                subtitle={visibleNews[0].head.heading}
                                date={visibleNews[0].head.date}
                                imageSrc={visibleNews[0].head.photo?.url}
                                views={visibleNews[0].head.views}
                            />
                        </Link>
                    </div>
                )}
                {/* Остальные блоки */}
                <div className="mdx:col-span-2 2xl:col-span-4 grid grid-cols-1 gap-[12px] mdx:grid-cols-2 2xl:grid-cols-1 ">
                    {visibleNews.slice(1).map((item, i) => (
                        <Link key={i} href={`/${locale}/blog/${item.slug}`}>
                            <NewCardMain
                                subtitle={item.head.heading}
                                date={item.head.date}
                                imageSrc={item.head.photo?.url}
                                views={item.head.views}
                            />
                        </Link>
                    ))}
                </div>
            </div>


        </div>
    );
}

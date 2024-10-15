"use client";
// Import statements
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import NewCardMain from './PopularCardMain';
import NewCardMainSmallCard from './PopularCardMainSmall2';
import { useTranslations } from "next-intl";
import Link from "next/link";
import axios from 'axios';

interface NewsPhoto {
    url: string;
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

interface BlogItem {
    viewCounter: number;
    slug: string;
    options: Array<{
        title: string | { [key: string]: string };
        photo: { url: string };
    }>;
    createdDate: string;
}

export default function NewsComp({ locale }: NewsCompProps) {
    const t = useTranslations('Blog');
    const [visibleNews, setVisibleNews] = useState<NewsItem[]>([]);

    const formatDate = (dateString: string): string => {
        // Assuming dateString is in "DD-MM-YYYY"
        const [day, month, year] = dateString.split('-');
        return `${day}.${month}.${year}`;
    };

   useEffect(() => {
    axios.get('https://rmc.mrjtrade.uz/api/blog/get-all', {
        headers: {
            'Accept-Language': locale,
        },
    })
    .then(response => {
        const data: BlogItem[] = response.data.data;

        // Sort the data by viewCounter in descending order
        const sortedData = data.sort((a: BlogItem, b: BlogItem) => b.viewCounter - a.viewCounter);

        // Take the first 3 items
        const topThree = sortedData.slice(0, 3);

        // Map to NewsItem format
        const newsItems = topThree.map((item: BlogItem) => {
            const option = item.options[0]; // Take the first option

            let title = '';
            if (typeof option.title === 'string') {
                title = option.title;
            } else if (typeof option.title === 'object') {
                title = option.title[locale] || option.title['en'] || '';
            }

            return {
                slug: item.slug,
                head: {
                    heading: title,
                    date: formatDate(item.createdDate),
                    views: item.viewCounter.toString(),
                    photo: {
                        url: option.photo.url,
                    },
                },
            };
        });

        // Set the state
        setVisibleNews(newsItems);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}, [locale]);

    return (
        <div className='w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 mb-[90px] mdx:mb-[150px] 2xl:mb-[190px] '>
            <h2 className='text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-medium'>
                {t("title-popular")}
            </h2>
            {/* Grid Layout */}
            <div className='w-full h-full grid mdx:grid-cols-2 2xl:grid-cols-12 gap-[12px] mdx:gap-[16px] max-h-[600px]'>
                {/* First Block */}
                {visibleNews[0] && (
                    <div className="h-full mdx:col-span-2 2xl:col-span-8 2xl:max-w-[953px] 2xl:max-h-[600px] ">
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
                {/* Remaining Blocks */}
                <div className="mdx:col-span-2 2xl:col-span-4 grid grid-cols-1 gap-[12px] mdx:grid-cols-2 2xl:grid-cols-1 ">
                    {visibleNews.slice(1).map((item, i) => (
                        <Link key={i} href={`/${locale}/blog/${item.slug}`}>
                            <NewCardMainSmallCard
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

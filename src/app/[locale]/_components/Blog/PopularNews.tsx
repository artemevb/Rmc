"use client";

import { useEffect, useState } from 'react';
import NewCardMain from './PopularCardMain';
import NewCardMainSmallCard from './PopularCardMainSmall2';
import { useTranslations } from "next-intl";
import Link from "next/link";
import { client } from '../../../../sanity/lib/client';
import { urlFor } from '../../../../sanity/lib/image';
import { groq } from 'next-sanity';
import PropTypes from 'prop-types';

interface NewsItem {
    slug: string; 
    title: string;
    date: string;
    viewCounter: number;
    mainImage: {
        asset: {
            url: string;
        };
    } | null;
}

interface NewsCompProps {
    locale: string;
}

const NewsComp: React.FC<NewsCompProps> = ({ locale }) => {
    const t = useTranslations('Blog');

    const [visibleNews, setVisibleNews] = useState<NewsItem[]>([]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = groq`*[_type == "news"] | order(viewCounter desc)[0...3] {
                    "slug": slug.current, 
                    "title": title.${locale},
                    date,
                    viewCounter,
                    mainImage
                }`;
                const data: NewsItem[] = await client.fetch(query);

                // Форматируем дату и проверяем наличие mainImage
                const formattedData = data.map(item => ({
                    ...item,
                    date: formatDate(item.date),
                }));

                setVisibleNews(formattedData);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchData();
    }, [locale]);

    return (
        <div className='w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 mb-[90px] mdx:mb-[150px] 2xl:mb-[190px] '>
            <h2 className='text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-medium'>
                {t("title-popular")}
            </h2>
            <div className='w-full h-full grid mdx:grid-cols-2 2xl:grid-cols-12 gap-[12px] mdx:gap-[16px] xl:max-h-[600px]'>
                {/* Первый блок (популярная новость) */}
                {visibleNews[0] && (
                    <div className="h-full mdx:col-span-2 2xl:col-span-8 2xl:max-w-[953px] 2xl:max-h-[600px] ">
                        <Link href={`/${locale}/blog/${visibleNews[0].slug}`} passHref>
                            <NewCardMain
                                subtitle={visibleNews[0].title}
                                date={visibleNews[0].date}
                                imageSrc={visibleNews[0].mainImage ? urlFor(visibleNews[0].mainImage).url() : '/default-image.jpg'}
                                views={visibleNews[0].viewCounter.toString()}
                            />
                        </Link>
                    </div>
                )}
                {/* Остальные блоки (маленькие карточки) */}
                <div className="mdx:col-span-2 2xl:col-span-4 grid grid-cols-1 gap-[12px] mdx:grid-cols-2 2xl:grid-cols-1 ">
                    {visibleNews.slice(1).map((item, i) => (
                        <Link key={i} href={`/${locale}/blog/${item.slug}`} passHref>
                            <NewCardMainSmallCard
                                subtitle={item.title}
                                date={item.date}
                                imageSrc={item.mainImage ? urlFor(item.mainImage).url() : '/default-image.jpg'}
                                views={item.viewCounter.toString()}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsComp;

NewsComp.propTypes = {
    locale: PropTypes.oneOf(['ru', 'uz', 'en']).isRequired,
};

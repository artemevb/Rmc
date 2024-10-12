"use client";
// Импорт зависимостей
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import NewCardMain from './NewCardMain';
import Slider from 'react-slick';
import { useTranslations } from "next-intl";
import Link from "next/link";
import axios from 'axios';

interface Photo {
    id: number;
    url: string;
}

interface TitleDescription {
    uz: string;
    ru: string;
    en: string;
}

interface Option {
    id: number;
    title: TitleDescription;
    description: TitleDescription;
    orderNum: number;
    photo: Photo;
}

interface Type {
    id: number;
    name: TitleDescription;
}

interface BlogItem {
    id: number;
    slug: string;
    options: Option[];
    type: Type;
    createdDate: string;
    viewCounter: number;
    active: boolean;
    main: boolean;
}

interface ApiResponse {
    message: string;
    data: BlogItem[];
}

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
    locale: string; // Оставляем тип как string
}

// Функция помощник для безопасного получения заголовка
const getTitle = (titleDescription: TitleDescription, locale: string): string => {
    const supportedLocales: Array<keyof TitleDescription> = ['uz', 'ru', 'en'];
    if (supportedLocales.includes(locale as keyof TitleDescription)) {
        return titleDescription[locale as keyof TitleDescription];
    }
    // Возврат значения по умолчанию, если locale не поддерживается
    return titleDescription['ru'] || titleDescription['uz'] || '';
};

export default function NewsComp({ locale }: NewsCompProps) {
    const t = useTranslations('Main.Blogs');
    const [visibleNews, setVisibleNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    // Функция для получения случайных новостей без повторений
    const getRandomNews = (arr: NewsItem[], count: number): NewsItem[] => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    // Функция для получения новостей из API
    const fetchNews = async () => {
        try {
            const response = await axios.get<ApiResponse>('https://rmc.mrjtrade.uz/api/blog/get-all', {
                headers: {
                    'Accept-Language': '-', // Запрос всех языков
                },
            });

            const blogs = response.data.data;

            // Преобразование данных API в NewsItem[]
            const mappedNews: NewsItem[] = blogs.map(blog => {
                // Выбор опции с наименьшим orderNum
                const primaryOption = blog.options.reduce((prev, current) => {
                    return prev.orderNum < current.orderNum ? prev : current;
                }, blog.options[0]);

                return {
                    slug: blog.slug,
                    head: {
                        heading: getTitle(primaryOption.title, locale),
                        date: formatDate(blog.createdDate),
                        photo: { url: primaryOption.photo.url },
                        views: blog.viewCounter.toString(),
                    },
                };
            });

            // Установка 4 случайных новостей
            setVisibleNews(getRandomNews(mappedNews, 4));
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Ошибка при загрузке новостей');
            setLoading(false);
        }
    };

    // Функция для форматирования даты (из "11-10-2024" в "11.10.2024")
    const formatDate = (dateStr: string): string => {
        const parts = dateStr.split('-');
        if (parts.length !== 3) return dateStr;
        return `${parts[0]}.${parts[1]}.${parts[2]}`;
    };

    // Инициализация загрузки новостей при изменении locale
    useEffect(() => {
        fetchNews();
    }, [locale]);

    if (loading) {
        return <div className='text-center'>Загрузка...</div>;
    }

    if (error) {
        return <div className='text-center text-red-500'>{error}</div>;
    }

    return (
        <div className='w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 mb-[90px] mdx:mb-[150px] 2xl:mb-[190px] '>
            <h2 className='text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-medium'>
                {t("title")}
            </h2>
            <div className='w-full h-auto '>
                <Slider {...settings} className='h-auto w-full '>
                    {visibleNews.map((item, i) => (
                        <div className='px-[10px] xl:h-[426px] max-h-full' key={i}>
                            <Link href={`/${locale}/blog/${item.slug}`}>
                                <NewCardMain
                                    subtitle={item.head.heading}
                                    date={item.head.date}
                                    imageSrc={item.head.photo.url}
                                    views={item.head.views}
                                />
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
            {/* Резервный вариант для мобильных устройств, если нужно */}
            {/*
            <div className='w-full h-auto grid mdx:grid-cols-2 gap-[30px] mdx:gap-[16px] xl:hidden'>
                {visibleNews.map((item, i) => (
                    <Link key={i} href={`/${locale}/blog/${item.slug}`}>
                        <NewCardMain
                            subtitle={item.head.heading}
                            date={item.head.date}
                            imageSrc={item.head.photo.url}
                            views={item.head.views}
                        />
                    </Link>
                ))}
            </div>
            */}
            <div className="flex items-center justify-center xl:mt-[60px] mdx:mt-[40px] mt-[30px]">
                <Link href={`/${locale}/blog`} className='bg-[#E1AF93] hover:bg-[#EAC7B4] text-white py-[12px] px-4 w-[223px] flex justify-center font-semibold text-[17px]'>
                    {t("button-more")}
                </Link>
            </div>
        </div>
    );
}


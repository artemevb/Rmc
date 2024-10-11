'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import NewCard from './NewsCard'; // Импорт компонента карточки
import { useTranslations } from 'next-intl';
import sortIcon from "@/public/svg/sort.svg";
import Image from 'next/image';
import Link from 'next/link';
import { NewsCompProps, NewsItem, ApiNewsItem } from './interfaces'; // Импорт интерфейсов
import Pagination from './Pagination'; // Переместим компонент пагинации в отдельный файл

const NewsComp: React.FC<NewsCompProps> = ({ locale }) => {
    const t = useTranslations('Blog');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
    const [newsToShow, setNewsToShow] = useState<NewsItem[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(6); // Динамическое количество элементов на странице
    const [selectedSortOption, setSelectedSortOption] = useState<string>('byDateNewest'); // Состояние сортировки
    const [isSortOpen, setIsSortOpen] = useState<boolean>(false); // Состояние выпадающего меню сортировки
    const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки
    const [error, setError] = useState<string | null>(null); // Состояние ошибки

    const sortOptions = [
        { value: 'byDateNewest', label: 'По дате: сначала новые' },
        { value: 'byDateOldest', label: 'По дате: сначала старые' },
        { value: 'byMostPopular', label: 'По популярности' },
    ];

    // Функция для преобразования данных API в формат NewsItem, обернута в useCallback
    const mapApiDataToNewsItem = useCallback((apiData: ApiNewsItem[]): NewsItem[] => {
        return apiData.map(item => {
            // Найдём опцию, соответствующую текущему языку (locale)
            const option = item.options.find(opt => opt.title[locale as keyof typeof opt.title]) || item.options[0];
            return {
                slug: item.slug,
                head: {
                    heading: option.title[locale as keyof typeof option.title] || option.title.ru, // Предпочтение текущему языку
                    date: new Date(item.createdDate).toISOString().split('T')[0], // Форматирование даты
                    photo: {
                        url: option.photo.url,
                    },
                    views: item.viewCounter.toString(),
                },
            };
        });
    }, [locale]);

    // Загрузка данных из API с передачей языка как параметра
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                // Передаем язык через параметр 'lang'
                const res = await axios.get(`https://rmc.mrjtrade.uz/api/blog/get-all`, {
                    // Set the Accept-Language header to the language of the reviews
                    headers: {
                        'Accept-Language': '-', // Use wildcard to request all languages
                    },
                })
                const newsItems = mapApiDataToNewsItem(res.data.data);
                // Сортировка по умолчанию
                const sortedNews = sortNews(newsItems, selectedSortOption);
                setFilteredNews(sortedNews);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || err.message || 'Неизвестная ошибка');
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Неизвестная ошибка');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [locale, mapApiDataToNewsItem, selectedSortOption]);

    // Сортировка новостей
    const sortNews = (news: NewsItem[], option: string): NewsItem[] => {
        const sortedNews = [...news];
        if (option === 'byDateNewest') {
            return sortedNews.sort((a, b) => new Date(b.head.date).getTime() - new Date(a.head.date).getTime());
        }
        if (option === 'byDateOldest') {
            return sortedNews.sort((a, b) => new Date(a.head.date).getTime() - new Date(b.head.date).getTime());
        }
        if (option === 'byMostPopular') {
            return sortedNews.sort((a, b) => parseInt(b.head.views) - parseInt(a.head.views));
        }
        return sortedNews;
    };

    // Обработка изменения сортировки
    const handleSortChange = (option: string) => {
        setSelectedSortOption(option);
        const sorted = sortNews(filteredNews, option);
        setFilteredNews(sorted); // Сортируем новости и обновляем состояние
        setCurrentPage(1); // Сбрасываем на первую страницу при изменении сортировки
        setIsSortOpen(false); // Закрываем выпадающее меню
    };

    // Расчёт новостей для отображения на текущей странице
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setNewsToShow(filteredNews.slice(startIndex, endIndex));
    }, [currentPage, filteredNews, itemsPerPage]);

    // Обработчик смены страницы
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Обработчик смены количества элементов на странице
    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Сбрасываем на первую страницу при изменении количества элементов
    };

    // Закрытие выпадающего меню при клике вне его
    const sortRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='mx-auto w-full max-3xl:px-[10px] max-w-[1440px]'>
            <h2 className='mb-[20px] mdx:mb-[30px] text-[30px] mdx:text-[45px] xl:text-[55px] font-medium'
            >{t('title')}</h2>
            <div className="flex flex-row justify-between items-start xl:items-center space-y-4 xl:space-y-0">

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-[8px]">
                    {/* Добавьте необходимые фильтры */}
                </div>

                {/* Секция сортировки */}
                <div className="flex space-x-4 items-center relative h-[23px]" ref={sortRef}>
                    {/* Кнопка сортировки */}
                    <button
                        className="flex items-center space-x-2 text-sm focus:outline-none"
                        onClick={() => setIsSortOpen(!isSortOpen)}
                    >
                        <span className='text-[16px] mdx:text-[20px]'>{t('sort')}</span>
                        <Image
                            src={sortIcon}
                            width={25}
                            height={25}
                            alt="Sort Icon"
                            className='w-[20px] h-full mdx:w-[25px]'
                        />
                    </button>

                    {/* Выпадающее меню сортировки */}
                    {isSortOpen && (
                        <ul className="absolute right-0 mt-[150px] w-[223px] bg-white shadow-lg z-10">
                            {sortOptions.map(option => (
                                <li key={option.value}>
                                    <button
                                        className={`block w-full border-b text-left px-4 py-2 text-base hover:bg-[#FCF7F4] ${selectedSortOption === option.value ? 'bg-[#FCF7F4] text-[#E1AF93]' : ''
                                            }`}
                                        onClick={() => handleSortChange(option.value)}
                                    >
                                        {option.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Обработка состояний загрузки и ошибок */}
            {loading && <p className="mt-6 text-center">Загрузка новостей...</p>}
            {error && <p className="mt-6 text-center text-red-500">{error}</p>}

            {/* Карточки новостей */}
            {!loading && !error && (
                <>
                    <div className="grid grid-cols-1 mdl:grid-cols-2 lg:grid-cols-3 gap-6 mdx:gap-[20px] mt-6">
                        {newsToShow.map((news, i) => (
                            <Link key={i} href={`/${locale}/blog/${news.slug}`}>
                                <NewCard
                                    subtitle={news.head.heading}
                                    date={news.head.date}
                                    imageSrc={news.head.photo.url} // Теперь imageSrc ожидает строку
                                    views={news.head.views}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Пагинация и выбор количества элементов на странице */}
                    <div className='w-full flex justify-center mdx:justify-between items-center mt-[60px] mdx:mt-[80px] xl:mt-[100px]'>
                        <div className="mdx:flex items-center space-x-2 hidden xl:max-h-[40px]">
                            <label htmlFor="itemsPerPage" className="text-sm xl:text-[17px] text-[#858585]">
                                {t('itemsPerPage')}:
                            </label>
                            <select
                                id="itemsPerPage"
                                className="px-4 py-2 border rounded"
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                            >
                                <option value={3}>3</option>
                                <option value={6}>6</option>
                                <option value={9}>9</option>
                                <option value={12}>12</option>
                            </select>
                        </div>
                        <div className="flex justify-between items-center">
                            <Pagination
                                totalItems={filteredNews.length}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewsComp;

'use client';

import { useState, useEffect, useRef } from 'react';
import NewCard from './NewsCard'; // Импорт компонента карточки
import { useTranslations } from 'next-intl';
import blog1 from "@/public/images/main/blogs/slide-1.png";
import blog2 from "@/public/images/main/blogs/slide-2.png";
import blog3 from "@/public/images/main/blogs/slide-3.png";
import right from "@/public/svg/arrowrightbanners.svg";
import left from "@/public/svg/arrowleftbanners.svg";
import sort from "@/public/svg/sort.svg";
import Image from 'next/image';
import Link from 'next/link';
import { StaticImageData } from 'next/image';

interface NewsPhoto {
    url: StaticImageData;
}

interface NewsHead {
    heading: string;
    date: string;
    photo: NewsPhoto;
    views: string;
}

interface NewsItem {
    slug: string;
    head: NewsHead;
}

interface NewsCompProps {
    locale: string;
}

const temporaryNews: NewsItem[] = [
    {
        slug: 'news-1',
        head: {
            heading: 'Тенденции и прогнозы рынка недвижимости на 2024 год',
            date: '2024-07-22',
            photo: { url:blog2},
            views: '102',
        },
    },
    {
        slug: 'news-2',
        head: {
            heading: 'Лучшие районы для инвестиций в недвижимость',
            date: '2024-07-19',
            photo: { url:blog3},
            views: '99',
        },
    },
    {
        slug: 'news-3',
        head: {
            heading: 'Топ-10 новых жилых комплексов',
            date: '2024-07-31',
            photo: { url:blog1},
            views: '112',
        },
    },
    {
        slug: 'news-4',
        head: {
            heading: 'Новинки рынка коммерческой недвижимости',
            date: '2024-08-05',
            photo: { url:blog1},
            views: '85',
        },
    },
    // Добавьте больше новостей по необходимости
];

const NewsComp: React.FC<NewsCompProps> = ({ locale }) => {
    const t = useTranslations('Blog');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>(temporaryNews);
    const [newsToShow, setNewsToShow] = useState<NewsItem[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(6); // Динамическое количество элементов на странице
    const [selectedSortOption, setSelectedSortOption] = useState<string>('byDateNewest'); // Состояние сортировки
    const [isSortOpen, setIsSortOpen] = useState<boolean>(false); // Состояние выпадающего меню сортировки

    const sortOptions = [
        { value: 'byDateNewest', label: 'По дате: сначала новые' },
        { value: 'byDateOldest', label: 'По дате: сначала старые' },
        { value: 'byMostPopular', label: 'По популярности' },
    ];

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
        const sorted = sortNews(temporaryNews, option);
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
            {/* Фильтры и сортировка */}
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
                        <span className='text-[16px] mdx:text-[20px]'>Сортировать</span>
                        <Image
                            src={sort}
                            width={25}
                            quality={100}
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

            {/* Карточки новостей */}
            <div className="grid grid-cols-1 mdl:grid-cols-2 lg:grid-cols-3 gap-6 mdx:gap-[20px] mt-6">
                {newsToShow.map((news, i) => (
                    <Link key={i} href={`/${locale}/blog/${news.slug}`}>
                        <NewCard
                            subtitle={news.head.heading}
                            date={news.head.date}
                            imageSrc={news.head.photo?.url}
                            views={news.head.views}
                        />
                    </Link>
                ))}
            </div>

            {/* Пагинация и выбор количества элементов на странице */}
            <div className='w-full flex justify-center mdx:justify-between items-center mt-[60px] mdx:mt-[80px] xl:mt-[100px]'>
                <div className="mdx:flex items-center space-x-2 hidden">
                    <label htmlFor="itemsPerPage" className="text-sm">
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
        </div>
    );
};

export default NewsComp;

// Компонент пагинации
interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages === 0) return null;

    return (
        <ul className="flex space-x-2">
            {/* Кнопка "Назад" */}
            <li>
                <button
                    className={`px-4 py-2 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#E1AF93]'}`}
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <Image
                        src={left}
                        width={25}
                        height={25}
                        quality={100}
                        alt="Left Arrow"
                    />
                </button>
            </li>

            {/* Номера страниц */}
            {pages.map(page => (
                <li key={page}>
                    <button
                        className={`px-4 py-2 border rounded ${page === currentPage ? 'bg-[#ffff]' : 'hover:bg-[#E1AF93]'}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                </li>
            ))}

            {/* Кнопка "Вперёд" */}
            <li>
                <button
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#E1AF93]'}`}
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <Image
                        src={right}
                        width={25}
                        height={25}
                        quality={100}
                        alt="Right Arrow"
                    />
                </button>
            </li>
        </ul>
    );
};

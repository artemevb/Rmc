
"use client"
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import NewCard from './NewsCard';
import Pagination from './Pagination';
import sortIcon from "@/public/svg/sort.svg";
import { fetchNews } from '../Blog/fetchNews';

import PropTypes from 'prop-types';

interface NewsCompProps {
  locale: string;
}
interface LocalizedField {
  ru?: string;
  en?: string;
  uz?: string;
  [key: string]: string | undefined;
}
interface NewsItem {
  title: LocalizedField;
  date: string;
  slug: {
      current: string;
    };
  viewCounter: number;
  content: ContentBlock[];
  mainImage?: {
      asset: {
          url: string;
      };
  };
}

export interface ContentBlock {
  _type: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}
const NewsComp: React.FC<NewsCompProps> = ({ locale }) => {
  const t = useTranslations('Blog');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [newsToShow, setNewsToShow] = useState<NewsItem[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [selectedSortOption, setSelectedSortOption] = useState<string>('byDateNewest');
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  const sortOptions = [
    { value: 'byDateNewest', label: t('filter-1') },
    { value: 'byDateOldest', label: t('filter-2') },
    { value: 'byMostPopular', label: t('filter-3') },
  ];

  // Fetch news data from Sanity
  useEffect(() => {
    async function getNews() {
      try {
        const data = await fetchNews(); // Fetch all news
        setFilteredNews(data); // Store news in state
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    }
    getNews();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setNewsToShow(filteredNews.slice(startIndex, endIndex));
  }, [currentPage, filteredNews, itemsPerPage]);

  // Sorting news
  const sortNews = (news: NewsItem[], option: string) => {
    const sortedNews = [...news];
    if (option === 'byDateNewest') {
      return sortedNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    if (option === 'byDateOldest') {
      return sortedNews.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    if (option === 'byMostPopular') {
      return sortedNews.sort((a, b) => b.viewCounter - a.viewCounter);
    }
    return sortedNews;
  };

  // Handle sort change
  const handleSortChange = (option: string) => {
    setSelectedSortOption(option);
    const sorted = sortNews(filteredNews, option);
    setFilteredNews(sorted);
    setCurrentPage(1); // Reset to first page after sorting
    setIsSortOpen(false);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Close the sort dropdown when clicking outside
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

  // Function to get localized field based on locale
  const getLocalizedField = (field?: LocalizedField): string => {
    return field && field[locale] ? field[locale] : field?.ru || ''; // fallback to Russian
  };

  return (
    <div className="mx-auto w-full max-3xl:px-[10px] max-w-[1440px] mt-[20px]">
      <h2 className="mb-[20px] mdx:mb-[30px] text-[30px] mdx:text-[45px] xl:text-[55px] font-medium">
        {t('title')}
      </h2>
      {/* Sort Section */}
      <div className="flex justify-between items-start xl:items-center space-y-4 xl:space-y-0">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-[8px]">
          {/* Filters can be added here */}
        </div>
        <div className="relative h-[23px]" ref={sortRef}>
          <button
            className="flex items-center space-x-2 text-sm focus:outline-none transition-all duration-300"
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            <span className="text-[16px] mdx:text-[20px]">{t('sort')}</span>
            <Image src={sortIcon} width={25} height={25} alt="Sort Icon" className="w-[20px] h-full mdx:w-[25px]" />
          </button>

          {/* Sort Dropdown */}
          {isSortOpen && (
            <ul className="absolute right-0 w-[223px] bg-white shadow-lg z-10">
              {sortOptions.map((option) => (
                <li key={option.value}>
                  <button
                    className={`block w-full border-b text-left px-4 py-2 text-base hover:bg-[#FCE8E9] transition-all duration-300 ${
                      selectedSortOption === option.value ? 'bg-[#FCE8E9] text-corporate' : ''
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

      {/* News Cards */}
      <div className="grid grid-cols-1 mdl:grid-cols-2 lg:grid-cols-3 gap-6 mdx:gap-[20px] mt-6">
        {newsToShow.map((news, i) => (
          <Link key={i} href={`/${locale}/blog/${news.slug.current}`} passHref>
            <NewCard
              subtitle={getLocalizedField(news.title)}
              date={new Date(news.date).toLocaleDateString(locale)}
              imageSrc={news.mainImage?.asset?.url || ''} 
              views={news.viewCounter?.toString() || '0'} 
            />
          </Link>
        ))}
      </div>

      {/* Pagination and Items per Page */}
      <div className="w-full flex justify-center mdx:justify-between items-center mt-[60px] mdx:mt-[80px] xl:mt-[100px]">
        <div className="mdx:flex items-center space-x-2 hidden xl:max-h-[40px]">
          <label htmlFor="itemsPerPage" className="text-sm xl:text-[17px] text-[#858585]">
            {t('itemsPerPage')}:
          </label>
          <select
            id="itemsPerPage"
            className="px-4 py-2 border rounded transition-all duration-300"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
        </div>
        <Pagination
          totalItems={filteredNews.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default NewsComp;

NewsComp.propTypes = {
  locale: PropTypes.oneOf(['ru', 'uz', 'en']).isRequired,
};

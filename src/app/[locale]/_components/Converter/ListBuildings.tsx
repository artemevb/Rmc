"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// import { useTranslations } from "next-intl";

interface Complex {
  _id: string;
  mainImage: {
    asset: { url: string };
  };
  alt: { ru: string; uz: string; en: string };
  subtitle: { ru: string; uz: string; en: string };
  price?: string;
  area?: number;
  slug?: {
    current: string;
  };
}

interface ListBuildingsProps {
  locale: string;
  complexes: Complex[];
}

type SortOption = 'priceAsc' | 'priceDesc' | 'areaAsc' | 'areaDesc' | null;

export default function ListBuildings({ locale, complexes }: ListBuildingsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<SortOption>(null);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(complexes.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    // При изменении сортировки всегда возвращаемся на первую страницу
    setCurrentPage(1);
  }, [sortOption]);

  const parsePrice = (price?: string): number => {
    if (!price) return 0;
    // Удаляем все символы, кроме цифр, точки и минуса
    const cleaned = price.replace(/[^\d.-]/g, "");
    return parseFloat(cleaned) || 0;
  };

  const sortedComplexes = useMemo(() => {
    const sorted = [...complexes];
    switch (sortOption) {
      case 'priceAsc':
        sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case 'priceDesc':
        sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'areaAsc':
        sorted.sort((a, b) => (a.area ?? 0) - (b.area ?? 0));
        break;
      case 'areaDesc':
        sorted.sort((a, b) => (b.area ?? 0) - (a.area ?? 0));
        break;
      default:
        // Без сортировки
        break;
    }
    return sorted;
  }, [complexes, sortOption]);

  const displayed = useMemo(() => {
    return sortedComplexes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [sortedComplexes, currentPage, itemsPerPage]);

  // Генерация номеров страниц с троеточием
  const getPagination = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }

    return pages;
  };

  const pagination = getPagination();

  // Создаем реф для контейнера меню сортировки
  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Функция-обработчик клика
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target as Node)
      ) {
        setShowSortMenu(false);
      }
    };

    // Если меню открыто, добавляем обработчик
    if (showSortMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Очистка обработчика при размонтировании компонента или изменении showSortMenu
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortMenu]);

  return (
    <div className="w-full h-auto flex flex-col mx-auto px-4 max-w-full md:max-w-[1440px] mb-[120px]">
      <h3 className="font-medium text-[30px] mdx:text-[45px] xl:text-[55px] leading-[38px] mdx:leading-[50px] xl:leading-[70px] max-w-[710px]">
        Новостройки
      </h3>

      {/* Кнопка сортировки и выпадающее меню */}
      <div className="relative mt-4 xl:mt-8 self-start" ref={sortMenuRef}>
        <button
          onClick={() => setShowSortMenu((prev) => !prev)}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-[16px] mdx:text-[20px]"
        >
          Сортировка
        </button>
        {showSortMenu && (
          <div className="absolute mt-2 bg-white border shadow-lg z-10 w-[300px]">
            <button
              onClick={() => { setSortOption('priceAsc'); setShowSortMenu(false); }}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${sortOption === 'priceAsc' ? 'bg-gray-200' : ''
                }`}
            >
              По цене, сначала дешевые
            </button>
            <button
              onClick={() => { setSortOption('priceDesc'); setShowSortMenu(false); }}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${sortOption === 'priceDesc' ? 'bg-gray-200' : ''
                }`}
            >
              По цене, сначала дорогие
            </button>
            <button
              onClick={() => { setSortOption('areaDesc'); setShowSortMenu(false); }}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${sortOption === 'areaDesc' ? 'bg-gray-200' : ''
                }`}
            >
              По площади, сначала большие
            </button>
            <button
              onClick={() => { setSortOption('areaAsc'); setShowSortMenu(false); }}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${sortOption === 'areaAsc' ? 'bg-gray-200' : ''
                }`}
            >
              По площади, сначала малые
            </button>
          </div>

        )}
      </div>

      <div className="mt-[25px] grid gap-[12px] xl:gap-[20px] mdx:grid-cols-2 xl:grid-cols-3">
        {displayed.map((item) => (
          <Link
            key={item._id}
            href={`/${locale}/new-buildings/${item.slug?.current || ""}`}
            className="w-full flex flex-col"
          >
            <div className="relative w-full h-[350px] xl:h-[550px]">
              <Image
                src={item.mainImage.asset.url}
                alt={item.alt.ru || item.alt.uz || item.alt.en || ""}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="mt-2 p-1">
              <h3 className="text-[28px] mdx:text-[30px] xl:text-[35px] font-medium text-gray-900 leading-[35px] xl:leading-[45px] line-clamp-2">
                {item.subtitle.ru || item.subtitle.uz || item.subtitle.en}
              </h3>
              <h5 className="text-[16px] mdx:text-[20px] text-gray-900 mt-2">
                {item.price}
              </h5>
            </div>
          </Link>
        ))}

        {complexes.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            Нет доступных объектов.
          </p>
        )}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-[50px] space-x-2">
          <button
            className={`px-4 py-2 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-corporate hover:text-white"}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {pagination.map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={index}
                className={`px-4 py-2 border ${page === currentPage ? "bg-corporate text-white" : "hover:bg-corporate hover:text-white"}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-4 py-2">
                ...
              </span>
            )
          )}
          <button
            className={`px-4 py-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-corporate hover:text-white"}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
}

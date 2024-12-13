"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Complex {
  _id: string;
  mainImage: {
    asset: { url: string };
  };
  alt: { ru: string; uz: string; en: string };
  subtitle: { ru: string; uz: string; en: string };
  price?: string;
  slug?: {
    current: string;
  };
}

interface ListBuildingsProps {
  locale: string;
  complexes: Complex[];
}

export default function ListBuildings({ locale, complexes }: ListBuildingsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(complexes.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const displayed = complexes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Функция для генерации номеров страниц с троеточием
  const getPagination = () => {
    const pages = [];

    if (totalPages <= 4) {
      // Если страниц 4 или меньше, отображаем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        // Начальные страницы
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 1) {
        // Конечные страницы
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Средние страницы
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }

    return pages;
  };

  const pagination = getPagination();

  return (
    <div className="w-full h-auto flex flex-col mx-auto px-4 max-w-full md:max-w-[1440px] mb-[120px]">
      <h3 className="font-medium text-[30px] mdx:text-[45px] xl:text-[55px] leading-[38px] mdx:leading-[50px] xl:leading-[70px] max-w-[710px]">
        Новостройки
      </h3>
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
          {pagination.map((page, index) => (
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
          ))}
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


import React from 'react';
import Image from 'next/image';
import rightArrow from "@/public/svg/arrowrightbanners.svg";
import leftArrow from "@/public/svg/arrowleftbanners.svg";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages === 0) return null;

    const generatePageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            // Если страниц мало, отображаем все
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 4) {
            // Начальные страницы
            pages.push(1, 2, 3, 4, 5, '...', totalPages);
        } else if (currentPage >= totalPages - 3) {
            // Конечные страницы
            pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            // Средние страницы
            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }

        return pages;
    };

    const pages = generatePageNumbers();

    return (
        <ul className="flex space-x-2 items-center">
            {/* Кнопка "Назад" */}
            <li className='hidden mdl:block'>
                <button
                    className={`px-4 py-2 rounded transition-all duration-300 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-corporate'
                        }`}
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <Image src={leftArrow} width={25} height={25} alt="Left Arrow" />
                </button>
            </li>

            {/* Номера страниц */}
            {pages.map((page, index) => (
                <React.Fragment key={index}>
                    {page === '...' ? (
                        <li className="px-2 py-2">...</li>
                    ) : (
                        <li>
                            <button
                                className={`px-4 py-2 border rounded transition-all duration-300 ${page === currentPage
                                        ? 'bg-corporate text-white cursor-default'
                                        : 'text-black hover:bg-corporate hover:text-white'
                                    }`}
                                onClick={() => onPageChange(Number(page))}
                                disabled={page === currentPage}
                            >
                                {page}
                            </button>
                        </li>
                    )}
                </React.Fragment>
            ))}

            {/* Кнопка "Вперёд" */}
            <li className='hidden mdl:block'>
                <button
                    className={`px-4 py-2 rounded transition-all duration-300 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50 ' : 'hover:bg-corporate'
                        }`}
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <Image src={rightArrow} width={25} height={25} alt="Right Arrow" />
                </button>
            </li>
        </ul>
    );
};

export default Pagination;

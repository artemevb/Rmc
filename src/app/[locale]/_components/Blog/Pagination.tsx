// Pagination.tsx
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
                        src={leftArrow}
                        width={25}
                        height={25}
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
                        src={rightArrow}
                        width={25}
                        height={25}
                        alt="Right Arrow"
                    />
                </button>
            </li>
        </ul>
    );
};

export default Pagination;

"use client"
import React from 'react';

const StickyMenu = () => {
    return (
        <nav className="sticky top-0 bg-white border-b z-50 max-w-[1440px] w-full mx-auto overflow-x-auto hide-scrollbar">
            <ul className="flex items-center justify-between gap-[30px] mdx:gap-[120px] xl:justify-around p-4 text-[16px] mdx:text-[20px] w-full whitespace-nowrap pb-[25px] mdx:pb-[30px]">
                <li className="flex-shrink-0"><a href="#section1" className="w-full text-gray-700 hover:text-[#E1AF93]">О комплексе</a></li>
                <li className="flex-shrink-0"><a href="#section2" className="w-full text-gray-700 hover:text-[#E1AF93]">Галерея</a></li>
                <li className="flex-shrink-0"><a href="#section3" className="w-full text-gray-700 hover:text-[#E1AF93]">Планировки</a></li>
                <li className="flex-shrink-0"><a href="#section4" className="w-full text-gray-700 hover:text-[#E1AF93]">Условия покупки</a></li>
                <li className="flex-shrink-0"><a href="#section4" className="w-full text-gray-700 hover:text-[#E1AF93]">Инфраструктура</a></li>
                <li className="flex-shrink-0"><a href="#section4" className="w-full text-gray-700 hover:text-[#E1AF93]">Отзывы</a></li>
            </ul>
        </nav>
    );
};

export default StickyMenu;

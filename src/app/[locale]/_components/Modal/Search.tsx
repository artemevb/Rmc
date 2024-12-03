'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl'; // Импортируем useLocale из next-intl
import Image from "next/image";
import search from '@/public/svg/main/search.svg';

interface SearchModalProps {
    onClose: () => void; 
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState<string>(''); // Состояние для текста поиска
    const router = useRouter(); // Хук для навигации
    const locale = useLocale(); // Получаем текущую локаль из next-intl

    // Обработчик для клика по кнопке поиска
    const handleSearchClick = () => {
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            // Переход на страницу с результатами поиска с учётом locale
            router.push(`/${locale}/results?query=${encodeURIComponent(trimmedQuery)}`);
            onClose(); // Закрытие модального окна
        }
    };

    // Обработчик для клика по области за пределами модального окна
    const handleOutsideClick = (e: React.MouseEvent) => {
        const modal = e.target as HTMLElement;
        if (!modal.closest('.modal-content')) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50"
            onClick={handleOutsideClick} // Обработчик клика по фону
        >
            <div className="mt-[102px] xl:mt-[160px] w-full flex justify-center px-[16px]">
                <div className="modal-content bg-white min-w-[320px] max-w-[520px] h-[60px] rounded-[100px] flex justify-between items-center p-[10px] relative w-full">
                    {/* Кнопка закрытия */}
                    <button
                        onClick={onClose}
                        className="absolute center mt-[20px] right-[-75px] text-white hidden slg:block"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 40 40"
                            className="w-[60px] h-[60px]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Введите поисковый запрос..."
                        className="w-full h-[40px] ml-4 border-0 outline-none text-[16px] mdx:text-[20px] text-[#333]"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearchClick();
                            }
                        }}
                    />
                    {/* Кнопка для выполнения поиска */}
                    <div className="absolute right-[25px] flex items-center justify-center">
                        <button
                            onClick={handleSearchClick}
                            className="text-[#4D8BFF] text-[16px] font-medium"
                        >
                            <Image
                                src={search}
                                quality={100}
                                alt="icons search"
                                objectFit="cover"
                                width={26}
                                height={26}
                                className='w-[26px] h-[26px]'
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;

"use client";
import { useState, useEffect, useRef } from 'react'; // Добавлен useRef
import Image from 'next/image';
import build1 from "@/public/images/new_buildings/Building1.png";
import build2 from "@/public/images/new_buildings/Building2.png";
import build3 from "@/public/images/new_buildings/Building3.png";
import build4 from "@/public/images/new_buildings/Building4.png";
import build5 from "@/public/images/new_buildings/Building5.png";
import build6 from "@/public/images/new_buildings/Building6.png";
import arrow from "@/public/svg/arrow-bottom-black.svg";
import rightArrow from "@/public/svg/arrowrightbanners.svg";
import leftArrow from "@/public/svg/arrowleftbanners.svg";

import { useTranslations } from 'next-intl';
import Link from "next/link";

interface NewsCompProps {
    locale: string;
}

interface ImageItem {
    src: string;
    alt: string;
    subtitle: string;
    price: string; // Отображаемая цена, например, 'от $150 000'
    priceValue: number; // Числовое значение цены для фильтрации
    district: string; // Район
    type: string; // Тип жилья
    rooms: string; // Количество комнат
    completionTime: string; // Срок сдачи

}

export default function Main({ locale }: NewsCompProps) {
    const t = useTranslations('NewBuildingsMain');

    // Определение доступных вариантов фильтров
    const districts = [
        'Чиланзар',
        'Marina',
        'Jumeirah',
        'Business Bay',
        'Palm Jumeirah',
    ];

    const housingTypes = [
        'Квартиры',
        'Пентхаусы',
        'Таунхаусы',
    ];

    const roomOptions = [
        'Не важно',
        'Студия',
        '1',
        '2',
        '3',
        '4+',
    ];

    const completionTimes = [
        'Любой',
        'III квартал 2024',
        'IV квартал 2024',
        'I квартал 2025',
        'II квартал 2025',
        // Добавьте больше по необходимости
    ];

    // Определение изображений с дополнительными свойствами
    const images: ImageItem[] = [
        {
            src: build1.src,
            alt: "Жилые комплексы",
            subtitle: "Assalom Sohil",
            price: 'от $150 000',
            priceValue: 150000,
            district: 'Чиланзар',
            type: 'Квартиры',
            rooms: '2',
            completionTime: 'III квартал 2024'
        },
        {
            src: build2.src,
            alt: "Коммерческая недвижимость",
            subtitle: "Assalom Sohil",
            price: 'от $250 000',
            priceValue: 250000,
            district: 'Marina',
            type: 'Пентхаусы',
            rooms: '3',
            completionTime: 'IV квартал 2024'
        },
        {
            src: build3.src,
            alt: "Офисы и коворкинги",
            subtitle: "Assalom Sohil",
            price: 'от $350 000',
            priceValue: 350000,
            district: 'Чиланзар',
            type: 'Таунхаусы',
            rooms: '4+',
            completionTime: 'I квартал 2025'
        },
        {
            src: build4.src,
            alt: "Отели и гостиничные апартаменты",
            subtitle: "Assalom Sohil",
            price: 'от $450 000',
            priceValue: 450000,
            district: 'Business Bay',
            type: 'Квартиры',
            rooms: '1',
            completionTime: 'II квартал 2025'
        },
        {
            src: build5.src,
            alt: "Виллы и таунхаусы",
            subtitle: "Assalom Sohil",
            price: 'от $550 000',
            priceValue: 550000,
            district: 'Palm Jumeirah',
            type: 'Пентхаусы',
            rooms: '4+',
            completionTime: 'III квартал 2024'
        },
        {
            src: build6.src,
            alt: "Виллы и таунхаусы",
            subtitle: "Assalom Sohil",
            price: 'от $650 000',
            priceValue: 650000,
            district: 'Чиланзар',
            type: 'Таунхаусы',
            rooms: 'Студия',
            completionTime: 'IV квартал 2024'
        },
    ];

    // Определение минимальной и максимальной цены
    const prices = images.map(image => image.priceValue);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Инициализация состояний фильтров
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedRooms, setSelectedRooms] = useState<string>('Не важно');
    const [selectedCompletionTime, setSelectedCompletionTime] = useState<string>('Любой');
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: minPrice, max: maxPrice });


    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const totalPages = Math.ceil(images.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);

    // Состояние для отслеживания открытого выпадающего списка
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Реф для контейнера фильтров (добавлено)
    const filtersRef = useRef<HTMLDivElement>(null);



    // Обновление отфильтрованных изображений на основе выбранных фильтров
    useEffect(() => {
        let filtered = images;

        if (selectedDistrict) {
            filtered = filtered.filter(image => image.district === selectedDistrict);
        }

        if (selectedType) {
            filtered = filtered.filter(image => image.type === selectedType);
        }

        if (selectedRooms && selectedRooms !== 'Не важно') {
            if (selectedRooms === '4+') {
                filtered = filtered.filter(image => image.rooms === '4+' || (parseInt(image.rooms) >= 4 && !isNaN(parseInt(image.rooms))));
            } else {
                filtered = filtered.filter(image => image.rooms === selectedRooms);
            }
        }

        if (selectedCompletionTime && selectedCompletionTime !== 'Любой') {
            filtered = filtered.filter(image => image.completionTime === selectedCompletionTime);
        }

        filtered = filtered.filter(image => image.priceValue >= priceRange.min && image.priceValue <= priceRange.max);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        setFilteredImages(filtered.slice(startIndex, endIndex));
    }, [images, selectedDistrict, selectedType, selectedRooms, selectedCompletionTime, priceRange, itemsPerPage, currentPage]);


    // Функция для закрытия всех выпадающих списков
    const closeAllDropdowns = () => {
        setOpenDropdown(null);
    };

    // Функция для переключения выпадающего списка
    const handleDropdownToggle = (dropdown: string) => {
        setOpenDropdown(prev => (prev === dropdown ? null : dropdown));
    };
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };
    // Функция для обработки выбора фильтра
    const handleSelection = (filterType: string, value: string | null) => {
        switch (filterType) {
            case 'district':
                setSelectedDistrict(value);
                break;
            case 'type':
                setSelectedType(value);
                break;
            case 'rooms':
                setSelectedRooms(value || 'Не важно');
                break;
            case 'completionTime':
                setSelectedCompletionTime(value || 'Любой');
                break;
            default:
                break;
        }
        closeAllDropdowns();
    };

    // Обработка изменений в полях цены
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = Number(e.target.value);
        if (type === 'min') {
            setPriceRange(prev => ({ ...prev, min: value }));
        } else {
            setPriceRange(prev => ({ ...prev, max: value }));
        }
    };

    // Применение фильтрации по цене
    const applyPriceFilter = () => {
        closeAllDropdowns();
    };

    // Проверка, активен ли какой-либо фильтр
    const isAnyFilterActive = () => {
        return (
            selectedDistrict ||
            selectedType ||
            selectedRooms !== 'Не важно' ||
            selectedCompletionTime !== 'Любой' ||
            priceRange.min !== minPrice ||
            priceRange.max !== maxPrice
        );
    };

    // Сброс всех фильтров
    const resetAllFilters = () => {
        setSelectedDistrict(null);
        setSelectedType(null);
        setSelectedRooms('Не важно');
        setSelectedCompletionTime('Любой');
        setPriceRange({ min: minPrice, max: maxPrice });
    };

    // Добавление обработчика кликов вне области фильтров (добавлено)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
                closeAllDropdowns();
            }
        };

        // Добавляем обработчик события при монтировании компонента
        document.addEventListener('mousedown', handleClickOutside);

        // Удаляем обработчик события при размонтировании компонента
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='w-full h-auto flex flex-col mx-auto max-xl:px-[10px] max-w-[1440px]'>
            <h3 className='font-medium text-[30px] mdx:text-[45px] xl:text-[55px] leading-[38px] mdx:leading-[50px] xl:leading-[70px] max-w-[710px]'>
                {t('title')}
            </h3>

            {/* Контейнер фильтров с привязкой рефа */}
            <div ref={filtersRef} className='flex flex-wrap gap-[8px] mdx:gap-[12px] mt-[20px] mdx:mt-[40px] xl:mt-[50px] relative'>
                {/* Район Filter */}
                <div className='relative'>
                    <button
                        className='relative bg-[#EDF3F5] inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between'
                        onClick={() => handleDropdownToggle('district')}
                    >
                        <p className='text-[16px] mdx:text-[20px]'>{t('filter-1')}</p>
                        {selectedDistrict && (
                            <span className='absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-[#E1AF93] rounded-full'></span>
                        )}
                        <Image
                            src={arrow.src}
                            alt={arrow.alt}
                            width={20}
                            height={20}
                            quality={100}
                            layout="fixed"
                            objectFit="contain"
                            className='w-full h-full max-h-[20px] max-w-[20px]'
                        />
                    </button>
                    {openDropdown === 'district' && (
                        <div className='absolute left-0 mt-2 z-10 bg-white shadow-lg w-[207px] mdx:w-[344px] h-auto max-h-[215px] overflow-y-auto scrollbar-hide'>
                            <ul>
                                {districts.map((district, idx) => (
                                    <li
                                        key={idx}
                                        className='px-4 py-2 hover:bg-[#FCF7F4] hover:text-[#E1AF93] cursor-pointer border-b text-[16px] mdx:text-[18px]'
                                        onClick={() => handleSelection('district', district)}
                                    >
                                        {district}
                                    </li>
                                ))}
                                {selectedDistrict && (
                                    <li
                                        className='px-4 py-2 hover:bg-[#FCF7F4] hover:text-[#E1AF93] cursor-pointer'
                                        onClick={() => handleSelection('district', null)}
                                    >
                                        {t('all') || 'Очистить фильтр'}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Тип жилья Filter */}
                <div className='relative'>
                    <button
                        className='relative bg-[#EDF3F5] inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between'
                        onClick={() => handleDropdownToggle('type')}
                    >
                        <p className='text-[16px] mdx:text-[20px]'>{t('filter-3')}</p>
                        {selectedType && (
                            <span className='absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-[#E1AF93] rounded-full'></span>
                        )}
                        <Image
                            src={arrow.src}
                            alt={arrow.alt}
                            width={20}
                            height={20}
                            quality={100}
                            layout="fixed"
                            objectFit="contain"
                            className='w-full h-full max-h-[20px] max-w-[20px]'
                        />
                    </button>
                    {openDropdown === 'type' && (
                        <div className='absolute left-0 mt-2 z-10 bg-white shadow-lg w-[207px] mdx:w-[344px] h-auto max-h-[215px] overflow-y-auto scrollbar-hide'>
                            <ul>
                                {housingTypes.map((type, idx) => (
                                    <li
                                        key={idx}
                                        className='px-4 py-2 hover:bg-[#FCF7F4] hover:text-[#E1AF93] cursor-pointer border-b text-[16px] mdx:text-[18px]'
                                        onClick={() => handleSelection('type', type)}
                                    >
                                        {type}
                                    </li>
                                ))}
                                {selectedType && (
                                    <li
                                        className='px-4 py-2 hover:bg-[#FCF7F4] hover:text-[#E1AF93] cursor-pointer'
                                        onClick={() => handleSelection('type', null)}
                                    >
                                        {t('all') || 'Очистить фильтр'}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Количество комнат Filter */}
                <div className='relative'>
                    <button
                        className='relative bg-[#EDF3F5] inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between'
                        onClick={() => handleDropdownToggle('rooms')}
                    >
                        <p className='text-[16px] mdx:text-[20px]'>{t('filter-4')}</p>
                        {selectedRooms !== 'Не важно' && (
                            <span className='absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-[#E1AF93] rounded-full'></span>
                        )}
                        <Image
                            src={arrow.src}
                            alt={arrow.alt}
                            width={20}
                            height={20}
                            quality={100}
                            layout="fixed"
                            objectFit="contain"
                            className='w-full h-full max-h-[20px] max-w-[20px]'
                        />
                    </button>
                    {openDropdown === 'rooms' && (
                        <div className='absolute left-0 mt-2 z-10 bg-white shadow-lg w-[250px] mdx:w-[344px] h-auto max-h-[215px] overflow-y-auto scrollbar-hide'>
                            <ul>
                                {roomOptions.map((room, idx) => (
                                    <li
                                        key={idx}
                                        className='px-4 py-2 hover:bg-[#FCF7F4] hover:text-[#E1AF93] cursor-pointer border-b text-[16px] mdx:text-[18px]'
                                        onClick={() => handleSelection('rooms', room)}
                                    >
                                        {room}
                                    </li>
                                ))}
                                {selectedRooms !== 'Не важно' && (
                                    <li
                                        className='px-4 py-2 hover:bg-[#FCF7F4] hover:text-[#E1AF93] cursor-pointer'
                                        onClick={() => handleSelection('rooms', null)}
                                    >
                                        {t('all') || 'Очистить фильтр'}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Срок сдачи Filter */}
                <div className='relative'>
                    <button
                        className='relative bg-[#EDF3F5] inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between'
                        onClick={() => handleDropdownToggle('completionTime')}
                    >
                        <p className='text-[16px] mdx:text-[20px]'>{t('filter-5')}</p>
                        {selectedCompletionTime !== 'Любой' && (
                            <span className='absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-[#E1AF93] rounded-full'></span>
                        )}
                        <Image
                            src={arrow.src}
                            alt={arrow.alt}
                            width={20}
                            height={20}
                            quality={100}
                            layout="fixed"
                            objectFit="contain"
                            className='w-full h-full max-h-[20px] max-w-[20px]'
                        />
                    </button>
                    {openDropdown === 'completionTime' && (
                        <div className='absolute left-0 mt-2 z-10 bg-white shadow-lg w-[250px] mdx:w-[344px] h-auto max-h-[215px] overflow-y-auto scrollbar-hide'>
                            <ul>
                                {completionTimes.map((time, idx) => (
                                    <li
                                        key={idx}
                                        className='px-4 py-2 hover:bg-[#FCF7F4] hover:text-[#E1AF93] cursor-pointer border-b text-[14px] mdx:text-[16px]'
                                        onClick={() => handleSelection('completionTime', time)}
                                    >
                                        {time}
                                    </li>
                                ))}
                                {selectedCompletionTime !== 'Любой' && (
                                    <li
                                        className='px-4 py-2 hover:bg-[#FCF7F4] hover:text-[#E1AF93] cursor-pointer'
                                        onClick={() => handleSelection('completionTime', null)}
                                    >
                                        {t('all') || 'Очистить фильтр'}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Цена Filter */}
                <div className='relative'>
                    <button
                        className='relative bg-[#EDF3F5] inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between'
                        onClick={() => handleDropdownToggle('price')}
                    >
                        <p className='text-[16px] mdx:text-[20px]'>{t('filter-2')}</p>
                        {(priceRange.min !== minPrice || priceRange.max !== maxPrice) && (
                            <span className='absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-[#E1AF93] rounded-full'></span>
                        )}
                        <Image
                            src={arrow.src}
                            alt={arrow.alt}
                            width={20}
                            height={20}
                            quality={100}
                            layout="fixed"
                            objectFit="contain"
                            className='w-full h-full max-h-[20px] max-w-[20px]'
                        />
                    </button>
                    {openDropdown === 'price' && (
                        <div className='absolute left-0 mt-2 z-10 bg-white shadow-lg w-[250px] mdx:w-[344px] p-4'>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-[14px] mdx:text-[16px]'>{t('one')}:</label>
                                <input
                                    type='number'
                                    value={priceRange.min}
                                    min={minPrice}
                                    max={priceRange.max}
                                    onChange={(e) => handlePriceChange(e, 'min')}
                                    className='border border-gray-300 p-2'
                                />
                                <label className='text-[14px] mdx:text-[16px]'>{t('two')}:</label>
                                <input
                                    type='number'
                                    value={priceRange.max}
                                    min={priceRange.min}
                                    max={maxPrice}
                                    onChange={(e) => handlePriceChange(e, 'max')}
                                    className='border border-gray-300 p-2'
                                />
                                <button
                                    className='mt-2 bg-[#E1AF93] text-white py-1 px-2 rounded'
                                    onClick={applyPriceFilter}
                                >
                                    Применить
                                </button>
                            </div>
                        </div>
                    )}

                </div>
                {isAnyFilterActive() && (
                    <div className='mt-1'>
                        <button
                            className=' text-[#E1AF93] py-2 px-4 underline font-medium text-[14px] mdx:text-[18px]'
                            onClick={resetAllFilters}
                        >
                            {t('clear')}
                        </button>
                    </div>
                )}
            </div>

            {/* Отображение отфильтрованных изображений */}
            <div className='mt-[25px] grid gap-[12px] xl:gap-[20px] mdx:grid-cols-2 xl:grid-cols-3'>
                {filteredImages.map((image, index) => (
                    <div key={index} className='relative'>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={1000}
                            height={1000}
                            quality={100}
                            layout="responsive"
                            objectFit="cover"
                            className='w-full h-full min-h-[400px]'
                        />
                        <h3 className='text-[28px] mdx:text-[30px] xl:text-[35px] font-medium absolute bottom-[38px] left-2 text-white p-2 leading-[35px] xl:leading-[45px] line-clamp-2'>
                            {image.subtitle}
                        </h3>
                        <h5 className='text-[16px] mdx:text-[20px] absolute bottom-2 left-2 text-white p-2'>
                            {image.price}
                        </h5>
                    </div>
                ))}
                {filteredImages.length === 0 && (
                    <p className='col-span-full text-center text-gray-500 '>
                        {t('noResults') || 'Нет доступных объектов.'}
                    </p>
                )}
            </div>
            <div className='flex justify-between items-center mt-[20px]'>
                {/* Pagination */}
                <div>
                    <ul className="flex space-x-2">
                        {/* Кнопка "Назад" */}
                        <li>
                            <button
                                className={`px-4 py-2 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#E1AF93]'}`}
                                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
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
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}

                        {/* Кнопка "Вперёд" */}
                        <li>
                            <button
                                className={`px-4 py-2 rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#E1AF93]'}`}
                                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
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
                </div>

                {/* Items per page */}
                <div>
                    <label htmlFor="itemsPerPage" className="mr-2">Показывать на странице:</label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="py-2 px-4 border"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={12}>12</option>
                        <option value={20}>20</option>

                    </select>
                </div>
            </div>
            <div className='max-xl:px-[10px] flex justify-center w-full'>
                <Link href={`/${locale}/catalog`}>
                    <button className="bg-[#E1AF93] hover:bg-[#EAC7B4] text-[17px] font-semibold text-white py-2 px-4 mdx:py-3 w-[223px] mt-[40px] mdx:mt-[50px] xl:mt-[60px]">
                        {t('button-more')}
                    </button>
                </Link>
            </div>
        </div>
    )
}

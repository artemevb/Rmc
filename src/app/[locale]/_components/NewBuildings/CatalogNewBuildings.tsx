"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import arrow from "@/public/svg/arrow-bottom-black.svg";
import { useTranslations } from 'next-intl';
// import Link from "next/link";
import {
    GET_RESIDENTIAL_COMPLEXES,
    GET_DISTRICTS,
    GET_HOUSING_TYPES,
    GET_ROOMS,
    GET_COMPLETION_TIMES,
} from './queries';
import { ResidentialComplex, District, HousingType, Room, CompletionTime } from './types';
import { client } from '../../../../sanity/lib/client';

interface InvestProps {
    locale: string;
}

interface ImageItem {
    _id: string;
    mainImageUrl: string;
    mainImageAlt: string;
    subtitle: string;
    price: string;
    priceValue: number;
    district: string;
    type: string;
    rooms: string;
    completionTime: string;
}

export default function Invest({ locale }: InvestProps) {
    const t = useTranslations('NewBuildings.Catalog');
    const [images, setImages] = useState<ImageItem[]>([]);
    const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [housingTypes, setHousingTypes] = useState<HousingType[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [completionTimes, setCompletionTimes] = useState<CompletionTime[]>([]);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Initialize priceRange as state after data is fetched
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
    // Максимальное количество отображаемых зданий
    const [visibleCount, setVisibleCount] = useState<number>(6);

    // Функция для загрузки еще 6 зданий
    const loadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Fetch complexes
                const complexes: ResidentialComplex[] = await client.fetch(GET_RESIDENTIAL_COMPLEXES);

                // Fetch filter options
                const fetchedDistricts: District[] = await client.fetch(GET_DISTRICTS);
                const fetchedHousingTypes: HousingType[] = await client.fetch(GET_HOUSING_TYPES);
                const fetchedRooms: Room[] = await client.fetch(GET_ROOMS);
                const fetchedCompletionTimes: CompletionTime[] = await client.fetch(GET_COMPLETION_TIMES);

                // Transform complexes
                const transformedData: ImageItem[] = complexes.map(item => ({
                    _id: item._id,
                    mainImageUrl: item.mainImage.asset.url,
                    mainImageAlt: item.alt[locale as keyof typeof item.alt] || item.alt['ru'],
                    subtitle: item.subtitle[locale as keyof typeof item.subtitle] || item.subtitle['ru'],
                    price: item.price,
                    priceValue: item.priceValue,
                    district: item.district
                        ? item.district[`name_${locale}` as keyof District] || item.district.name_ru
                        : '',
                    type: item.type
                        ? item.type[`name_${locale}` as keyof HousingType] || item.type.name_ru
                        : '',
                    rooms: item.rooms
                        ? item.rooms[`number_${locale}` as keyof Room] || item.rooms.number_ru
                        : '',
                    completionTime: item.completionTime
                        ? item.completionTime[`term_${locale}` as keyof CompletionTime] || item.completionTime.term_ru
                        : '',
                }));

                setImages(transformedData);
                setFilteredImages(transformedData);

                setDistricts(fetchedDistricts);
                setHousingTypes(fetchedHousingTypes);
                setRooms(fetchedRooms);
                setCompletionTimes(fetchedCompletionTimes);

                // Determine min and max prices
                const prices = transformedData.map(image => image.priceValue);
                const min = Math.min(...prices);
                const max = Math.max(...prices);
                setMinPrice(min);
                setMaxPrice(max);
                setPriceRange({ min, max });

                setIsLoading(false);
            } catch (err) {
                console.error('Ошибка при получении данных из Sanity:', err);
                setError('Не удалось загрузить данные.');
                setIsLoading(false);
            }
        };

        fetchData();
    }, [locale]);

    // Инициализация состояний фильтров
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedRooms, setSelectedRooms] = useState<string>('Не важно');
    const [selectedCompletionTime, setSelectedCompletionTime] = useState<string>('Любой');

    // Состояние для отслеживания открытого выпадающего списка
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

        setFilteredImages(filtered);
    }, [selectedDistrict, selectedType, selectedRooms, selectedCompletionTime, priceRange, images]);

    // Закрытие всех выпадающих списков
    const closeAllDropdowns = () => {
        setOpenDropdown(null);
    };

    // Переключение состояния выпадающего списка
    const handleDropdownToggle = (dropdown: string) => {
        setOpenDropdown(prev => (prev === dropdown ? null : dropdown));
    };

    // Обработка выбора фильтра
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

    // Обработка изменения цены
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = Number(e.target.value);
        if (type === 'min') {
            setPriceRange(prev => ({ ...prev, min: value }));
        } else {
            setPriceRange(prev => ({ ...prev, max: value }));
        }
    };

    const applyPriceFilter = () => {
        closeAllDropdowns();
    };

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

    const resetAllFilters = () => {
        setSelectedDistrict(null);
        setSelectedType(null);
        setSelectedRooms('Не важно');
        setSelectedCompletionTime('Любой');
        setPriceRange({ min: minPrice, max: maxPrice });
    };

    // Закрытие выпадающих списков при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
                closeAllDropdowns();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Отображение загрузки или ошибки
    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p className='text-red-500'>{error}</p>;
    }

    return (
        <div className='w-full h-auto flex flex-col mx-auto max-xl:px-[10px] max-w-[1440px]'>
            <h3 className='font-medium text-[30px] mdx:text-[45px] xl:text-[55px] leading-[38px] mdx:leading-[50px] xl:leading-[70px] max-w-[710px]'>
                {t('title')}
            </h3>

            {/* Filters container with ref */}
            <div ref={filtersRef} className='flex flex-wrap gap-[8px] mdx:gap-[12px] mt-[20px] mdx:mt-[40px] xl:mt-[50px] relative'>
                {/* District Filter */}
                <div className='relative'>
                    <button
                        className='relative bg-[#EDF3F5] inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between transition-all duration-300'
                        onClick={() => handleDropdownToggle('district')}
                    >
                        <p className='text-[16px] mdx:text-[20px]'>{t('filter-1')}</p>
                        {selectedDistrict && (
                            <span className='absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-corporate rounded-full'></span>
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
                                {districts.map((district) => {
                                    const districtName = district[`name_${locale}` as keyof District] || district.name_ru;
                                    return (
                                        <li
                                            key={district._id}
                                            className='px-4 py-2 hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer border-b text-[16px] mdx:text-[18px]'
                                            onClick={() => handleSelection('district', districtName)}
                                        >
                                            {districtName}
                                        </li>
                                    );
                                })}
                                {selectedDistrict && (
                                    <li
                                        className='px-4 py-2 hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer'
                                        onClick={() => handleSelection('district', null)}
                                    >
                                        {t('all') || 'Очистить фильтр'}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Housing Type Filter */}
                <div className='relative'>
                    <button
                        className='relative bg-[#EDF3F5] inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between transition-all duration-300'
                        onClick={() => handleDropdownToggle('type')}
                    >
                        <p className='text-[16px] mdx:text-[20px]'>{t('filter-3')}</p>
                        {selectedType && (
                            <span className='absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-corporate rounded-full'></span>
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
                                {housingTypes.map((type) => {
                                    const typeName = type[`name_${locale}` as keyof HousingType] || type.name_ru;
                                    return (
                                        <li
                                            key={type._id}
                                            className='px-4 py-2 hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer border-b text-[16px] mdx:text-[18px]'
                                            onClick={() => handleSelection('type', typeName)}
                                        >
                                            {typeName}
                                        </li>
                                    );
                                })}
                                {selectedType && (
                                    <li
                                        className='px-4 py-2 hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer'
                                        onClick={() => handleSelection('type', null)}
                                    >
                                        {t('all') || 'Очистить фильтр'}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Rooms Filter */}
                <div className='relative'>
                    <button
                        className='relative bg-[#EDF3F5] inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between transition-all duration-300'
                        onClick={() => handleDropdownToggle('rooms')}
                    >
                        <p className='text-[16px] mdx:text-[20px]'>{t('filter-4')}</p>
                        {selectedRooms !== 'Не важно' && (
                            <span className='absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-corporate rounded-full'></span>
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
                                {rooms.map((room) => {
                                    const roomNumber = room[`number_${locale}` as keyof Room] || room.number_ru;
                                    return (
                                        <li
                                            key={room._id}
                                            className='px-4 py-2 hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer border-b text-[16px] mdx:text-[18px]'
                                            onClick={() => handleSelection('rooms', roomNumber)}
                                        >
                                            {roomNumber}
                                        </li>
                                    );
                                })}
                                {selectedRooms !== 'Не важно' && (
                                    <li
                                        className='px-4 py-2 hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer'
                                        onClick={() => handleSelection('rooms', null)}
                                    >
                                        {t('all') || 'Очистить фильтр'}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Completion Time Filter */}
                <div className='relative'>
                    <button
                        className='relative bg-[#EDF3F5] inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between transition-all duration-300'
                        onClick={() => handleDropdownToggle('completionTime')}
                    >
                        <p className='text-[16px] mdx:text-[20px]'>{t('filter-5')}</p>
                        {selectedCompletionTime !== 'Любой' && (
                            <span className='absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-corporate rounded-full'></span>
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
                                {completionTimes.map((time) => {
                                    const term = time[`term_${locale}` as keyof CompletionTime] || time.term_ru;
                                    return (
                                        <li
                                            key={time._id}
                                            className='px-4 py-2 hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer border-b text-[14px] mdx:text-[16px]'
                                            onClick={() => handleSelection('completionTime', term)}
                                        >
                                            {term}
                                        </li>
                                    );
                                })}
                                {selectedCompletionTime !== 'Любой' && (
                                    <li
                                        className='px-4 py-2 hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer'
                                        onClick={() => handleSelection('completionTime', 'Любой')}
                                    >
                                        {t('all') || 'Очистить фильтр'}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Price Filter */}
                <div className='relative'>
                    <button
                        className='relative bg-[#EDF3F5] inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between transition-all duration-300'
                        onClick={() => handleDropdownToggle('price')}
                    >
                        <p className='text-[16px] mdx:text-[20px]'>{t('filter-2')}</p>
                        {(priceRange.min !== minPrice || priceRange.max !== maxPrice) && (
                            <span className='absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-corporate rounded-full'></span>
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
                                    className='mt-2 bg-corporate text-white py-1 px-2 rounded transition-all duration-300'
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
                            className=' text-corporate py-2 px-4 underline font-medium text-[14px] mdx:text-[18px]'
                            onClick={resetAllFilters}
                        >
                            {t('clear')}
                        </button>
                    </div>
                )}
            </div>

            {/* Display filtered images */}
            <div className='mt-[25px] grid gap-[12px] xl:gap-[20px] mdx:grid-cols-2 xl:grid-cols-3'>
                {filteredImages.slice(0, visibleCount).map((image) => (
                    <div key={image._id} className="relative">
                        <Image
                            src={image.mainImageUrl}
                            alt={image.mainImageAlt}
                            width={1000}
                            height={1000}
                            quality={100}
                            layout="responsive"
                            objectFit="cover"
                            className="w-full h-full min-h-[400px]"
                        />
                        <h3 className="text-[28px] mdx:text-[30px] xl:text-[35px] font-medium absolute bottom-[38px] left-2 text-white p-2 leading-[35px] xl:leading-[45px] line-clamp-2">
                            {image.subtitle}
                        </h3>
                        <h5 className="text-[16px] mdx:text-[20px] absolute bottom-2 left-2 text-white p-2">
                            {image.price}
                        </h5>
                    </div>
                ))}

                {filteredImages.length === 0 && (
                    <p className="col-span-full text-center text-gray-500 ">{t("noResults") || "Нет доступных объектов."}</p>
                )}
            </div>
            {filteredImages.length > visibleCount && (
                <div className='max-xl:px-[10px] flex justify-center w-full'>
                    {/* <Link href={`/${locale}/catalog`}> */}
                    <button onClick={loadMore} className="bg-corporate hover:bg-hover_corporate text-[17px] font-semibold text-white py-2 px-4 mdx:py-3 w-[223px] mt-[40px] mdx:mt-[50px] xl:mt-[60px] transition-all duration-300">
                        {t('button-more')}
                    </button>
                    {/* </Link> */}
                </div>
            )}
        </div>
    );
}

"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import arrow from "@/public/svg/arrow-bottom-black.svg";
import rightArrow from "@/public/svg/arrowrightbanners.svg";
import leftArrow from "@/public/svg/arrowleftbanners.svg";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import {
    GET_RESIDENTIAL_COMPLEXES,
    GET_DISTRICTS,
    GET_HOUSING_TYPES,
    GET_ROOMS,
    GET_COMPLETION_TIMES,
} from '../NewBuildings/queries';
import { ResidentialComplex, District, HousingType, Room, CompletionTime } from '../NewBuildings/types';
import { client } from '../../../../sanity/lib/client';
import { ClimbingBoxLoader } from 'react-spinners';
import { Range } from 'react-range';
import arrow_top from "@/public/svg/arrow-top-white.svg";

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
    slug: {
        current: string;
    };
}

export default function Invest({ locale }: InvestProps) {
    const t = useTranslations('NewBuildingsMain');
    const [images, setImages] = useState<ImageItem[]>([]);
    const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [housingTypes, setHousingTypes] = useState<HousingType[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [completionTimes, setCompletionTimes] = useState<CompletionTime[]>([]);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const filtersRef = useRef<HTMLDivElement>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedRooms, setSelectedRooms] = useState<string>('Не важно');
    const [selectedCompletionTime, setSelectedCompletionTime] = useState<string>('Любой');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(6);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const complexes: ResidentialComplex[] = await client.fetch(GET_RESIDENTIAL_COMPLEXES);
                const fetchedDistricts: District[] = await client.fetch(GET_DISTRICTS);
                const fetchedHousingTypes: HousingType[] = await client.fetch(GET_HOUSING_TYPES);
                const fetchedRooms: Room[] = await client.fetch(GET_ROOMS);
                const fetchedCompletionTimes: CompletionTime[] = await client.fetch(GET_COMPLETION_TIMES);

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
                    slug: {
                        current: item.slug?.current || '',
                    },
                }));

                setImages(transformedData);
                setFilteredImages(transformedData);
                setDistricts(fetchedDistricts);
                setHousingTypes(fetchedHousingTypes);
                setRooms(fetchedRooms);
                setCompletionTimes(fetchedCompletionTimes);

                const prices = transformedData.map(image => image.priceValue);
                const min = Math.min(...prices);
                const max = Math.max(...prices);

                setMinPrice(min);
                setMaxPrice(max);
                setPriceRange({ min, max });
                setIsLoading(false);
            } catch (err) {
                console.error('Ошибка при получении данных из Sanity:', err);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [locale]);

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

    const closeAllDropdowns = () => {
        setOpenDropdown(null);
    };

    const handleDropdownToggle = (dropdown: string) => {
        setOpenDropdown(prev => (prev === dropdown ? null : dropdown));
    };

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

    const handlePriceChange = (values: number[]) => {
        setPriceRange({ min: values[0], max: values[1] });
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

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredImages.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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

    const loaderStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    };

    if (isLoading) {
        return (
            <div style={loaderStyle}>
                <ClimbingBoxLoader size={15} color="#E94B50" loading={isLoading} cssOverride={{}} speedMultiplier={1} />
            </div>
        );
    }

    return (
        <>
            <div className='w-full h-auto flex flex-col mx-auto px-4 max-w-full md:max-w-[1440px]'>
                <h2 className='font-medium text-[30px] mdx:text-[45px] xl:text-[55px] leading-[38px] mdx:leading-[50px] xl:leading-[70px] max-w-[710px]'>
                    {t('title')}
                </h2>
                <div ref={filtersRef} className='flex flex-wrap gap-[8px] mdx:gap-[12px] mt-[20px] mdx:mt-[40px] xl:mt-[50px] relative'>
                    {/* Фильтр District */}
                    <div className='relative'>
                        <button
                            className={`relative inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between transition-all duration-300 ${openDropdown === 'district' ? 'bg-corporate text-white' : 'bg-[#EDF3F5]'}`}
                            onClick={() => handleDropdownToggle('district')}
                        >
                            <p className="text-[16px] mdx:text-[20px]">{t('filter-1')}</p>
                            {selectedDistrict && (
                                <span className="absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-corporate rounded-full"></span>
                            )}
                            <Image
                                src={openDropdown === 'district' ? arrow_top : arrow}
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
                                                className={`px-4 py-2 hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer border-b text-[16px] mdx:text-[18px] ${selectedDistrict === districtName ? 'bg-corporate text-white' : ''}`}
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

                    {/* Фильтр Type */}
                    <div className='relative'>
                        <button
                            className={`relative inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between text-nowrap transition-all duration-300 ${openDropdown === 'type' ? 'bg-corporate text-white' : 'bg-[#EDF3F5]'}`}
                            onClick={() => handleDropdownToggle('type')}
                        >
                            <p className="text-[16px] mdx:text-[20px]">{t('filter-3')}</p>
                            {selectedType && (
                                <span className="absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-corporate rounded-full"></span>
                            )}
                            <Image
                                src={openDropdown === 'type' ? arrow_top : arrow}
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
                                                className={`px-4 py-2 hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer border-b text-[16px] mdx:text-[18px] ${selectedType === typeName ? 'bg-corporate text-white' : ''}`}
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

                    {/* Фильтр Rooms */}
                    <div className='relative'>
                        <button
                            className={`relative inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between transition-all text-nowrap duration-300 ${openDropdown === 'rooms' ? 'bg-corporate text-white' : 'bg-[#EDF3F5]'}`}
                            onClick={() => handleDropdownToggle('rooms')}
                        >
                            <p className="text-[16px] mdx:text-[20px]">{t('filter-4')}</p>
                            {selectedRooms !== 'Не важно' && (
                                <span className="absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-corporate rounded-full"></span>
                            )}
                            <Image
                                src={openDropdown === 'rooms' ? arrow_top : arrow}
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
                                                className={`px-4 py-2 hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer border-b text-[16px] mdx:text-[18px] ${selectedRooms === roomNumber ? 'bg-corporate text-white' : ''}`}
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

                    {/* Фильтр Completion Time */}
                    <div className='relative'>
                        <button
                            className={`relative inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between transition-all text-nowrap duration-300 ${openDropdown === 'completionTime' ? 'bg-corporate text-white' : 'bg-[#EDF3F5]'}`}
                            onClick={() => handleDropdownToggle('completionTime')}
                        >
                            <p className="text-[16px] mdx:text-[20px]">{t('filter-5')}</p>
                            {selectedCompletionTime !== 'Любой' && (
                                <span className="absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-corporate rounded-full"></span>
                            )}
                            <Image
                                src={openDropdown === 'completionTime' ? arrow_top : arrow}
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
                                                className={`px-4 py-2 hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer border-b text-[16px] mdx:text-[18px] ${selectedCompletionTime === term ? 'bg-corporate text-white' : ''}`}
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

                    {/* Фильтр Price */}
                    <div className='relative'>
                        <button
                            className={`relative inline-flex items-center gap-[4px] py-[10px] px-[12px] justify-between transition-all duration-300 ${openDropdown === 'price' ? 'bg-corporate text-white' : 'bg-[#EDF3F5]'}`}
                            onClick={() => handleDropdownToggle('price')}
                        >
                            <p className='text-[16px] mdx:text-[20px]'>{t('filter-2')}</p>
                            {(priceRange.min !== minPrice || priceRange.max !== maxPrice) && (
                                <span className='absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-corporate rounded-full'></span>
                            )}
                            <Image
                                src={openDropdown === 'price' ? arrow_top : arrow}
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
                            <div className='absolute md:left-0 mt-2 z-10 bg-white shadow-lg w-[250px] mdx:w-[344px] p-4 max-md:right-[-10px]'>
                                <div className='flex flex-row w-full mb-[25px]'>
                                    <div className='flex flex-col w-full'>
                                        <label className='text-[14px] mdx:text-[16px] text-[#858585] mb-[5px]'>{t('one')}</label>
                                        <input
                                            type='number'
                                            value={priceRange.min}
                                            min={minPrice}
                                            max={priceRange.max}
                                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                                            className='border border-gray-300 p-2'
                                        />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label className='text-[14px] mdx:text-[16px] text-[#858585] mb-[5px]'>{t('two')}</label>
                                        <input
                                            type='number'
                                            value={priceRange.max}
                                            min={priceRange.min}
                                            max={maxPrice}
                                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                                            className='border border-gray-300 p-2'
                                        />
                                    </div>
                                </div>
                                <Range
                                    step={10000}
                                    min={minPrice}
                                    max={maxPrice}
                                    values={[priceRange.min, priceRange.max]}
                                    onChange={handlePriceChange}
                                    renderTrack={({ props, children }) => (
                                        <div {...props} className='h-1 bg-gray-300 rounded-md relative'>
                                            {/* Красная часть (выбранный диапазон) */}
                                            <div
                                                className="absolute top-0 left-0 h-1 bg-red-500"
                                                style={{
                                                    width: `${((priceRange.max - priceRange.min) / (maxPrice - minPrice)) * 100}%`,
                                                    left: `${((priceRange.min - minPrice) / (maxPrice - minPrice)) * 100}%`,
                                                }}
                                            />
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div {...props} className='w-[22px] h-[22px] bg-corporate rounded-full transition-all duration-100' />
                                    )}
                                />

                                <div className='flex justify-between mt-[4px] text-[#858585]'>
                                    <span>{priceRange.min} AED</span>
                                    <span>{priceRange.max} AED</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {isAnyFilterActive() && (
                    <div className='mt-1'>
                        <button
                            className=' text-corporate py-2 px-4 underline font-medium text-[14px] mdx:text-[18px] transition-all duration-300'
                            onClick={resetAllFilters}
                        >
                            {t('clear')}
                        </button>
                    </div>
                )}
            </div>
            <div className='w-full h-auto flex flex-col mx-auto px-4 max-w-full md:max-w-[1440px] mb-[120px] mdl:mb-[150px] xl:mb-[200px]'>
                <div className='mt-[25px] grid gap-[12px] xl:gap-[20px] mdx:grid-cols-2 xl:grid-cols-3'>
                    {currentItems.map((image) => (
                        <Link
                            key={image._id}
                            href={`/${locale}/new-buildings/${image.slug?.current || ''}`}
                            className='w-full flex flex-col'
                        >
                            <div className='relative w-full h-[350px] xl:h-[550px]'>
                                <Image
                                    src={image.mainImageUrl}
                                    alt={image.mainImageAlt}
                                    layout="fill"
                                    objectFit="cover"
                                    className="w-full h-full"
                                />
                            </div>
                            {/* текст, который будет распологаться на самой карточке*/}
                            {/* <h3 className="text-[28px] mdx:text-[30px] xl:text-[35px] font-medium absolute bottom-[38px] left-2 text-white p-2 leading-[35px] xl:leading-[45px] line-clamp-2">
                                {image.subtitle}
                            </h3>
                            <h5 className="text-[16px] mdx:text-[20px] absolute bottom-2 left-2 text-white p-2">
                                {image.price}
                            </h5> */}
                            <div className="mt-2 p-1">
                                <h3 className="text-[28px] mdx:text-[30px] xl:text-[35px] font-medium text-gray-900 leading-[35px] xl:leading-[45px] line-clamp-2">
                                    {image.subtitle}
                                </h3>
                                <h5 className="text-[16px] mdx:text-[20px] text-gray-900 mt-2">
                                    {image.price}
                                </h5>
                                <div className='flex gap-[20%] '>
                                    {image.type && (
                                        <p className="text-[14px] mdx:text-[16px] text-gray-700 mt-1">
                                            {image.type}
                                        </p>
                                    )}
                                    {/* {image.completionTime && (
                                        <h5 className="text-[14px] mdx:text-[16px] text-gray-700 mt-1">
                                            {image.completionTime}
                                        </h5>
                                    )} */}
                                </div>
                            </div>
                        </Link>
                    ))}

                    {filteredImages.length === 0 && (
                        <p className="col-span-full text-center text-gray-500">
                            {t("noResults") || "Нет доступных объектов."}
                        </p>
                    )}
                </div>


                <div className='flex flex-row-reverse justify-center mdx:justify-between items-center mt-[50px] mdx:mt-[70px]'>
                    <div>
                        <ul className="flex space-x-2">
                            <li>
                                <button
                                    className={`px-2 py-2 transition-all duration-300 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-corporate'}`}
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
                            {pages.map((page) => (
                                <li key={page}>
                                    <button
                                        className={`px-4 py-2 border transition-all duration-300 ${page === currentPage ? 'bg-corporate text-white' : 'hover:bg-corporate'
                                            }`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    className={`px-2 py-2 transition-all duration-300 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-corporate'}`}
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

                    <div className='hidden mdx:block'>
                        <label htmlFor="itemsPerPage" className="mr-2 text-[#858585] text-[18px]">{t('see-pages')}</label>
                        <select
                            id="itemsPerPage"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="py-2 px-2 border "
                        >
                            <option value={6}>6</option>
                            <option value={9}>9</option>
                            <option value={12}>12</option>
                            <option value={20}>20</option>

                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}


"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Range } from "react-range";
import arrow from "@/public/svg/arrow-bottom-black.svg";
import arrow_top from "@/public/svg/arrow-top-white.svg";
import { useTranslations } from "next-intl";
import { client } from "@/src/sanity/lib/client";
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

interface LayoutProps {
    locale: 'ru' | 'uz' | 'en';
    complexSlug: string;
}

interface LayoutItem {
    _id: string;
    title: {
        ru: string;
        uz: string;
        en: string;
    };
    image?: {
        asset?: {
            _id: string;
            url: string;
        };
    };
    floor?: {
        floor: number;
    };
    home: string;
    entrance: string;
    price: string;
    rooms?: {
        rooms: number;
    };
    residentialComplex?: {
        title: string;
        slug: string;
    };
}

// Utility function to extract numeric value from price string
function extractNumericValue(priceString: string): number {
    // Remove all non-numeric characters except dots and commas
    let numericString = priceString.replace(/[^\d.,]/g, '').replace(/\s/g, '');
    // Handle both dot and comma as decimal separators
    if (numericString.indexOf('.') !== -1 && numericString.indexOf(',') !== -1) {
        numericString = numericString.replace(',', '');
    } else if (numericString.indexOf(',') !== -1) {
        numericString = numericString.replace(',', '.');
    }
    const numericValue = parseFloat(numericString);
    return numericValue;
}

export default function Layout({ locale, complexSlug }: LayoutProps) {
    const t = useTranslations("Building_page_main.Layout");

    // States for filters
    const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
    const [selectedRooms, setSelectedRooms] = useState<number | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
    const [inputMin, setInputMin] = useState<number>(0);
    const [inputMax, setInputMax] = useState<number>(0);

    // States for dropdowns
    const [isFloorDropdownOpen, setIsFloorDropdownOpen] = useState(false);
    const [isRoomsDropdownOpen, setIsRoomsDropdownOpen] = useState(false);
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

    // States for data and loading
    const [layouts, setLayouts] = useState<LayoutItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // States for dynamic min and max prices
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    // Ref for filters container
    const filtersRef = useRef<HTMLDivElement>(null);

    // States for Lightbox
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<{ src: string; alt: string } | null>(null);

    // Function to open Lightbox
    const openLightbox = (image: { src: string; alt: string }) => {
        setCurrentImage(image);
        setLightboxOpen(true);
    };

    // Fetch data from Sanity
    useEffect(() => {
        if (!complexSlug) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const query = `
                    *[_type == "layouts" && residentialComplex->slug.current == $slug]{
                        _id,
                        title,
                        image{
                            asset->{
                                _id,
                                url
                            }
                        },
                        floor->{
                            floor
                        },
                        home,
                        entrance,
                        price,
                        rooms->{
                            rooms
                        },
                        residentialComplex->{
                            title,
                            slug
                        }
                    }
                `;
                const params = { slug: complexSlug };
                const data: LayoutItem[] = await client.fetch(query, params);
                setLayouts(data);

                if (data.length > 0) {
                    const prices = data
                        .map(item => extractNumericValue(item.price))
                        .filter(price => !isNaN(price) && price > 0);

                    if (prices.length === 0) {
                        setMinPrice(0);
                        setMaxPrice(0);
                        setPriceRange([0, 0]);
                        setInputMin(0);
                        setInputMax(0);
                    } else {
                        const computedMinPrice = Math.min(...prices);
                        const computedMaxPrice = Math.max(...prices);

                        setMinPrice(computedMinPrice);
                        setMaxPrice(computedMaxPrice);

                        setPriceRange([computedMinPrice, computedMaxPrice]);
                        setInputMin(computedMinPrice);
                        setInputMax(computedMaxPrice);
                    }
                } else {
                    setPriceRange([0, 0]);
                    setInputMin(0);
                    setInputMax(0);
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err as Error);
                setLoading(false);
            }
        };

        fetchData();
    }, [complexSlug]);

    // Get unique floors and rooms for filters
    const floors = [
        ...new Set(layouts.map((item) => item.floor?.floor).filter((floor): floor is number => floor !== undefined))
    ].sort((a, b) => a - b);

    const rooms = [
        ...new Set(layouts.map((item) => item.rooms?.rooms).filter((rooms): rooms is number => rooms !== undefined))
    ].sort((a, b) => a - b);

    // Filtered layouts based on selected filters
    const filteredLayouts = layouts.filter((item) => {
        const floorMatch = !selectedFloor || item.floor?.floor === selectedFloor;
        const roomsMatch = !selectedRooms || item.rooms?.rooms === selectedRooms;
        const itemPriceNumeric = extractNumericValue(item.price);
        const priceMatch = itemPriceNumeric >= priceRange[0] && itemPriceNumeric <= priceRange[1];
        return floorMatch && roomsMatch && priceMatch;
    });

    // Reset all filters
    const resetFilters = () => {
        setSelectedFloor(null);
        setSelectedRooms(null);
        setPriceRange([minPrice, maxPrice]);
        setInputMin(minPrice);
        setInputMax(maxPrice);
    };

    // Check if any filter is active
    const isFilterActive =
        selectedFloor !== null ||
        selectedRooms !== null ||
        priceRange[0] !== minPrice ||
        priceRange[1] !== maxPrice;

    // Handle input changes
    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setInputMin(value);
        if (value <= priceRange[1] && value >= minPrice) {
            setPriceRange([value, priceRange[1]]);
        }
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setInputMax(value);
        if (value >= priceRange[0] && value <= maxPrice) {
            setPriceRange([priceRange[0], value]);
        }
    };

    // Handle clicks outside filters
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
                setIsFloorDropdownOpen(false);
                setIsRoomsDropdownOpen(false);
                setIsPriceDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error || layouts.length === 0) {
        return null;
    }

    return (
        <div className="w-full h-full flex flex-col mx-auto max-w-[1440px] max-3xl:px-[16px]">
            <h3 className="text-[30px] font-medium mdx:text-[45px] xl:text-[55px] leading-[38px] w-full max-w-[328px] mdx:max-w-[542px] xl:max-w-[100%]">
                {t("title")}
            </h3>
            <div
                className="w-full flex flex-col mdx:flex-row gap-[8px] mt-[20px] mdx:mt-[40px] xl:mt-[50px] text-[16px] mdx:text-[20px] relative"
                ref={filtersRef}
            >
                <div className="flex flex-row w-full gap-[8px] mdl:max-w-[277px]">
                    {/* Floor Filter */}
                    <div className="relative w-full max-w-[133px]">
                        <button
                            className={`w-full flex items-center justify-center gap-[10px] h-[43px] mdx:h-[53px] px-4 ${isFloorDropdownOpen
                                ? "bg-corporate text-white"
                                : "bg-[#EDF3F5]"
                                }`}
                            onClick={() => {
                                setIsFloorDropdownOpen(!isFloorDropdownOpen);
                                setIsRoomsDropdownOpen(false);
                                setIsPriceDropdownOpen(false);
                            }}
                        >
                            {t("floor")}
                            <Image
                                quality={100}
                                src={isFloorDropdownOpen ? arrow_top : arrow}
                                alt="arrow"
                                width={20}
                                height={20}
                            />
                            {selectedFloor && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    className="absolute right-2 top-2"
                                >
                                    <circle cx="5" cy="5" r="5" fill="#E94B50" />
                                </svg>
                            )}
                        </button>
                        {isFloorDropdownOpen && (
                            <ul className="absolute z-10 bg-white border w-[150px] mdx:w-[170px] mt-1 max-h-60 overflow-auto">
                                <li
                                    className={`px-4 py-2 cursor-pointer hover:bg-[#FCE8E9] ${!selectedFloor
                                        ? "bg-[#FCE8E9] text-corporate"
                                        : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedFloor(null);
                                        setIsFloorDropdownOpen(false);
                                    }}
                                >
                                    {t("all_floor")}
                                </li>
                                {floors.map((floor, index) => (
                                    <li
                                        key={index}
                                        className={`px-4 py-2 cursor-pointer hover:bg-[#FCE8E9] ${selectedFloor === floor
                                            ? "bg-[#FCE8E9] text-corporate "
                                            : ""
                                            }`}
                                        onClick={() => {
                                            setSelectedFloor(floor);
                                            setIsFloorDropdownOpen(false);
                                        }}
                                    >
                                        {floor}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Price Filter */}
                    <div className="relative w-full max-w-[137px]">
                        <button
                            className={`w-full flex items-center justify-center gap-[10px] h-[43px] mdx:h-[53px] px-4 ${isPriceDropdownOpen
                                ? "bg-corporate text-white"
                                : "bg-[#EDF3F5]"
                                }`}
                            onClick={() => {
                                setIsPriceDropdownOpen(!isPriceDropdownOpen);
                                setIsFloorDropdownOpen(false);
                                setIsRoomsDropdownOpen(false);
                            }}
                        >
                            {t("price")}
                            <Image
                                quality={100}
                                src={isPriceDropdownOpen ? arrow_top : arrow}
                                alt="arrow"
                                width={20}
                                height={20}
                            />
                            {(priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    className="absolute right-2 top-2"
                                >
                                    <circle cx="5" cy="5" r="5" fill="#E94B50" />
                                </svg>
                            )}
                        </button>
                        {isPriceDropdownOpen && (
                            <div className="absolute z-10 bg-white border mt-1 p-4 w-[260px] right-[0] mdx:right-auto mdx:w-[300px] slg:w-[395px]">
                                {minPrice < maxPrice ? (
                                    <>
                                        {/* Price Inputs */}
                                        <div className="flex justify-between text-[12px] mdx:text-[16px] mb-2">
                                            <div className="text-[#858585]">
                                                <label htmlFor="minPrice">{t("from")}</label>
                                                <input
                                                    type="number"
                                                    id="minPrice"
                                                    value={inputMin}
                                                    onChange={handleMinInputChange}
                                                    className="w-full border px-2 py-[9px] slg:py-[12px] mt-1 text-[#000000]"
                                                    min={minPrice}
                                                    max={priceRange[1]}
                                                />
                                            </div>
                                            <div className="text-[#858585]">
                                                <label htmlFor="maxPrice">{t("to")}</label>
                                                <input
                                                    type="number"
                                                    id="maxPrice"
                                                    value={inputMax}
                                                    onChange={handleMaxInputChange}
                                                    className="w-full border px-2 py-[9px] slg:py-[12px] mt-1 text-[#000000]"
                                                    min={priceRange[0]}
                                                    max={maxPrice}
                                                />
                                            </div>
                                        </div>
                                        {/* Price Range Slider */}
                                        <Range
                                            step={10000}
                                            min={minPrice}
                                            max={maxPrice}
                                            values={priceRange}
                                            onChange={(values) => {
                                                setPriceRange(values as [number, number]);
                                                setInputMin(values[0]);
                                                setInputMax(values[1]);
                                            }}
                                            renderTrack={({ props, children }) => (
                                                <div
                                                    {...props}
                                                    className="relative w-full h-[5px] bg-gray-200 rounded-full mt-[25px]"
                                                >
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            height: "100%",
                                                            backgroundColor: "#E94B50",
                                                            borderRadius: "9999px",
                                                            left: `${(
                                                                ((priceRange[0] - minPrice) /
                                                                    (maxPrice - minPrice)) *
                                                                100
                                                            ).toFixed(2)}%`,
                                                            right: `${(
                                                                100 -
                                                                ((priceRange[1] - minPrice) /
                                                                    (maxPrice - minPrice)) *
                                                                100
                                                            ).toFixed(2)}%`,
                                                        }}
                                                    />
                                                    {children}
                                                </div>
                                            )}
                                            renderThumb={({ props }) => (
                                                <div
                                                    {...props}
                                                    className="w-[20px] h-[20px] bg-corporate rounded-full"
                                                />
                                            )}
                                        />
                                        {/* Min and Max Prices */}
                                        <div className="flex justify-between text-[16px] mt-2 text-[#858585]">
                                            <span>{priceRange[0].toLocaleString()}</span>
                                            <span>{priceRange[1].toLocaleString()}</span>
                                        </div>
                                    </>
                                ) : (
                                    // Fixed Price
                                    <div className="flex flex-col items-center">
                                        <p className="text-center text-[16px] font-medium">
                                            {t("price")}: {minPrice.toLocaleString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Rooms Filter */}
                <div className="relative w-full max-w-[195px] mdx:max-w-[254px]">
                    <button
                        className={`w-full flex whitespace-nowrap items-center justify-center gap-[10px] h-[43px] mdx:h-[53px] px-4 ${isRoomsDropdownOpen
                            ? "bg-corporate text-white"
                            : "bg-[#EDF3F5]"
                            }`}
                        onClick={() => {
                            setIsRoomsDropdownOpen(!isRoomsDropdownOpen);
                            setIsFloorDropdownOpen(false);
                            setIsPriceDropdownOpen(false);
                        }}
                    >
                        {t("NumberOfRooms")}
                        <Image
                            quality={100}
                            src={isRoomsDropdownOpen ? arrow_top : arrow}
                            alt="arrow"
                            width={20}
                            height={20}
                        />
                        {selectedRooms && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                className="absolute right-2 top-2"
                            >
                                <circle cx="5" cy="5" r="5" fill="#E94B50" />
                            </svg>
                        )}
                    </button>
                    {isRoomsDropdownOpen && (
                        <ul className="absolute z-10 bg-white border w-full mt-1 max-h-60 overflow-auto">
                            <li
                                className={`px-4 py-2 cursor-pointer hover:bg-[#FCE8E9] ${!selectedRooms
                                    ? "bg-[#FCE8E9] text-corporate"
                                    : ""
                                    }`}
                                onClick={() => {
                                    setSelectedRooms(null);
                                    setIsRoomsDropdownOpen(false);
                                }}
                            >
                                {t("AllRooms")}
                            </li>
                            {rooms.map((room, index) => (
                                <li
                                    key={index}
                                    className={`px-4 py-2 cursor-pointer hover:bg-[#FCE8E9] ${selectedRooms === room
                                        ? "bg-[#FCE8E9] text-corporate"
                                        : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedRooms(room);
                                        setIsRoomsDropdownOpen(false);
                                    }}
                                >
                                    {room}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Reset Filters Button */}
                {isFilterActive && (
                    <div className="slg:ml-[10px] flex justify-end">
                        <button
                            onClick={resetFilters}
                            className="text-corporate underline"
                        >
                            {t("clear")}
                        </button>
                    </div>
                )}
            </div>

            {/* Display Filtered Layouts */}
            {filteredLayouts.length > 0 ? (
                <div className="w-full grid grid-cols-1 mdx:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-[20px] mt-[33px]">
                    {filteredLayouts.map((item) => (
                        <div
                            key={item._id}
                            className="group relative overflow-hidden border pb-[16px] px-[12px] w-full transition duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] cursor-pointer hover:h-full hover:pb-[70px]"
                        >
                            {/* Кликабельный контейнер изображения для открытия Lightbox */}
                            <div
                                className="w-full h-[250px] relative cursor-pointer"
                                onClick={() =>
                                    openLightbox({
                                        src: item.image?.asset?.url || "/images/default-image.png",
                                        alt: item.title[locale] || "Название планировки",
                                    })
                                }
                            >
                                <Image
                                    src={item.image?.asset?.url || "/images/default-image.png"}
                                    alt={item.title[locale] || "Название планировки"}
                                    quality={100}
                                    className="object-contain"
                                    fill
                                />
                            </div>
                            <div className="w-full text-[#B3B3B3] text-[16px]">
                                <h5 className="text-[20px] mdx:text-[24px] font-medium text-[#333333] mb-[12px]">
                                    {item.title[locale] || "Название планировки"}
                                </h5>
                                <div className="flex flex-col gap-[5px] border-b pb-[16px] xl:pb-[20px]">
                                    {item.floor?.floor !== undefined && (
                                        <div className="flex justify-between">
                                            <p>{t("floor")}</p>
                                            <p>{item.floor.floor}</p>
                                        </div>
                                    )}
                                    {item.home && (
                                        <div className="flex justify-between">
                                            <p>{t("house")}</p>
                                            <p>{item.home}</p>
                                        </div>
                                    )}
                                    {item.entrance && (
                                        <div className="flex justify-between">
                                            <p>{t("entrance")}</p>
                                            <p>{item.entrance}</p>
                                        </div>
                                    )}
                                    {item.rooms?.rooms !== undefined && (
                                        <div className="flex justify-between">
                                            <p>{t("rooms")}</p>
                                            <p>{item.rooms.rooms}</p>
                                        </div>
                                    )}
                                </div>
                                {item.price && (
                                    <div className="py-[16px] xl:py-[20px] font-medium text-[20px] mdx:text-[25px] text-corporate">
                                        {/* Display price without dollar sign */}
                                        <h3>{item.price}</h3>
                                    </div>
                                )}
                            </div>
                            <div className="group-hover:px-[12px] xl:group-hover:px-[16px] group-hover:mb-[15px] xl:group-hover:mb-[25px] absolute bottom-0 w-full left-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[0ms] group-hover:duration-[300ms] ease-in-out">
                                <button
                                    className="w-full h-12 transition-transform duration-300 ease-in-out bg-corporate text-white hover:bg-hover_corporate font-semibold"
                                    onClick={() =>
                                        (window.location.href = "tel:+998785558787")
                                    }
                                >
                                    {t("book")}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}

            {/* Компонент Lightbox для изображений */}
            {currentImage && (
                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    slides={[currentImage]}
                    index={0}
                    plugins={[Zoom]}
                />
            )}
        </div>
    );
}

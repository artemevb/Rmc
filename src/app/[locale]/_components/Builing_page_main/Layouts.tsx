"use client";

import { useState } from "react";
import Image from "next/image";
import { Range } from "react-range"; // Импортируем Range для фильтра по цене
import arrow from "@/public/svg/arrow-bottom-black.svg";
import arrow_top from "@/public/svg/arrow-top-white.svg";
import schema1 from "@/public/images/main_buildings/schema1.png";
import schema2 from "@/public/images/main_buildings/schema2.png";
import schema3 from "@/public/images/main_buildings/schema3.png";
import schema4 from "@/public/images/main_buildings/schema4.png";
import { useTranslations } from "next-intl";

export default function Layout() {
    const t = useTranslations("Building_page_main.Layout");

    const data = [
        {
            id: 1,
            title: "3-я квартира в ЖК Infinity",
            image: schema1,
            floor: 4,
            house: 8,
            entrance: 8,
            rooms: 3,
            price: 800000
        },
        {
            id: 2,
            title: "3-я квартира в ЖК Infinity",
            image: schema2,
            floor: 5,
            house: 9,
            entrance: 3,
            rooms: 2,
            price: 600000
        },
        {
            id: 3,
            title: "2-я квартира в ЖК Infinity",
            image: schema3,
            floor: 2,
            house: 7,
            entrance: 1,
            rooms: 2,
            price: 550000
        },
        {
            id: 4,
            title: "1-я квартира в ЖК Infinity",
            image: schema4,
            floor: 1,
            house: 5,
            entrance: 2,
            rooms: 1,
            price: 400000
        }
    ];

    const MIN_PRICE = 100000;
    const MAX_PRICE = 900000;

    // Состояния для фильтров
    const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
    const [selectedRooms, setSelectedRooms] = useState<number | null>(null);
    const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]); // Диапазон цены
    const [inputMin, setInputMin] = useState(MIN_PRICE); // Значение в поле "От"
    const [inputMax, setInputMax] = useState(MAX_PRICE); // Значение в поле "До"

    // Состояния для управления открытием выпадающих списков
    const [isFloorDropdownOpen, setIsFloorDropdownOpen] = useState(false);
    const [isRoomsDropdownOpen, setIsRoomsDropdownOpen] = useState(false);
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

    // Получение уникальных значений этажей и количества комнат для фильтров
    const floors = [...new Set(data.map((item) => item.floor).sort((a, b) => a - b))];
    const rooms = [...new Set(data.map((item) => item.rooms).sort((a, b) => a - b))];

    // Фильтрация данных на основе выбранных фильтров
    const filteredData = data.filter((item) => {
        const floorMatch = !selectedFloor || item.floor === selectedFloor;
        const roomsMatch = !selectedRooms || item.rooms === selectedRooms;
        const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1]; // Фильтр по цене
        return floorMatch && roomsMatch && priceMatch;
    });

    // Функция для сброса всех фильтров
    const resetFilters = () => {
        setSelectedFloor(null);
        setSelectedRooms(null);
        setPriceRange([MIN_PRICE, MAX_PRICE]);
        setInputMin(MIN_PRICE);
        setInputMax(MAX_PRICE);
    };

    // Условие для показа кнопки "Сбросить всё"
    const isFilterActive = selectedFloor !== null || selectedRooms !== null || priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE;

    // Обработчики изменения значений в полях ввода
    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setInputMin(value);
        if (value <= priceRange[1]) {
            setPriceRange([value, priceRange[1]]);
        }
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setInputMax(value);
        if (value >= priceRange[0]) {
            setPriceRange([priceRange[0], value]);
        }
    };

    return (
        <div className="w-full h-full flex flex-col mx-auto max-w-[1440px] max-3xl:px-[16px]">
            <h3 className="text-[30px] font-medium mdx:text-[45px] xl:text-[55px] leading-[38px] w-full max-w-[328px] mdx:max-w-[542px] xl:max-w-[100%]">
                {t("title")}
            </h3>
            <div className="w-full flex flex-col mdx:flex-row gap-[8px] mt-[20px] mdx:mt-[40px] xl:mt-[50px] text-[16px] mdx:text-[20px] relative">
                <div className="flex flex-row w-full gap-[8px] mdl:max-w-[277px]">
                    {/* Фильтр по этажам */}
                    <div className="relative w-full max-w-[133px]">
                        <button
                            className={`w-full flex items-center justify-between h-[43px] mdx:h-[53px] px-4 ${isFloorDropdownOpen ? "bg-[#E1AF93] text-white" : "bg-[#EDF3F5]"}`}
                            onClick={() => {
                                setIsFloorDropdownOpen(!isFloorDropdownOpen);
                                setIsRoomsDropdownOpen(false);
                            }}
                        >
                            Этаж
                            <Image quality={100} src={isFloorDropdownOpen ? arrow_top : arrow} alt="arrow" width={20} height={20} />
                            {selectedFloor && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <circle cx="5" cy="5" r="5" fill="#E1AF93" />
                                </svg>
                            )}
                        </button>
                        {isFloorDropdownOpen && (
                            <ul className="absolute z-10 bg-white border w-full mt-1 max-h-60 overflow-auto">
                                <li
                                    className={`px-4 py-2 cursor-pointer hover:bg-[#FCF7F4] ${!selectedFloor ? "bg-[#FCF7F4] text-[#E1AF93]" : ""}`}
                                    onClick={() => {
                                        setSelectedFloor(null);
                                        setIsFloorDropdownOpen(false);
                                    }}
                                >
                                    Все этажи
                                </li>
                                {floors.map((floor, index) => (
                                    <li
                                        key={index}
                                        className={`px-4 py-2 cursor-pointer hover:bg-[#FCF7F4] ${selectedFloor === floor ? "bg-[#FCF7F4] text-[#E1AF93]" : ""}`}
                                        onClick={() => {
                                            setSelectedFloor(floor);
                                            setIsFloorDropdownOpen(false);
                                        }}
                                    >
                                        Этаж {floor}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Фильтр по цене */}
                    <div className="relative w-full max-w-[137px]">
                        <button
                            className={`w-full flex items-center justify-between h-[43px] mdx:h-[53px] px-4 ${isPriceDropdownOpen ? "bg-[#E1AF93] text-white" : "bg-[#EDF3F5]"}`}
                            onClick={() => {
                                setIsPriceDropdownOpen(!isPriceDropdownOpen);
                                setIsFloorDropdownOpen(false);
                                setIsRoomsDropdownOpen(false);
                            }}
                        >
                            Цена
                            <Image quality={100} src={isPriceDropdownOpen ? arrow_top : arrow} alt="arrow" width={20} height={20} />
                        </button>
                        {isPriceDropdownOpen && (
                            <div className="absolute z-10 bg-white border mt-1 p-4 w-[260px] right-[0] mdx:right-auto mdx:w-[300px] slg:w-[395px]">
                                {/* Поля ввода "От" и "До" */}
                                <div className="flex justify-between text-[12px] mdx:text-[16px] mb-2">
                                    <div className="text-[#858585]">
                                        <label htmlFor="minPrice ">От ($)</label>
                                        <input
                                            type="number"
                                            id="minPrice"
                                            value={inputMin}
                                            onChange={handleMinInputChange}
                                            className="w-full border px-2 py-[9px] slg:py-[12px] mt-1 text-[#000000]"
                                        />
                                    </div>
                                    <div className="text-[#858585]">
                                        <label htmlFor="maxPrice">До ($)</label>
                                        <input
                                            type="number"
                                            id="maxPrice"
                                            value={inputMax}
                                            onChange={handleMaxInputChange}
                                            className="w-full border px-2 py-[9px] slg:py-[12px] mt-1 text-[#000000]"
                                        />
                                    </div>
                                </div>
                                {/* Ползунок для диапазона цен */}
                                <Range
                                    step={10000}
                                    min={MIN_PRICE}
                                    max={MAX_PRICE}
                                    values={priceRange}
                                    onChange={(values) => {
                                        setPriceRange(values);
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
                                                    position: 'absolute',
                                                    height: '100%',
                                                    backgroundColor: '#E1AF93', // Цвет выделения диапазона
                                                    borderRadius: '9999px',
                                                    left: `${(priceRange[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE) * 100}%`,
                                                    right: `${100 - (priceRange[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE) * 100}%`,
                                                }}
                                            />
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div
                                            {...props}
                                            className="w-[20px] h-[20px] bg-[#E1AF93] rounded-full"
                                        />
                                    )}
                                />
                                {/* Добавление минимальной и максимальной цены под ползунком */}
                                <div className="flex justify-between text-[16px] mt-2 text-[#858585]">
                                    <span>{priceRange[0].toLocaleString()}</span>
                                    <span>{priceRange[1].toLocaleString()}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Фильтр по количеству комнат */}
                <div className="relative w-full max-w-[189px] mdx:max-w-[254px]">
                    <button
                        className={`w-full flex items-center justify-between h-[43px] mdx:h-[53px] px-4 ${isRoomsDropdownOpen ? "bg-[#E1AF93] text-white" : "bg-[#EDF3F5]"}`}
                        onClick={() => {
                            setIsRoomsDropdownOpen(!isRoomsDropdownOpen);
                            setIsFloorDropdownOpen(false);
                        }}
                    >
                        Количество комнат
                        <Image quality={100} src={isRoomsDropdownOpen ? arrow_top : arrow} alt="arrow" width={20} height={20} />
                        {selectedRooms && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <circle cx="5" cy="5" r="5" fill="#E1AF93" />
                            </svg>
                        )}
                    </button>
                    {isRoomsDropdownOpen && (
                        <ul className="absolute z-10 bg-white border w-full mt-1 max-h-60 overflow-auto">
                            <li
                                className={`px-4 py-2 cursor-pointer hover:bg-[#FCF7F4] ${!selectedRooms ? "bg-[#FCF7F4] text-[#E1AF93]" : ""}`}
                                onClick={() => {
                                    setSelectedRooms(null);
                                    setIsRoomsDropdownOpen(false);
                                }}
                            >
                                Все комнаты
                            </li>
                            {rooms.map((room, index) => (
                                <li
                                    key={index}
                                    className={`px-4 py-2 cursor-pointer hover:bg-[#FCF7F4] ${selectedRooms === room ? "bg-[#FCF7F4] text-[#E1AF93]" : ""}`}
                                    onClick={() => {
                                        setSelectedRooms(room);
                                        setIsRoomsDropdownOpen(false);
                                    }}
                                >
                                    {room}-комнатные
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Кнопка "Сбросить всё", показывается если что-то выбрано */}
                {isFilterActive && (
                    <div className="mt-4 flex justify-end">
                        <button onClick={resetFilters} className="text-[#E1AF93] underline">
                            Сбросить всё
                        </button>
                    </div>
                )}
            </div>

            <div className="w-full grid grid-cols-1 mdx:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-[20px] mt-[33px]">
                {filteredData.map((item) => (
                    <div key={item.id} className="group relative overflow-hidden border pb-[16px] px-[12px] w-full transition duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] cursor-pointer hover:h-full hover:pb-[70px]">
                        <div className="w-full h-auto">
                            <Image src={item.image} alt={item.title} quality={100} className="object-cover w-full h-full max-h-[345px]" layout="responsive" />
                        </div>
                        <div className="w-full text-[#B3B3B3] text-[16px]">
                            <h5 className="text-[20px] mdx:text-[24px] font-medium text-[#333333] mb-[12px]">{item.title}</h5>
                            <div className="flex flex-col gap-[5px] border-b pb-[16px] xl:pb-[20px]">
                                <div className="flex justify-between">
                                    <p>Этаж</p>
                                    <p>{item.floor}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Дом</p>
                                    <p>{item.house}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Подъезд</p>
                                    <p>{item.entrance}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Комнат</p>
                                    <p>{item.rooms}</p>
                                </div>
                            </div>
                            <div className="py-[16px] xl:py-[20px] font-medium text-[20px] mdx:text-[25px] text-[#E1AF93]">
                                <h3>${item.price.toLocaleString()}</h3>
                            </div>
                        </div>
                        <div className="group-hover:px-[12px] xl:group-hover:px-[16px] group-hover:mb-[15px] xl:group-hover:mb-[25px] absolute bottom-0 w-full left-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[0ms] group-hover:duration-[300ms] ease-in-out">
                            <button className="w-full h-12 transition-transform duration-300 ease-in-out bg-[#E1AF93] text-white hover:bg-[#EAC7B4] font-semibold">
                                Забронировать
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

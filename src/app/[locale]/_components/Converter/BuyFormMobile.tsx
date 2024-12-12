"use client";
import { useState } from "react";
import Image from "next/image";
import arrow from "@/public/svg/arrow-left-red.svg";

interface BuyFormMobileProps {
    onClose: () => void;
}

export default function BuyFormMobile({ onClose }: BuyFormMobileProps) {
    const [results] = useState(954);

    return (
        <div className="w-full h-screen bg-[#fff] py-[23px] overflow-y-auto">
            {/* Назад Button */}
            <button
                className="flex text-[16px] px-[16px] font-semibold text-corporate gap-[4px] items-center border-b pb-[27px] w-full"
                onClick={onClose}
            >
                <Image
                    src={arrow}
                    alt="arrow"
                    width={20}
                    priority
                    height={20}
                    quality={100}
                    className="transition-transform duration-300"
                />
                Назад
            </button>
            <div className="space-y-4 mt-[31px] px-[16px]">
                
                {/* Тип недвижимости */}
                <div className="relative">
                    <label htmlFor="type" className="block text-[16px] font-medium text-gray-700">
                        Тип недвижимости
                    </label>
                    <select
                        id="type"
                        name="type"
                        className="mt-1 block w-full bg-white border px-3 py-2 text-gray-400 appearance-none"
                    >
                        <option value="" disabled selected>
                            Выбрать
                        </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900 mt-6">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>

                {/* Стоимость */}
                <div>
                    <label htmlFor="price" className="block text-[16px] font-medium text-gray-700">
                        Стоимость, у.е.
                    </label>
                    <div className="mt-1 flex">
                        <input
                            type="number"
                            name="priceFrom"
                            placeholder="От"
                            className="w-1/2 border px-3 py-2 text-[#333333]"
                        />
                        <input
                            type="number"
                            name="priceTo"
                            placeholder="До"
                            className="w-1/2 border px-3 py-2 text-[#333333]"
                        />
                    </div>
                </div>

                {/* Площадь */}
                <div>
                    <label htmlFor="area" className="block text-[16px] font-medium text-gray-700">
                        Площадь, м²
                    </label>
                    <div className="mt-1 flex ">
                        <input
                            type="number"
                            name="areaFrom"
                            placeholder="От"
                            className="w-1/2 border px-3 py-2 text-[#333333]"
                        />
                        <input
                            type="number"
                            name="areaTo"
                            placeholder="До"
                            className="w-1/2 border px-3 py-2 text-[#333333]"
                        />
                    </div>
                </div>

                {/* Комнатность */}
                <div className="max-w-[290px]">
                    <label htmlFor="rooms" className="block text-[16px] font-medium text-gray-700">
                        Комнатность
                    </label>
                    <div className="mt-1 flex">
                        <button className="flex-1 border px-3 py-2 text-[16px] text-[#333]">Студия</button>
                        <button className="flex-1 border px-3 py-2 text-[16px] text-[#333]">1</button>
                        <button className="flex-1 border px-3 py-2 text-[16px] text-[#333]">2</button>
                        <button className="flex-1 border px-3 py-2 text-[16px] text-[#333]">3</button>
                        <button className="flex-1 border px-3 py-2 text-[16px] text-[#333]">4+</button>
                    </div>
                </div>

                {/* Продавец */}
                <div className="relative">
                    <label htmlFor="seller" className="block text-[16px] font-medium text-gray-700">
                        Продавец
                    </label>
                    <select
                        id="seller"
                        name="seller"
                        className="mt-1 block w-full bg-white border px-3 py-2 text-gray-400 appearance-none"
                    >
                        <option value="" disabled selected>
                            Выбрать
                        </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900 mt-6">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>

                {/* Адрес */}
                <div>
                    <label htmlFor="address" className="block text-[16px] font-medium text-gray-700">
                        Адрес
                    </label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Город, адрес, ориентир, район, улица"
                        className="mt-1 block w-full border px-3 py-2 text-[#333333]"
                    />
                </div>

                {/* Срок завершения */}
                <div className="relative">
                    <label htmlFor="completion" className="block text-[16px] font-medium text-gray-700">
                        Срок завершения
                    </label>
                    <select
                        id="completion"
                        name="completion"
                        className="mt-1 block w-full bg-white border px-3 py-2 text-gray-400 appearance-none"
                    >
                        <option value="" disabled selected>
                            Выбрать
                        </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900 mt-6">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>

                {/* Кнопка */}
                <div className="mt-4">
                    <button className="w-full bg-corporate text-white py-3 font-medium hover:bg-hover_corporate">
                        Показать {results} результата
                    </button>
                </div>
            </div>
        </div>
    );
}

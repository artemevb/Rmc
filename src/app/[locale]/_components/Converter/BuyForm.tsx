"use client";
import React from 'react';

type BuyFormProps = {
    className?: string;
    type: string;
    onShowResults: () => void;
    onTypeChange: (val: string) => void;
    seller: string;
    onSellerChange: (val: string) => void;
    sellers: string[];
    propertyTypes: string[];
    address: string;
    onAddressChange: (val: string) => void;
    priceFrom?: number;
    onPriceFromChange: (val?: number) => void;
    priceTo?: number;
    onPriceToChange: (val?: number) => void;
    areaFrom?: number;
    onAreaFromChange: (val?: number) => void;
    areaTo?: number;
    onAreaToChange: (val?: number) => void;
    rooms: string[];
    onRoomsChange: (val: string) => void;
    results: number;

    addressSuggestions: string[]; // новые пропы
    onAddressSelect: (val: string) => void;
};

const BuyForm: React.FC<BuyFormProps> = ({
    type, onTypeChange,
    seller, onSellerChange,
    onShowResults,
    sellers,
    propertyTypes,
    address, onAddressChange,
    priceFrom, onPriceFromChange,
    priceTo, onPriceToChange,
    areaFrom, onAreaFromChange,
    areaTo, onAreaToChange,
    rooms,
    onRoomsChange,
    results,
    addressSuggestions,
    onAddressSelect
}) => {

    const toggleRoom = (roomValue: string) => {
        onRoomsChange(roomValue);
    };

    return (
        <div className="w-full h-full bg-[#fff] max-h-[382px] mb-[76px] hidden slg:block max-xl:px-[12px]">
            <div className="px-6 py-[35px] h-full 2xl:max-h-[316px]">
                <div className="grid grid-cols-2 gap-x-[20px] 2xl:gap-x-[33px] h-full max-h-[258px] xl:max-h-[270px] 2xl:grid-cols-3">
                    <div className="relative h-full max-h-[81px] 2xl:order-1">
                        <label htmlFor="type" className="block text-[16px] font-medium text-gray-700">
                            Тип недвижимости
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={type}
                            onChange={(e) => onTypeChange(e.target.value)}
                            className="mt-1 block w-full bg-white border h-full max-h-[51px] text-gray-400 appearance-none pr-10 pl-2"
                        >
                            <option value="">Выбрать</option>
                            {propertyTypes.map((pt) => (
                                <option key={pt} value={pt}>{pt}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900 mt-6">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>

                    <div className='h-full max-h-[81px] 2xl:order-2'>
                        <label htmlFor="price" className="block text-[16px] font-medium text-gray-700">
                            Стоимость, AED
                        </label>
                        <div className="mt-1 flex h-full max-h-[50px]">
                            <input
                                type="number"
                                name="priceFrom"
                                placeholder="От"
                                value={priceFrom || ""}
                                onChange={(e) => onPriceFromChange(e.target.value ? Number(e.target.value) : undefined)}
                                className="w-full border px-2 py-1 text-[#333333]"
                            />
                            <input
                                type="number"
                                name="priceTo"
                                placeholder="До"
                                value={priceTo || ""}
                                onChange={(e) => onPriceToChange(e.target.value ? Number(e.target.value) : undefined)}
                                className="w-full border px-2 py-1 text-[#333333]"
                            />
                        </div>
                    </div>

                    <div className='h-full max-h-[81px] 2xl:order-4'>
                        <label htmlFor="area" className="text-[16px] block font-medium text-gray-700 ">
                            Площадь, м²
                        </label>
                        <div className="mt-1 flex h-full max-h-[50px]">
                            <input
                                type="number"
                                name="areaFrom"
                                placeholder="От"
                                value={areaFrom || ""}
                                onChange={(e) => onAreaFromChange(e.target.value ? Number(e.target.value) : undefined)}
                                className="w-full border px-2 py-1 text-[#333333]"
                            />
                            <input
                                type="number"
                                name="areaTo"
                                placeholder="До"
                                value={areaTo || ""}
                                onChange={(e) => onAreaToChange(e.target.value ? Number(e.target.value) : undefined)}
                                className="w-full border px-2 py-1 text-[#333333]"
                            />
                        </div>
                    </div>

                    <div className='h-full max-h-[81px] 2xl:order-3 max-w-[276px]'>
                        <label htmlFor="rooms" className="block text-[16px] font-medium text-gray-700">
                            Комнатность
                        </label>
                        <div className="mt-1 flex h-full max-h-[50px]">
                            {["Студия", "1", "2", "3", "4+"].map(r => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => toggleRoom(r)}
                                    className={`flex-1 border px-3 py-2 text-[18px] text-[#333] ${rooms.includes(r) ? "bg-gray-200" : ""}`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-full max-h-[81px] 2xl:order-5">
                        <label htmlFor="seller" className="block text-[16px] font-medium text-gray-700">
                            Продавец
                        </label>
                        <select
                            id="seller"
                            name="seller"
                            value={seller}
                            onChange={(e) => onSellerChange(e.target.value)}
                            className="mt-1 block w-full bg-white border h-full max-h-[51px] text-gray-400 appearance-none pr-10 pl-2"
                        >
                            <option value="">Выбрать</option>
                            {sellers.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900 mt-6">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>

                    <div className='h-full max-h-[81px] 2xl:order-6 relative'>
                        <label htmlFor="address" className="block text-[16px] font-medium text-gray-700">
                            Адрес
                        </label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Город, адрес, ориентир, район, улица"
                            value={address}
                            onChange={(e) => onAddressChange(e.target.value)}
                            className="mt-1 block w-full border px-2 py-1 h-full max-h-[51px] text-[#333333]"
                        />
                        {addressSuggestions.length > 0 && (
                            <ul className="absolute z-50 bg-white border border-gray-300 w-full mt-1 max-h-[150px] overflow-auto">
                                {addressSuggestions.map(suggestion => (
                                    <li
                                        key={suggestion}
                                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-[#333333]"
                                        onClick={() => onAddressSelect(suggestion)}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="mt-4 flex gap-[16px] items-center justify-end">
                    <button className="bg-corporate text-white px-[27px] py-[12px] font-medium hover:bg-hover_corporate"
                        onClick={() => onShowResults()}>
                        Показать {results} результата
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyForm;

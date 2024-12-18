"use client";
import React from 'react';
import Image from "next/image";
import arrow from "@/public/svg/arrow-left-red.svg";
import Select, { StylesConfig, SingleValue } from 'react-select';
import { useTranslations } from "next-intl";

type OptionType = {
    value: string;
    label: string;
};

interface BuyFormMobileProps {
    onClose: () => void;
    onShowResults: () => void;
    type: string;
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
    onRoomsChange: (val: string[]) => void;
    results: number;

    addressSuggestions: string[];
    onAddressSelect: (val: string) => void;
}

const BuyFormMobile: React.FC<BuyFormMobileProps> = ({
    onClose,
    onShowResults,
    type, onTypeChange,
    seller, onSellerChange,
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

    const t = useTranslations("BuyForm");

    const toggleRoom = (roomValue: string) => {
        const updatedRooms = rooms.includes(roomValue)
            ? rooms.filter(r => r !== roomValue)
            : [...rooms, roomValue];
        onRoomsChange(updatedRooms);
    };

    // Подготовка опций для React Select
    const propertyTypeOptions: OptionType[] = propertyTypes.map(pt => ({ value: pt, label: pt }));
    const sellerOptions: OptionType[] = sellers.map(s => ({ value: s, label: s }));

    // Пользовательские стили для react-select
    const customStyles: StylesConfig<OptionType, false> = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#fff',
            borderColor: '#EAEAEA',
            boxShadow: 'none',
            height: '50px',
            marginTop: '5px',
            borderRadius: '0px',
            '&:hover': {
                borderColor: '#333',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#333' : state.isFocused ? '#f0f0f0' : '#fff',
            color: state.isSelected ? '#fff' : '#333',
            cursor: 'pointer',
            borderRadius: '0px',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#333',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        // Добавьте другие стили по необходимости
    };

    return (
        <div className="w-full h-screen bg-[#fff] py-[23px] overflow-y-auto">
            {/* Назад Button */}
            <button
                className="flex text-[16px] px-[16px] font-semibold text-corporate gap-[4px] items-center border-b pb-[27px] w-full"
                onClick={onClose}
            >
                <Image
                    src={arrow}
                    alt={t('backButton.alt')}
                    width={20}
                    priority
                    height={20}
                    quality={100}
                    className="transition-transform duration-300"
                />
                {t('backButton.label')}
            </button>
            <div className="space-y-4 mt-[31px] px-[16px]">

                {/* Тип недвижимости */}
                <div className="relative">
                    <label htmlFor="type" className="block text-[16px] font-medium text-gray-700">
                        {t('propertyTypeLabel')}
                    </label>
                    <Select<OptionType, false>
                        id="type"
                        name="type"
                        className="mt-1"
                        value={propertyTypeOptions.find(option => option.value === type) || null}
                        onChange={(selectedOption: SingleValue<OptionType>) => onTypeChange(selectedOption ? selectedOption.value : '')}
                        options={propertyTypeOptions}
                        placeholder={t('selectPlaceholder')}
                        isClearable
                        styles={customStyles}
                    />
                </div>

                {/* Стоимость */}
                <div>
                    <label htmlFor="price" className="block text-[16px] font-medium text-gray-700">
                        {t('priceLabel')}
                    </label>
                    <div className="mt-1 flex">
                        <input
                            type="number"
                            name="priceFrom"
                            placeholder={t('from')}
                            className="w-1/2 border px-3 py-2 text-[#333333]"
                            value={priceFrom || ""}
                            onChange={(e) => onPriceFromChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                        <input
                            type="number"
                            name="priceTo"
                            placeholder={t('to')}
                            className="w-1/2 border px-3 py-2 text-[#333333]"
                            value={priceTo || ""}
                            onChange={(e) => onPriceToChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </div>
                </div>

                {/* Площадь */}
                <div>
                    <label htmlFor="area" className="block text-[16px] font-medium text-gray-700">
                        {t('areaLabel')}
                    </label>
                    <div className="mt-1 flex">
                        <input
                            type="number"
                            name="areaFrom"
                            placeholder={t('from')}
                            className="w-1/2 border px-3 py-2 text-[#333333]"
                            value={areaFrom || ""}
                            onChange={(e) => onAreaFromChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                        <input
                            type="number"
                            name="areaTo"
                            placeholder={t('to')}
                            className="w-1/2 border px-3 py-2 text-[#333333]"
                            value={areaTo || ""}
                            onChange={(e) => onAreaToChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </div>
                </div>

                {/* Комнатность */}
                <div className="max-w-[290px]">
                    <label htmlFor="rooms" className="block text-[16px] font-medium text-gray-700">
                        {t('roomsLabel')}
                    </label>
                    <div className="mt-1 flex">
                        {[
                            { key: 'Студия', label: t('rooms.studio') },
                            { key: '1', label: t('rooms.one') },
                            { key: '2', label: t('rooms.two') },
                            { key: '3', label: t('rooms.three') },
                            { key: '4Plus', label: t('rooms.fourPlus') }
                        ].map(room => (
                            <button
                                key={room.key}
                                type="button"
                                onClick={() => toggleRoom(room.key)}
                                className={`flex-1 border px-3 py-2 text-[16px] text-[#333] ${rooms.includes(room.key) ? "bg-gray-200" : ""}`}
                            >
                                {room.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Продавец */}
                <div className="relative">
                    <label htmlFor="seller" className="block text-[16px] font-medium text-gray-700">
                        {t('sellerLabel')}
                    </label>
                    <Select<OptionType, false>
                        id="seller"
                        name="seller"
                        className="mt-1"
                        value={sellerOptions.find(option => option.value === seller) || null}
                        onChange={(selectedOption: SingleValue<OptionType>) => onSellerChange(selectedOption ? selectedOption.value : '')}
                        options={sellerOptions}
                        placeholder={t('selectPlaceholder')}
                        isClearable
                        styles={customStyles}
                    />
                </div>

                {/* Адрес */}
                <div className="relative">
                    <label htmlFor="address" className="block text-[16px] font-medium text-gray-700">
                        {t('addressLabel')}
                    </label>
                    <input
                        type="text"
                        name="address"
                        placeholder={t('addressPlaceholder')}
                        className="mt-1 block w-full border px-3 py-2 text-[#333333]"
                        value={address}
                        onChange={(e) => onAddressChange(e.target.value)}
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

                {/* Кнопка */}
                <div className="mt-4">
                    <button
                        className="w-full bg-corporate text-white py-3 font-medium hover:bg-hover_corporate"
                        onClick={() => onShowResults()}
                    >
                        {t('showResultsButton', { results })}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BuyFormMobile;

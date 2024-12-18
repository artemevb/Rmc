"use client";
import React from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';

type OptionType = {
    value: string;
    label: string;
};

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
    onRoomsChange: (val: string[]) => void; 
    results: number;

    addressSuggestions: string[];
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
        const updatedRooms = rooms.includes(roomValue)
            ? rooms.filter(r => r !== roomValue)
            : [...rooms, roomValue];
        onRoomsChange(updatedRooms);
    };

    // Подготовка опций для react-select
    const propertyTypeOptions: OptionType[] = propertyTypes.map(pt => ({ value: pt, label: pt }));
    const sellerOptions: OptionType[] = sellers.map(s => ({ value: s, label: s }));

    // Кастомные стили для react-select
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
            borderRadius: '0px', // Убираем скругление
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#333',
        }),
        indicatorSeparator: () => ({
            display: 'none', // Убираем разделитель индикаторов
        }),
        // Добавьте другие стили по необходимости
    };

    return (
        <div className="w-full h-full bg-[#fff] max-h-[382px] mb-[76px] hidden slg:block max-xl:px-[12px]">
            <div className="px-6 py-[35px] h-full 2xl:max-h-[316px]">
                <div className="grid grid-cols-2 gap-x-[20px] 2xl:gap-x-[33px] h-full max-h-[258px] xl:max-h-[270px] 2xl:grid-cols-3">
                    {/* Тип недвижимости */}
                    <div className="relative h-full max-h-[81px] 2xl:order-1">
                        <label htmlFor="type" className="block text-[16px] font-medium text-gray-700">
                            Тип недвижимости
                        </label>
                        <Select<OptionType, false>
                            id="type"
                            name="type"
                            value={propertyTypeOptions.find(option => option.value === type)}
                            onChange={(selectedOption: SingleValue<OptionType>) => onTypeChange(selectedOption ? selectedOption.value : '')}
                            options={propertyTypeOptions}
                            styles={customStyles}
                            placeholder="Выбрать"
                            isClearable
                        />
                    </div>

                    {/* Стоимость */}
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

                    {/* Площадь */}
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

                    {/* Комнатность */}
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

                    {/* Продавец */}
                    <div className="relative h-full max-h-[81px] 2xl:order-5">
                        <label htmlFor="seller" className="block text-[16px] font-medium text-gray-700">
                            Продавец
                        </label>
                        <Select<OptionType, false>
                            id="seller"
                            name="seller"
                            value={sellerOptions.find(option => option.value === seller)}
                            onChange={(selectedOption: SingleValue<OptionType>) => onSellerChange(selectedOption ? selectedOption.value : '')}
                            options={sellerOptions}
                            styles={customStyles}
                            placeholder="Выбрать"
                            isClearable
                        />
                    </div>

                    {/* Адрес */}
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
                    <button
                        className="bg-corporate text-white px-[27px] py-[12px] font-medium hover:bg-hover_corporate"
                        onClick={() => onShowResults()}
                    >
                        Показать {results} результата
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyForm;


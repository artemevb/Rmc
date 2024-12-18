
import Image from "next/image";
import arrow from "@/public/svg/arrow-left-red.svg";

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

export default function BuyFormMobile({
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
}: BuyFormMobileProps) {

    const toggleRoom = (roomValue: string) => {
        const updatedRooms = rooms.includes(roomValue)
            ? rooms.filter(r => r !== roomValue)
            : [...rooms, roomValue];
        onRoomsChange(updatedRooms);
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
                        value={type}
                        onChange={(e) => onTypeChange(e.target.value)}
                    >
                        <option value="hover:bg-red">Выбрать</option>
                        {propertyTypes.map((pt) => (
                            <option key={pt} value={pt}>{pt}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900 mt-6">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            ></path>
                        </svg>
                    </div>
                </div>

                {/* Стоимость */}
                <div>
                    <label htmlFor="price" className="block text-[16px] font-medium text-gray-700">
                        Стоимость, AED
                    </label>
                    <div className="mt-1 flex">
                        <input
                            type="number"
                            name="priceFrom"
                            placeholder="От"
                            className="w-1/2 border px-3 py-2 text-[#333333]"
                            value={priceFrom || ""}
                            onChange={(e) => onPriceFromChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                        <input
                            type="number"
                            name="priceTo"
                            placeholder="До"
                            className="w-1/2 border px-3 py-2 text-[#333333]"
                            value={priceTo || ""}
                            onChange={(e) => onPriceToChange(e.target.value ? Number(e.target.value) : undefined)}
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
                            value={areaFrom || ""}
                            onChange={(e) => onAreaFromChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                        <input
                            type="number"
                            name="areaTo"
                            placeholder="До"
                            className="w-1/2 border px-3 py-2 text-[#333333]"
                            value={areaTo || ""}
                            onChange={(e) => onAreaToChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </div>
                </div>

                {/* Комнатность */}
                <div className="max-w-[290px]">
                    <label htmlFor="rooms" className="block text-[16px] font-medium text-gray-700">
                        Комнатность
                    </label>
                    <div className="mt-1 flex">
                        {["Студия", "1", "2", "3", "4+"].map(r => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => toggleRoom(r)}
                                className={`flex-1 border px-3 py-2 text-[16px] text-[#333] ${rooms.includes(r) ? "bg-gray-200" : ""}`}
                            >
                                {r}
                            </button>
                        ))}
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
                        value={seller}
                        onChange={(e) => onSellerChange(e.target.value)}
                    >
                        <option value="">Выбрать</option>
                        {sellers.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900 mt-6">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            ></path>
                        </svg>
                    </div>
                </div>

                {/* Адрес */}
                <div className="relative">
                    <label htmlFor="address" className="block text-[16px] font-medium text-gray-700">
                        Адрес
                    </label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Город, адрес, ориентир, район, улица"
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
                        Показать {results} результата
                    </button>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
import Image from "next/image";
import arrow from "@/public/svg/arrow-left-red.svg";

interface SellFormMobileProps {
    onClose: () => void;
}

interface FormData {
    propertyType: string;
    numberOfRoom: string;
    area: string;
    phoneNumber: string;
    address: string;
}

export default function SellFormMobile({ onClose }: SellFormMobileProps) {
    const [propertyType, setPropertyType] = useState<string>("");
    const [area, setArea] = useState<string>("");
    const [numberOfRoom, setNumberOfRoom] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!propertyType || !area || !numberOfRoom || !phoneNumber || !address) {
            setErrorMessage("Пожалуйста, заполните все поля.");
            return;
        }

        const phoneRegex = /^\+?\d{10,15}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setErrorMessage("Пожалуйста, введите корректный номер телефона.");
            return;
        }

        setErrorMessage(null); // Сбрасываем сообщение об ошибке, если все поля заполнены корректно
        setIsSubmitting(true);

        const formattedArea = `${area}m²`;
        const formattedPropertyType =
            propertyType.charAt(0).toUpperCase() + propertyType.slice(1);

        const payload: FormData = {
            propertyType: formattedPropertyType,
            numberOfRoom: numberOfRoom,
            area: formattedArea,
            phoneNumber: phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`,
            address: address,
        };

        try {
            const response = await fetch(
                "https://rmc.mrjtrade.uz/api/application/to-sell/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка при отправке заявки.");
            }

            setPropertyType("");
            setArea("");
            setNumberOfRoom("");
            setPhoneNumber("");
            setAddress("");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setErrorMessage(err.message || "Что-то пошло не так.");
            } else {
                setErrorMessage("Что-то пошло не так.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNumberOfRoom = (room: string) => {
        setNumberOfRoom(room);
    };

    return (
        <div className="w-full h-screen bg-[#fff] py-[23px] overflow-y-auto">
            {/* Кнопка "Назад" */}
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
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="mt-1 block w-full bg-white border px-3 py-2 text-gray-700 appearance-none"
                    >
                        <option value="" disabled>
                            Выбрать
                        </option>
                        <option value="apartment">Квартира</option>
                        <option value="room">Комната</option>
                        <option value="house">Дом</option>
                        <option value="townhouse">Таунхаус</option>
                        <option value="land">Земельный участок</option>
                        <option value="dacha">Дача</option>
                        <option value="commercial">Коммерческое помещение</option>
                    </select>
                </div>

                {/* Площадь */}
                <div>
                    <label htmlFor="area" className="block text-[16px] font-medium text-gray-700">
                        Площадь, м²
                    </label>
                    <div className="mt-1 flex">
                        <input
                            type="number"
                            name="area"
                            placeholder="Введите площадь"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="w-full border px-3 py-2 text-[#333333]"
                            min="0"
                        />
                    </div>
                </div>

                {/* Комнатность */}
                <div className="max-w-[290px]">
                    <label htmlFor="rooms" className="block text-[16px] font-medium text-gray-700">
                        Комнатность
                    </label>
                    <div className="mt-1 flex">
                        {["Студия", "1", "2", "3", "4+"].map((room) => (
                            <button
                                key={room}
                                type="button"
                                className={`flex-1 border px-3 py-2 text-[16px] text-[#333] ${
                                    numberOfRoom === room ? "bg-gray-200" : "bg-white"
                                }`}
                                onClick={() => handleNumberOfRoom(room)}
                            >
                                {room}
                            </button>
                        ))}
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
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1 block w-full border px-3 py-2 text-[#333333]"
                    />
                </div>

                {/* Номер телефона */}
                <div>
                    <label htmlFor="phoneNumber" className="block text-[16px] font-medium text-gray-700">
                        Номер телефона
                    </label>
                    <div className="mt-1 flex">
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Укажите ваш номер телефона"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="mt-1 block w-full border px-3 py-2 text-[#333333]"
                        />
                    </div>
                </div>

                {/* Сообщение об ошибке */}
                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

                {/* Кнопка отправки */}
                <div className="mt-5">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`w-full bg-corporate text-white py-3 font-medium hover:bg-hover_corporate ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting ? "Отправка..." : "Отправить заявку"}
                    </button>
                </div>
            </div>
        </div>
    );
}


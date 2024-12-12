
import { useState } from "react";
import Image from "next/image";
import arrow from "@/public/svg/arrow-left-red.svg";
import { useTranslations } from "next-intl";

interface RentFormMobileProps {
    onClose: () => void;
}

interface FormData {
    propertyType: string;
    numberOfRoom: string;
    area: string;
    phoneNumber: string;
    address: string;
}

export default function RentFormMobile({ onClose }: RentFormMobileProps) {
    const t = useTranslations('MainFilter.ToRentOutForm');
    const [propertyType, setPropertyType] = useState<string>("");
    const [area, setArea] = useState<string>("");
    const [numberOfRoom, setNumberOfRoom] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!propertyType || !area || !numberOfRoom || !address || !phoneNumber) {
            setErrorMessage(t('error_fill_all_fields'));
            return;
        }

        const phoneRegex = /^\+?\d{9,15}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setErrorMessage(t('error_invalid_phone'));
            return;
        }

        setErrorMessage(null);
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
                "https://rmc.mrjtrade.uz/api/application/to-rent/create",
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
                throw new Error(errorData.message || t('error_submit'));
            }

            setPropertyType("");
            setArea("");
            setNumberOfRoom("");
            setAddress("");
            setPhoneNumber("");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setErrorMessage(err.message || t('error_generic'));
            } else {
                setErrorMessage(t('error_generic'));
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
                    alt={t('alt_arrow')}
                    width={20}
                    priority
                    height={20}
                    quality={100}
                    className="transition-transform duration-300"
                />
                {t('backButton')}
            </button>
            <div className="space-y-4 mt-[31px] px-[16px]">
                {/* Тип недвижимости */}
                <div className="relative">
                    <label htmlFor="type" className="block text-[16px] font-medium text-gray-700">
                        {t('propertyTypeLabel')}
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="mt-1 block w-full bg-white border px-3 py-2 text-gray-700 appearance-none"
                    >
                        <option value="" disabled>
                            {t('selectPlaceholder')}
                        </option>
                        <option value="apartment">{t('option_apartment')}</option>
                        <option value="room">{t('option_room')}</option>
                        <option value="house">{t('option_house')}</option>
                        <option value="townhouse">{t('option_townhouse')}</option>
                        <option value="land">{t('option_land')}</option>
                        <option value="dacha">{t('option_dacha')}</option>
                        <option value="commercial">{t('option_commercial')}</option>
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

                {/* Площадь */}
                <div>
                    <label htmlFor="area" className="block text-[16px] font-medium text-gray-700">
                        {t('areaLabel')}
                    </label>
                    <div className="mt-1">
                        <input
                            type="number"
                            name="area"
                            placeholder={t('areaPlaceholder')}
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="w-full border px-3 py-2 text-[#333333]"
                            min="0"
                        />
                    </div>
                </div>

                {/* Количество комнат */}
                <div className="max-w-[290px]">
                    <label htmlFor="rooms" className="block text-[16px] font-medium text-gray-700">
                        {t('roomsLabel')}
                    </label>
                    <div className="mt-1 flex">
                        {["Студия", "1", "2", "3", "4+"].map((room) => (
                            <button
                                key={room}
                                type="button"
                                className={`flex-1 border px-3 py-2 text-[16px] text-[#333] ${numberOfRoom === room ? "bg-gray-200" : "bg-white"
                                    }`}
                                onClick={() => handleNumberOfRoom(room === "Студия" ? t('room_studio') : room)}
                            >
                                {room === "Студия" ? t('room_studio') : room}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Адрес */}
                <div>
                    <label htmlFor="address" className="block text-[16px] font-medium text-gray-700">
                        {t('addressLabel')}
                    </label>
                    <input
                        type="text"
                        name="address"
                        placeholder={t('addressPlaceholder')}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1 block w-full border px-3 py-2 text-[#333333]"
                    />
                </div>

                {/* Номер телефона */}
                <div>
                    <label htmlFor="phoneNumber" className="block text-[16px] font-medium text-gray-700">
                        {t('phoneNumberLabel')}
                    </label>
                    <div className="mt-1 flex h-full max-h-[50px]">
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder={t('phoneNumberPlaceholder')}
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
                        className={`w-full bg-corporate text-white py-3 font-medium hover:bg-hover_corporate ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isSubmitting ? t('submitButtonSending') : t('submitButton')}
                    </button>
                </div>
            </div>
        </div>
    );
}

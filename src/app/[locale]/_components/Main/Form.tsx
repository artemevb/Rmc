"use client";
import { useState, ChangeEvent } from "react";
import build1 from "@/public/images/main/Form1.png";
import build2 from "@/public/images/main/Form2.png";
import Image from 'next/image';
import { useTranslations } from "next-intl";
import axios, { AxiosError } from 'axios'; // Импортируем Axios и тип AxiosError

// Определяем форму значений
interface FormValues {
    fullName: string;
    phoneNumber: string;
    email: string;
    question: string;
}

// Интерфейс для ответа об ошибке от API
interface ErrorResponse {
    message: string;
}

// Результат валидации
interface ValidationResult {
    isValid: boolean;
    message: string;
}

export default function ContAddress() {
    const t = useTranslations('Main.Form');

    const [values, setValues] = useState<FormValues>({
        fullName: "",
        phoneNumber: "",
        email: "",
        question: "",
    });

    const [focusedInput, setFocusedInput] = useState<keyof FormValues | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки
    const [error, setError] = useState<string | null>(null); // Состояние ошибки


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const validateInput = (name: keyof FormValues, value: string): ValidationResult => {
        if (name === "fullName") {
            return value.trim().length >= 3
                ? { isValid: true, message: t('validFullName') }
                : { isValid: false, message: t('enterFullName') };
        } else if (name === "phoneNumber") {
            const phoneRegex =
                /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,3}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}$/;
            return phoneRegex.test(value)
                ? { isValid: true, message: t('validPhoneNumber') }
                : { isValid: false, message: t('enterValidPhoneNumber') };
        } else if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value)
                ? { isValid: true, message: t('validEmail') }
                : { isValid: false, message: t('enterValidEmail') };
        }
        return { isValid: true, message: "" };
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError(null);


        // Проверка всех полей перед отправкой
        let isFormValid = true;
        let firstInvalidField: keyof FormValues | null = null;
        let validationMessage = "";

        for (const field of ["fullName", "phoneNumber", "email", "question"] as Array<keyof FormValues>) {
            const validation = validateInput(field, values[field]);
            if (!validation.isValid) {
                isFormValid = false;
                firstInvalidField = field;
                validationMessage = validation.message;
                break;
            }
        }

        // Дополнительная проверка для незаполненных полей (например, вопрос)
        for (const field of ["fullName", "phoneNumber", "email"] as Array<keyof FormValues>) {
            if (!values[field].trim()) {
                isFormValid = false;
                firstInvalidField = field;
                validationMessage = t('pleaseFillAllFields');
                break;
            }
        }

        if (!isFormValid) {
            setError(validationMessage || t('pleaseFillAllFields'));
            if (firstInvalidField) {
                setFocusedInput(firstInvalidField);
            }
            return;
        }

        setLoading(true);

        // Подготовка данных для API
        const payload = {
            fullName: values.fullName,
            phoneNum: values.phoneNumber, // Преобразуем имя поля
            email: values.email,
            question: values.question,
        };

        try {
            const response = await axios.post('https://rmc.mrjtrade.uz/api/application/create', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Предполагаем, что API возвращает успешный статус
            if (response.status === 200 || response.status === 201) {

                setValues({
                    fullName: "",
                    phoneNumber: "",
                    email: "",
                    question: "",
                });
            } else {
                setError(t('unexpectedResponse'));
            }
        } catch (err: unknown) {
            // Обработка ошибок с использованием AxiosError
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // Сервер ответил с ошибкой
                    setError(axiosError.response.data.message || t('submissionFailed'));
                } else if (axiosError.request) {
                    // Запрос был сделан, но ответа не было
                    setError(t('noResponseFromServer'));
                } else {
                    // Произошла другая ошибка
                    setError(t('errorOccurred'));
                }
            } else {
                // Неизвестная ошибка
                setError(t('errorOccurred'));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="xl:flex xl:flex-row xl:justify-between bg-[#EDF3F5] max-w-[1440px] w-full mx-auto">
            <div className="xl:hidden">
                <Image src={build1} alt="Building" layout="responsive" objectFit="cover" />
            </div>
            <div className="xl:w-[35%] max-xl:px-[16px] xl:ml-[20px] 2xl:ml-[30px] 3xl:ml-[60px]">
                <h3 className="text-[25px] text-[#000] font-medium md:text-[32px] mdl:text-[40px] pt-[20px] pb-[17px] xl:pt-[40px] 3xl:pt-[60px] 3xl:pb-[50px] xl:leading-[55px] 3xl:text-[55px] lh">
                    {t('haveQuestions')}<br />
                    {t('contactUs')}
                </h3>
                <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
                    {(["fullName", "phoneNumber", "email", "question"] as Array<keyof FormValues>).map((field) => (
                        <div className="relative" key={field}>
                            <input
                                type={field === "email" ? "email" : "text"}
                                name={field === "phoneNumber" ? "phoneNumber" : field} // Убедитесь, что имена полей совпадают
                                value={values[field]}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedInput(field)}
                                onBlur={() => setFocusedInput(null)}
                                className={`block w-full px-4 py-3 bg-transparent text-gray-800 placeholder-transparent focus:outline-none border-b-2 ${
                                    focusedInput === field
                                        ? validateInput(field, values[field]).isValid
                                            ? "border-gray-300"
                                            : "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder={t(field)}
                            />
                            <label
                                htmlFor={field}
                                className={`absolute transition-all ${focusedInput === field || values[field]
                                        ? "-top-4 text-xs text-gray-600"
                                        : "top-3 text-[16px] mdx:text-[18px] text-gray-800"
                                    } cursor-text`}
                                onClick={() => {
                                    const element = document.getElementsByName(field)[0];
                                    if (element) {
                                        element.focus();
                                    }
                                }}
                            >
                                {focusedInput === field && values[field].length > 0
                                    ? validateInput(field, values[field]).message
                                    : field === "fullName"
                                        ? (
                                            <span>
                                                {t('fullName')}
                                                <span className="text-red-500 ml-2">*</span>
                                            </span>
                                        )
                                        : field === "phoneNumber"
                                            ? (
                                                <span>
                                                    {t('phoneNumber')}
                                                    <span className="text-red-500 ml-2">*</span>
                                                </span>
                                            )
                                            : field === "email"
                                                ? (
                                                    <span>
                                                        E-mail
                                                        <span className="text-red-500 ml-2">*</span>
                                                    </span>
                                                )
                                                : t('question')}
                            </label>
                        </div>
                    ))}
                    {/* Отображение сообщений об ошибках или успехе */}
                    {error && <p className="text-red-500">{error}</p>}
                    {/* Отключено отображение сообщения об успехе */}
                    {/* {success && <p className="text-green-500">{success}</p>} */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading} // Отключить кнопку при загрузке
                            className={`py-3 w-full max-w-[228px] px-8 text-white bg-[#E1AF93] font-semibold hover:bg-[#EAC7B4] mb-[24px] mdx:mb-[30px] 2xl:mt-[34px] 3xl:mt-[34px] ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading ? t('submitting') : t('submit')}
                        </button>
                    </div>
                </form>
            </div>
            <div className="xl:w-[40%] hidden xl:block ">
                <Image src={build2} quality={100} alt="Building" className="object-cover h-full" />
            </div>
        </div>
    );
}

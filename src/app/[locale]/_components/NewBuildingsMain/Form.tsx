"use client";
import { useState, ChangeEvent } from "react";
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
    const t = useTranslations('NewBuildingsMain.Form');

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
        <div className=" bg-[#EDF3F5] w-full mx-auto xl:h-[579px] xl:flex xl:items-center xl:justify-between">
            <div className="xl:flex xl:flex-row xl:justify-between max-xl:px-[16px] mx-auto max-w-[1380px] w-full">
                <div className="xl:max-w-[710px] xl:w-full">
                    <h3 className="text-[25px] text-[#000] font-medium md:text-[32px] mdl:text-[40px] pt-[20px]  xl:pt-0 xl:leading-[70px] 3xl:text-[55px] lh w-full">
                        {t('haveQuestions')}<br />
                    </h3>
                    <p className="text-[#858585] xl:max-w-[587px] text-[16px] mdx:text-[20px] mt-[12px] mdx:mt-[20px] mb-[40px] xl:mb-0">{t('contactUs')}</p>
                </div>
                <form className="flex flex-col gap-6 w-full xl:max-w-[407px]" onSubmit={handleSubmit}>
                    {(["fullName", "phoneNumber", "email", "question"] as Array<keyof FormValues>).map((field) => (
                        <div className="relative" key={field}>
                            <input
                                type={field === "email" ? "email" : "text"}
                                name={field === "phoneNumber" ? "phoneNumber" : field} // Убедитесь, что имена полей совпадают
                                value={values[field]}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedInput(field)}
                                onBlur={() => setFocusedInput(null)}
                                className={`block w-full px-4 py-3 bg-transparent text-gray-800 placeholder-transparent focus:outline-none border-b-2 ${focusedInput === field
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

                                                    </span>
                                                )
                                                : t('question')}
                            </label>
                        </div>
                    ))}
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            disabled={loading} // Отключить кнопку при загрузке
                            className={`py-3 w-full max-w-[228px] px-8 text-white bg-corporate font-semibold hover:bg-hover_corporate mb-[24px] mdx:mb-[30px] xl:mb-0 2xl:mt-[34px] 3xl:mt-[34px] transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? t('submitting') : t('submit')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

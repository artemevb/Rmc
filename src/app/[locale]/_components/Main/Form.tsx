"use client";
import { useState, ChangeEvent } from "react";
import build1 from "@/public/images/main/form1.jpg";
import build2 from "@/public/images/main/form2.jpg";
import Image from 'next/image';
import { useTranslations } from "next-intl";
import axios, { AxiosError } from 'axios';
import SuccessModal from "@/src/app/[locale]/_components/Modal/SuccessModal"; // Adjust the path as necessary

// Define form values interface
interface FormValues {
    fullName: string;
    phoneNumber: string;
    email: string;
    question: string;
}

// Interface for API error response
interface ErrorResponse {
    message: string;
}

// Validation result interface
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
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state

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

        // Validate all fields before submission
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

        // Additional check for empty fields
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

        // Prepare data for API
        const payload = {
            fullName: values.fullName,
            phoneNum: values.phoneNumber, // Rename field
            email: values.email,
            question: values.question,
        };

        try {
            // Submit the form data
            const response = await axios.post('https://rmc.mrjtrade.uz/api/application/create', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Assume API returns a successful status
            if (response.status === 200 || response.status === 201) {
                // Reset form fields
                setValues({
                    fullName: "",
                    phoneNumber: "",
                    email: "",
                    question: "",
                });

                // Open the success modal
                setIsModalOpen(true);

                // Send the SEND_APPLICATION counter request
                try {
                    await axios.post('https://rmc.mrjtrade.uz/api/counter/add?button=SEND_APPLICATION');
                } catch (counterError) {
                    console.error('Counter API call failed:', counterError);
                    // Optionally set a non-blocking error message
                    // setError(t('counterApiFailed'));
                }
            } else {
                setError(t('unexpectedResponse'));
            }
        } catch (err: unknown) {
            // Handle errors using AxiosError
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // Server responded with an error
                    setError(axiosError.response.data.message || t('submissionFailed'));
                } else if (axiosError.request) {
                    // Request was made but no response received
                    setError(t('noResponseFromServer'));
                } else {
                    // Other errors
                    setError(t('errorOccurred'));
                }
            } else {
                // Unknown error
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
            <div className="xl:w-[35%] max-xl:px-[16px] xl:ml-[20px] 2xl:ml-[30px] 3xl:ml-[60px] 3xl:w-[37%]">
                <h3 className="text-[25px] text-[#000] font-medium md:text-[32px] mdl:text-[40px] pt-[20px] pb-[17px] xl:pt-[40px] 3xl:pt-[60px] 3xl:pb-[50px] xl:leading-[55px] 3xl:text-[55px] lh">
                    {t('haveQuestions')}<br />
                    <span className="text-[15px] md:text-[23px] mdl:text-[32px] 3xl:text-[40px]">{t('contactUs')}</span>
                </h3>
                <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
                    {(["fullName", "phoneNumber", "email", "question"] as Array<keyof FormValues>).map((field) => (
                        <div className="relative" key={field}>
                            <input
                                type={field === "email" ? "email" : "text"}
                                name={field === "phoneNumber" ? "phoneNumber" : field}
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
                                                        <span className="text-red-500 ml-2">*</span>
                                                    </span>
                                                )
                                                : t('question')}
                            </label>
                        </div>
                    ))}
                    {/* Display error messages */}
                    {error && <p className="text-red-500">{error}</p>}
                    {/* Success message can be added here if needed */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading} // Disable button when loading
                            className={`py-3 w-full max-w-[228px] px-8 text-white bg-corporate font-semibold hover:bg-hover_corporate mb-[24px] mdx:mb-[30px] 2xl:mt-[34px] 3xl:mt-[34px] transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? t('submitting') : t('submit')}
                        </button>
                    </div>
                </form>
            </div>
            <div className="xl:w-[40%] hidden xl:block ">
                <Image src={build2} quality={100} alt="Building" className="object-cover h-full max-h-[699px]" />
            </div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

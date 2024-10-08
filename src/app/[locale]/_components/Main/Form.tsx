"use client";
import { useState } from "react";
import build1 from "@/public/images/main/Form1.png";
import build2 from "@/public/images/main/Form2.png";
import Image from 'next/image';

export default function ContAddress() {
    const [values, setValues] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        question: "",
    });

    const [focusedInput, setFocusedInput] = useState(null);

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const validateInput = (name, value) => {
        if (name === "fullName") {
            return value.length >= 3
                ? { isValid: true, message: "Правильно" }
                : { isValid: false, message: "Введите полное имя" };
        } else if (name === "phoneNumber") {
            const phoneRegex =
                /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,3}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}$/;
            return phoneRegex.test(value)
                ? { isValid: true, message: "Правильно" }
                : { isValid: false, message: "Введите правильный номер" };
        } else if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value)
                ? { isValid: true, message: "Правильно" }
                : { isValid: false, message: "Введите правильный email" };
        }
        return { isValid: true, message: "" };
    };

    return (

        <div className="xl:flex xl:flex-row xl:justify-between bg-[#EDF3F5] max-w-[1440px] w-full mx-auto">
            <div className="xl:hidden">
                <Image src={build1} alt="Building" layout="responsive" objectFit="cover" />

            </div>
            <div className="xl:w-[35%] max-xl:px-[16px] xl:ml-[20px] 2xl:ml-[30px] 3xl:ml-[60px]">
                <h3 className="text-[25px] text-[#000] font-medium md:text-[32px] mdl:text-[40px] pt-[20px] pb-[17px] xl:pt-[40px] 3xl:pt-[60px] 3xl:pb-[50px] xl:leading-[55px] 3xl:text-[55px] lh">
                    Остались вопросы?<br />
                    Свяжитесь с нами!
                </h3>
                <form className="flex flex-col gap-6 w-full">
                    {["fullName", "phoneNumber", "email", "question"].map((field) => (
                        <div className="relative" key={field}>
                            <input
                                type={field === "email" ? "email" : "text"}
                                name={field}
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
                                placeholder={
                                    field === "fullName"
                                        ? "ФИО"
                                        : field === "phoneNumber"
                                            ? "Номер телефона"
                                            : field === "email"
                                                ? "E-mail"
                                                : "Ваш вопрос"
                                }
                            />
                            <label
                                htmlFor={field}
                                className={`absolute transition-all ${focusedInput === field || values[field]
                                    ? "-top-4 text-xs text-gray-600"
                                    : "top-3 text-[16px] mdx:text-[18px] text-gray-800"
                                    } cursor-text`}
                                onClick={() => document.getElementsByName(field)[0].focus()}
                            >
                                {focusedInput === field && values[field].length > 0
                                    ? validateInput(field, values[field]).message
                                    : field === "fullName"
                                        ? <p>ФИО<span className="ml-2">*</span></p>
                                        : field === "phoneNumber"
                                            ? <p>Номер телефона<span className="ml-2">*</span></p>
                                            : field === "email"
                                                ? "E-mail"
                                                : "Ваш вопрос"}
                            </label>
                        </div>
                    ))}
                    <div>
                        <button
                            type="submit"
                            className="py-3 w-full max-w-[228px] px-8 text-white bg-[#E1AF93] font-semibold hover:bg-[#EAC7B4] mb-[24px] mdx:mb-[30px] 2xl:mt-[34px]"
                        >
                            Отправить
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

"use client";
import Image from "next/image";
import { useState } from "react";
import { useLocale } from 'next-intl';
import photo1 from "@/public/images/Calculator/table_mobile.png";
import photo2 from "@/public/images/Calculator/Full.png";
import arrow from "@/public/svg/arrow-right-white.svg";

import BuyForm from "@/src/app/[locale]/_components/Converter/BuyForm";
import Sell from "@/src/app/[locale]/_components/Converter/SellForm";
import ToRentOut from "@/src/app/[locale]/_components/Converter/ToRentOutForm";

import ShemeBuy from "@/src/app/[locale]/_components/Converter/BuyFormComponents/ShemeBuy";
import InfoReviewsBuy from "@/src/app/[locale]/_components/Converter/BuyFormComponents/InfoReviewsBuy";
import BlockCardsBuy from "@/src/app/[locale]/_components/Converter/BuyFormComponents/BlockCardsBuy";
import PopularRewiewsBuy from "@/src/app/[locale]/_components/Converter/BuyFormComponents/PopularRewiewsBuy";
import ListBuildings from "@/src/app/[locale]/_components/NewBuildingsMain/Main";
import BuyDock from "@/src/app/[locale]/_components/Converter/BuyFormComponents/ByDocBlock";


import BlockCardsSell from "@/src/app/[locale]/_components/Converter/SellFormComponents/BlockCardsSell";
import InfoReviewsSell from "@/src/app/[locale]/_components/Converter/SellFormComponents/InfoReviewsSell";
import PopularRewiewsSell from "@/src/app/[locale]/_components/Converter/SellFormComponents/PopularRewiewsSell";
import SellForm from "@/src/app/[locale]/_components/Converter/SellFormComponents/SellForm";
import ShemeSell from "@/src/app/[locale]/_components/Converter/SellFormComponents/ShemeSell";
import SellDock from "@/src/app/[locale]/_components/Converter/SellFormComponents/SellDocBlock";

import PopularRewiewsRent from "@/src/app/[locale]/_components/Converter/ToRentOutFormComponents/PopularRewiewsRent";
import InfoReviewsRent from "@/src/app/[locale]/_components/Converter/ToRentOutFormComponents/InfoReviewsRent";
import Form from "@/src/app/[locale]/_components/Main/Form";
import Contacts from "@/src/app/[locale]/_components/Converter/BuyFormComponents/Contacts";
import RentForm from "@/src/app/[locale]/_components/Converter/ToRentOutFormComponents/RentForm";
import ShemeRent from "@/src/app/[locale]/_components/Converter/ToRentOutFormComponents/ShemeRent";
import RentDock from "@/src/app/[locale]/_components/Converter/ToRentOutFormComponents/RentDocBlock";
import BlockCardsRent from "@/src/app/[locale]/_components/Converter/ToRentOutFormComponents/BlockCardsRent";

type ButtonLabels = "Купить" | "Продать" | "Сдать";

export default function Banner() {
    const [activeButton, setActiveButton] = useState<ButtonLabels>("Купить");
    const locale = useLocale();

    const components: Record<ButtonLabels, JSX.Element> = {
        Купить: <BuyForm />,
        Продать: <Sell />,
        Сдать: <ToRentOut />,
    };

    const additionalComponents: Record<ButtonLabels, JSX.Element[]> = {
        Купить: [
            <BlockCardsBuy key="BlockCardsBuy" />,
            <InfoReviewsBuy key="InfoReviewsBuy" />,
            <ListBuildings key="ListBuildings" locale={locale} />,
            <ShemeBuy key="ShemeBuy" />,
            <BuyDock key="BuyDock" />,
            <PopularRewiewsBuy key="PopularRewiewsBuy" />,
            <Form key="form" />,
            <Contacts key="contacts" />,
        ],
        Продать: [
            <BlockCardsSell key="BlockCardsSell" />,
            <InfoReviewsSell key="InfoReviewsSell" />,
            <SellForm key="SellForm" />,
            <ShemeSell key="ShemeSell" />,
            <SellDock key="SellDock" />,
            <PopularRewiewsSell key="PopularRewiewsSell" />,
            <Form key="form" />,
            <Contacts key="contacts" />,
        ],
        Сдать: [
            <BlockCardsRent key="BlockCardsRent" />,
            <InfoReviewsRent key="InfoReviewsRent" />,
            <RentForm key="RentForm" />,
            <ShemeRent key="ShemeRent" />,
            <RentDock key="RentDock" />,
            <PopularRewiewsRent key="PopularRewiewsRent" />,
            <Form key="form" />,
            <Contacts key="contacts" />,
        ],
    };

    const buttonLabels: ButtonLabels[] = ["Купить", "Продать", "Сдать"];

    return (
        <div className="relative w-full h-auto flex flex-col mx-auto">
            <div className="relative w-full">
                {/* Mobile Image */}
                <Image
                    src={photo1}
                    quality={100}
                    alt="Banner mobile Image"
                    layout="responsive"
                    className="w-full h-auto max-h-screen min-h-[728px] object-cover slg:hidden"
                />
                {/* Desktop Image */}
                <Image
                    src={photo2}
                    quality={100}
                    alt="Banner PC Image"
                    layout="responsive"
                    className="w-full h-full max-h-[800px] min-h-[728px] slg:min-h-[900px] 2xl:min-h-[800px] object-cover hidden slg:block"
                />

                <div className="absolute inset-0 w-full flex flex-col max-slg:justify-between items-center text-white max-w-[1440px] mx-auto slg:px-[15px] 3xl:px-0">
                    {/* Main Text */}
                    <div className="text-center max-slg:max-w-[456px] mt-[141px] mdx:mt-[75px]">
                        <h1 className="text-[30px] font-medium mdx:text-[45px] xl:text-[55px] leading-[38px] mdx:leading-[50px]">
                            Жилые решения для вашего будущего
                        </h1>
                        <h5 className="text-[14px] mdx:text-[20px] mt-2">
                            Найди свой идеальный дом с нами
                        </h5>
                    </div>

                    {/* МЕНЮ ПРИ МОБИЛКЕ*/}
                    <div className="mt-[293px] mdx:mt-[326px] h-full w-full slg:hidden text-[20px] font-medium">
                        {buttonLabels.map((label, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center px-4 border-t border-gray-400 cursor-pointer w-full py-[17px]"
                                onClick={() => setActiveButton(label)}
                            >
                                <span className="text-lg">{label}</span>
                                <Image
                                    src={arrow}
                                    quality={100}
                                    alt="Arrow icon"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Меню при Desktop */}
                    <div className="w-full h-full max-h-[61px] hidden slg:block mt-[40px] mb-[12px]">
                        <div className="w-full h-full max-h-[61px] backdrop-blur-7.5 grid grid-cols-3 text-[20px] font-semibold gap-[10px] p-[4px] ">
                            {buttonLabels.map((label, index) => (
                                <button
                                    key={index}
                                    className={`${activeButton === label
                                        ? "bg-white text-[#333333]"
                                        : "bg-transparent text-[#fff]"
                                        } max-h-[53px] h-full w-full mx-auto`}
                                    onClick={() => setActiveButton(label)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Показ выбранной формы */}
                    {components[activeButton]}


                </div>
                {/* Показ дополнительных компонентов в зависимости от выбранного состояния */}
                {additionalComponents[activeButton].map((Comp, idx) => (
                    <div key={idx} className="w-full mt-[120px] mdx:mt-[150px] xl:mt-[200px] mb-[120px] mdx:mb-[150px] xl:mb-[200px] mx-auto relative z-[999999]">
                        {Comp}
                    </div>
                ))}
            </div>
        </div>
    );
}

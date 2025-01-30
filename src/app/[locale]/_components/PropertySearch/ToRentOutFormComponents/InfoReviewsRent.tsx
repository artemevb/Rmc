"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import openIcon from "@/public/svg/button-arrow-top.png";
import closedIcon from "@/public/svg/button-arrow-bottom.png";
import Image from 'next/image';

interface FaqItem {
    questionKey: string;
    answerKey: string;
}

const faqData: FaqItem[] = [
    {
        questionKey: "faq1.question",
        answerKey: "faq1.answer"
    },
    {
        questionKey: "faq2.question",
        answerKey: "faq2.answer"
    },
    {
        questionKey: "faq3.question",
        answerKey: "faq3.answer"
    },
    {
        questionKey: "faq4.question",
        answerKey: "faq4.answer"
    },
    {
        questionKey: "faq5.question",
        answerKey: "faq5.answer"
    }
];

interface ArrowProps {
    isOpen: boolean;
}

const Arrow: React.FC<ArrowProps> = ({ isOpen }) => (
    <>
        {isOpen ? (
            <Image
                src={openIcon}
                alt="Open icon"
                width={50}
                height={50}
                quality={100}
                className="transition-transform duration-300"
            />
        ) : (
            <Image
                src={closedIcon}
                alt="Closed icon"
                width={50}
                height={50}
                quality={100}
                className="transition-transform duration-300"
            />
        )}
    </>
);

const FaqSection: React.FC = () => {
    const t = useTranslations('PropertySearch.infoReviewsRent');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-[1440px] 5xl:max-w-[2000px] mx-auto max-3xl:px-[10px]">
            <div className="flex flex-col 2xl:flex-row justify-between">
                {/* Заголовок */}
                <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium mb-6 2xl:w-1/3 max-w-[471px]">
                    {t('header')}
                </h2>

                {/* Список вопросов и ответов */}
                <div className="2xl:w-2/3 2xl:max-w-[710px]">
                    {faqData.map((item, index) => (
                        <div key={index} className="">
                            <button
                                className="w-full flex justify-between items-start text-left py-[30px] mdx:py-[37px] xl:py-[43px] text-lg transition-all duration-700"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span
                                    className={`text-[22px] mdx:text-[26px] xl:text-[30px] max-mdx:max-w-[80%] ${openIndex === index ? 'text-corporate' : 'text-black'
                                        } transition-all duration-700`}
                                >
                                    {t(item.questionKey)}
                                </span>
                                <span className="flex-shrink-0">
                                    <Arrow isOpen={openIndex === index} />
                                </span>
                            </button>
                            <div
                                className={`border-b border-[#E1E1E1] overflow-hidden transition-all duration-700 ${openIndex === index ? 'max-h-screen' : 'max-h-0'
                                    }`}
                            >
                                <p className="p-4 text-[15px] mdx:text-[20px]">{t(item.answerKey)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqSection;

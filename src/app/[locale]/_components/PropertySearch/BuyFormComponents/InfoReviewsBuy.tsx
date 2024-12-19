"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import openIcon from "@/public/svg/button-arrow-top.png";
import closedIcon from "@/public/svg/button-arrow-bottom.png";
import Image from 'next/image';

interface FaqItem {
    question: string;
    answer: string;
}

const faqData: FaqItem[] = [
    {
        question: "faq_question_1",
        answer: "faq_answer_1"
    },
    {
        question: "faq_question_2",
        answer: "faq_answer_2"
    },
    {
        question: "faq_question_3",
        answer: "faq_answer_3"
    },
    {
        question: "faq_question_4",
        answer: "faq_answer_4"
    },
    {
        question: "faq_question_5",
        answer: "faq_answer_5"
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
                alt="Open"
                width={50}
                height={50}
                quality={100}
                className="transition-transform duration-300"
            />
        ) : (
            <Image
                src={closedIcon}
                alt="Closed"
                width={50}
                height={50}
                quality={100}
                className="transition-transform duration-300"
            />
        )}
    </>
);

const FaqSection: React.FC = () => {
    const t = useTranslations('PropertySearch.infoReviewsBuy');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-[1440px] 5xl:max-w-[2000px] mx-auto max-3xl:px-[10px]">
            <div className="flex flex-col 2xl:flex-row justify-between">
                {/* Заголовок */}
                <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium mb-6 2xl:w-1/3 2xl:max-w-[471px]">
                    {t('title')}
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
                                    className={`text-[22px] mdx:text-[26px] xl:text-[30px] max-mdx:max-w-[80%] ${
                                        openIndex === index ? 'text-corporate' : 'text-black'
                                    } transition-all duration-700`}
                                >
                                    {t(item.question)}
                                </span>
                                <span className="flex-shrink-0">
                                    <Arrow isOpen={openIndex === index} />
                                </span>
                            </button>
                            <div
                                className={`border-b border-[#E1E1E1] overflow-hidden transition-all duration-700 ${
                                    openIndex === index ? 'max-h-screen' : 'max-h-0'
                                }`}
                            >
                                <p className="p-4 text-[15px] mdx:text-[20px] whitespace-pre-line">
                                    {t(item.answer)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqSection;

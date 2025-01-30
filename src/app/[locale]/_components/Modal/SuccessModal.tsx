"use client";

import React from "react";
import Image from "next/image";
import sent from "@/public/images/Modal/Icon.png";
import { useTranslations } from "next-intl";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
    const t = useTranslations("Modal");

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100000]"
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white p-6 md:p-8 shadow-md w-[90%] max-w-[400px] relative flex flex-col items-center justify-center">
                <Image
                    src={sent}
                    width={500}
                    quality={100}
                    height={500}
                    alt="sent Icon"
                    className='w-[80px] h-full mdx:w-[90px]'
                />
                <h2 className="text-[20px] mdx:text-[25px] text-corporate font-medium mb-[4px] mt-[20px]">{t("your_message_sent")}</h2>
                <p className="text-center text-[#858585] w-full mb-6 max-w-[204px] mdx:max-w-[234px] xl:text-[18px]">{t("your_message_has_been_sent")}</p>
                <button
                    onClick={onClose}
                    className="w-[192px] h-[49px] mdx:w-[223px] py-2 px-4 bg-corporate text-white hover:bg-hover_corporate transition-colors"
                >
                    {t("close")}
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;

"use client";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import document from "@/public/svg/tools/document.svg";
import time from "@/public/svg/tools/time.svg";

export default function RentDocBlock() {
    const t = useTranslations('PropertySearch.RentDocBlock');

    return (
        <div className="w-full max-w-[1440px] 5xl:max-w-[2000px] mx-auto px-2 flex flex-col gap-10">
            <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium hr max-w-[612px] leading-[38px] mdx:leading-[50px] xl:leading-[70px]">
                {t('header')}
            </h2>
            <div className='w-full flex flex-col xl:flex-row gap-[12px] mdx:gap-[20px] text-[16px] mdx:text-[20px]'>
                {/* Documents Section */}
                <div className='px-[20px] mdx:px-[40px] mdx:py-[40px] py-[25px] border w-full'>
                    <Image
                        src={document}
                        quality={100}
                        alt={t('documents.alt')}
                        width={50}
                        height={50}
                        className='w-[35px] h-[35px] mdx:w-[40px] mdx:h-[44px] xl:w-[50px] xl:h-[50px] mb-[20px] mdx:mb-[30px]'
                    />
                    <div className='flex flex-col gap-[2px]'>
                        <p>{t('documents.item1')}</p>
                        <p>{t('documents.item2')}</p>
                        <p>{t('documents.item3')}</p>
                        <p>{t('documents.item4')}</p>
                        <p>{t('documents.item5')}</p>
                        <p>{t('documents.item6')}</p>
                        <p>{t('documents.item7')}</p>
                        <p>{t('documents.item8')}</p>
                        <p>{t('documents.item9')}</p>
                        <p>{t('documents.item10')}</p>
                    </div>
                </div>

                {/* Timelines Section */}
                <div className='px-[20px] mdx:px-[40px] mdx:py-[40px] py-[25px] border w-full'>
                    <Image
                        src={time}
                        quality={100}
                        alt={t('times.alt')}
                        width={50}
                        height={50}
                        className='w-[35px] h-[35px] mdx:w-[40px] mdx:h-[44px] xl:w-[50px] xl:h-[50px] mb-[20px] mdx:mb-[30px]'
                    />
                    <p>{t('times.item1')}</p>
                    <p>{t('times.item2')}</p>
                    <p>{t('times.item3')}</p>
                </div>
            </div>
        </div>
    )
}

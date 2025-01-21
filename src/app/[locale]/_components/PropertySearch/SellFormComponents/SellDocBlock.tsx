"use client";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import document from "@/public/svg/tools/document.svg";
import time from "@/public/svg/tools/time.svg";

export default function Scheme() {
    const t = useTranslations('PropertySearch.SellDocBlock');

    return (
        <div className="w-full max-w-[1440px] 5xl:max-w-[2000px] mx-auto px-2 flex flex-col gap-10">
            <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium hr max-w-[612px] leading-[38px] mdx:leading-[50px] xl:leading-[70px]">
                {t('title')}
            </h2>
            <div className='w-full flex flex-col xl:flex-row gap-[12px] mdx:gap-[20px] text-[16px] mdx:text-[20px]'>
                {/** Блок с документами */}
                <div className='px-[20px] mdx:px-[40px] mdx:py-[40px] py-[25px] border w-full'>
                    <Image
                        src={document}
                        quality={100}
                        alt={t('document_icon_alt')}
                        width={50}
                        height={50}
                        className='w-[35px] h-[35px] mdx:w-[40px] mdx:h-[44px] xl:w-[50px] xl:h-[50px] mb-[20px] mdx:mb-[30px]'
                    />
                    <div className='flex flex-col gap-[2px]'>
                        <p>{t('documents.doc1')}</p>
                        <p>{t('documents.doc2')}</p>
                        <p>{t('documents.doc3')}</p>
                        <p>{t('documents.doc4')}</p>
                        <p>{t('documents.doc5')}</p>
                        {/* <p>{t('documents.doc6')}</p> */}
                        <p>{t('documents.doc7')}</p>
                        <p>{t('documents.doc8')}</p>
                        <p>{t('documents.doc9')}</p>
                        <p>{t('documents.doc10')}</p>
                    </div>
                </div>

                {/** Блок со сроками */}
                <div className='px-[20px] mdx:px-[40px] mdx:py-[40px] py-[25px] border w-full'>
                    <Image
                        src={time}
                        quality={100}
                        alt={t('time_icon_alt')}
                        width={50}
                        height={50}
                        className='w-[35px] h-[35px] mdx:w-[40px] mdx:h-[44px] xl:w-[50px] xl:h-[50px] mb-[20px] mdx:mb-[30px]'
                    />
                    <p>{t('timeframes.time1')}</p>
                    <p>{t('timeframes.time2')}</p>
                    <p>{t('timeframes.time3')}</p>
                </div>
            </div>
        </div>
    )
}

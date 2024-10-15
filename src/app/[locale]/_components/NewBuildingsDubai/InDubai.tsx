"use client"
import Image from 'next/image';
import build2 from "@/public/images/new_buildings/h-photo-dubai.png";
import build1 from "@/public/images/new_buildings/table-dubai.png";
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Invest() {
    const t = useTranslations('NewBuildings.InDubai');

    const formatText = (text: string) => {
        return text.split('\n').map((line, index) => (
            <div key={index} className='mb-[10px]'>{line}</div> // Use <div> instead of <p>
        ));
    };
    const formatParagraph = (text: string): JSX.Element[] => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };



    return (
        <div className='w-full h-auto flex flex-col mx-auto max-xl:px-[10px]'>
            <div>
                <div className='xl:flex flex-row xl:gap-[80px] 4xl:gap-[142px] xl:items-center justify-between w-full h-full'>
                    <div className='xl:w-full xl:max-w-[1092px] xl:ml-[2.3%] 4xl:ml-[12%]'>
                        <div className='font-medium text-[35px] mdx:text-[60px] xl:text-[80px] leading-[43px] mdx:leading-[55px] xl:leading-[80px] max-w-[446px] mb-[20px] block max-xl:mt-[25px] 4xl:mt-[30px]'>
                            <p className='inline'>{t('title-1')}</p>
                            <br />
                            <p className='inline text-[#E1AF93]'>{t('title-2')}</p>
                        </div>
                        <div className='text-[16px] font-normal mdx:text-[20px] text-[#858585] mt-[25px] mdx:mt-[30px] xl:mt-[25px]'>
                            {formatText(t('subtitle'))}
                        </div>

                        <div className='mdx:grid grid-cols-1 mdl:grid-cols-2 gap-y-[16px] mdx:gap-y-[20px] gap-x-[12px] xl:gap-x-[20px] w-full mt-[25px]  auto-rows-fr text-[16px] mdx:text-[20px] hidden xl:mt-[70px]'>
                            <div className='flex flex-col border p-[16px] mdx:p-[20px] xl:leading-[36px]'>
                                <div className='flex items-center flex-grow text-[18px] lh mdx:text-[24px] xl:text-[30px]'>
                                    {formatParagraph(t('text-1'))}
                                </div>
                                <p className='text-[#858585] text-[16px] mdx:text-[18px] lh xl:mt-[20px]'>
                                    {formatParagraph(t('subtitle-1'))}
                                </p>
                            </div>
                            <div className='flex flex-col border p-[16px] mdx:p-[20px] xl:leading-[36px]'>
                                <div className='flex items-center flex-grow lh text-[18px] mdx:text-[24px] xl:text-[30px]'>
                                    {formatParagraph(t('text-2'))}
                                </div>
                                <p className='text-[#858585] text-[16px] mdx:text-[18px] lh xl:mt-[20px]'>
                                    {formatParagraph(t('subtitle-2'))}
                                </p>
                            </div>
                            <div className='flex flex-col border p-[16px] mdx:p-[20px] xl:leading-[36px]'>
                                <div className='flex items-center lh xl:leading-[36px] flex-grow text-[18px] mdx:text-[24px] xl:text-[30px]'>
                                    {formatParagraph(t('text-3'))}
                                </div>
                                <p className='text-[#858585] text-[16px] mdx:text-[18px] lh xl:mt-[20px]'>
                                    {formatParagraph(t('subtitle-3'))}
                                </p>
                            </div>
                            <div className='flex flex-col border p-[16px] mdx:p-[20px] xl:leading-[36px]'>
                                <div className='flex items-center lh xl:leading-[36px] flex-grow text-[18px] mdx:text-[24px] xl:text-[30px]'>
                                    {formatParagraph(t('text-4'))}
                                </div>
                                <p className='text-[#858585] text-[16px] mdx:text-[18px] lh xl:mt-[20px]'>
                                    {formatParagraph(t('subtitle-4'))}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full mt-[25px] mdx:mt-[30px] xl:mt-0'>
                        <Image
                            src={build1}
                            quality={100}
                            alt="Banner Image"
                            layout="responsive"
                            className="w-full h-auto object-cover xl:hidden"
                        />
                        <Image
                            src={build2}
                            quality={100}
                            alt="Banner Image"
                            layout="responsive"
                            className="w-full h-full object-cover hidden xl:block xl:max-w-[828px]"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 mdl:grid-cols-2 gap-y-[16px] mdx:gap-y-[20px] gap-x-[12px] w-full mt-[25px]  auto-rows-fr text-[16px] mdx:text-[20px] mdx:hidden'>
                    <div className='flex flex-col border p-[16px] mdx:p-[20px] xl:leading-[36px]'>
                        <div className='flex items-center flex-grow text-[18px] lh mdx:text-[24px] xl:text-[30px]'>
                            {formatParagraph(t('text-1'))}
                        </div>
                        <p className='text-[#858585] text-[16px] mdx:text-[18px] lh mt-[8px] xl:mt-[20px]'>
                            {formatParagraph(t('subtitle-1'))}
                        </p>
                    </div>
                    <div className='flex flex-col border p-[16px] mdx:p-[20px] xl:leading-[36px]'>
                        <div className='flex items-center flex-grow lh text-[18px] mdx:text-[24px] xl:text-[30px]'>
                            {formatParagraph(t('text-2'))}
                        </div>
                        <p className='text-[#858585] text-[16px] mdx:text-[18px] lh mt-[8px] xl:mt-[20px]'>
                            {formatParagraph(t('subtitle-2'))}
                        </p>
                    </div>
                    <div className='flex flex-col border p-[16px] mdx:p-[20px] xl:leading-[36px]'>
                        <div className='flex items-center lh xl:leading-[36px] flex-grow text-[18px] mdx:text-[24px] xl:text-[30px]'>
                            {formatParagraph(t('text-3'))}
                        </div>
                        <p className='text-[#858585] text-[16px] mdx:text-[18px] lh mt-[8px] xl:mt-[20px]'>
                            {formatParagraph(t('subtitle-3'))}
                        </p>
                    </div>
                    <div className='flex flex-col border p-[16px] mdx:p-[20px] xl:leading-[36px]'>
                        <div className='flex items-center lh xl:leading-[36px] flex-grow text-[18px] mdx:text-[24px] xl:text-[30px]'>
                            {formatParagraph(t('text-4'))}
                        </div>
                        <p className='text-[#858585] text-[16px] mdx:text-[18px] lh mt-[8px] xl:mt-[20px]'>
                            {formatParagraph(t('subtitle-4'))}
                        </p>
                    </div>
                </div>

            </div>
        </div >
    );
}

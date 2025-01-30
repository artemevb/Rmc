"use client"
import Image from 'next/image';
import build2 from "@/public/images/new_buildings/w-image-dubai.png";
// import build1 from "@/public/images/new_buildings/phone_image-dubai.png";
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Invest() {
    const t = useTranslations('NewBuildings.NewBuildingsMarketDubai');

    const formatParagraph = (text: string): JSX.Element[] => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };



    return (
        <div className='w-full h-auto flex flex-col mx-auto max-xl:px-[10px] max-w-[1440px]'>
            <div className='2xl:flex gap-[180px] xl:mb-[60px] xl:items-center'>
                <h2 className='text-[30px] mdx:text-[45px] xl:text-[55px] font-medium leading-[38px] mdx:leading-[50px] xl:leading-[70px]'>
                    {formatParagraph(t("title"))}</h2>
                <div className='mt-[30px] 2xl:flex 2xl:justify-between gap-[20px] 2xl:gap-[100px] hidden'>
                    <p className='text-[16px] mdx:text-[20px] 2xl:max-w-[420px]'>
                        {formatParagraph(t("text-1"))}
                    </p>
                    <br />
                    <p className='text-[16px] mdx:text-[20px] 2xl:max-w-[420px]'>
                        {formatParagraph(t("text-2"))}
                    </p>
                </div>
            </div>
            <div className='w-full h-full mt-[20px] mdx:mt-[50px] xl:mt-0'>
                <Image
                    src={build2}
                    quality={100}
                    alt="building Image"
                    className="w-full h-auto object-cover min-h-[200px] xl:hidden"
                />
                <Image
                    src={build2}
                    quality={100}
                    alt="building Image"
                    layout="responsive"
                    className="w-full h-full object-cover hidden xl:block "
                />
            </div>
            <div className='mt-[30px] mdx:flex mdx:justify-between gap-[20px] 2xl:hidden'>
                <p className='text-[16px] mdx:text-[20px]'>
                    {formatParagraph(t("text-1"))}
                </p>
                <br />
                <p className='text-[16px] mdx:text-[20px]'>
                    {formatParagraph(t("text-2"))}
                </p>
            </div>
        </div >
    );
}

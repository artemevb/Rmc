"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

import Market from "@/public/images/main_buildings/Pc.png";
import Marketmob from "@/public/images/main_buildings/Table.png";

import School from "@/public/images/main_buildings/School_pc.png";
import Schoolmob from "@/public/images/main_buildings/School_table.png";

import Machine from "@/public/images/main_buildings/Machine_pc.png";
import Machinemob from "@/public/images/main_buildings/Machine_table.png";

interface CategoryData {
    description: string;
    items: { name: string; time: string }[];
    images: { desktop: StaticImageData; mobile: StaticImageData };
}



interface ApiData {
    markets: CategoryData;
    Machine: CategoryData;
    schools: CategoryData;
}

// Fake API data
const apiData: ApiData = {
    markets: {
        description: 'Наш район предлагает широкий выбор магазинов, чтобы удовлетворить любые потребности. В пешей доступности расположены крупные супермаркеты и продуктовые магазины.',
        items: [
            { name: 'Korzinka', time: '5 минут' },
            { name: 'Havas', time: '10 минут' },
            { name: 'FixPrice', time: 'Рядом' },
            { name: 'REDTAG', time: '25 минут' },
        ],
        images: {
            desktop: Market,
            mobile: Marketmob,
        },
    },
    Machine: {
        description: 'Благодаря развитой сети общественного транспорта, жители района могут быстро добраться до ключевых деловых и развлекательных центров.',
        items: [
            { name: 'м. Беруни', time: '5 минут' },
            { name: 'Аэропорт', time: '10 минут' },
            { name: 'м. Гафур-Гулям', time: '15 минут' },
            { name: 'Северный вокзал', time: '30 минут' },
        ],
        images: {
            desktop: Machine,
            mobile: Machinemob,
        },
    },
    schools: {
        description: 'Здесь находятся как государственные, так и частные школы, обеспечивающие качественное обучение.',
        items: [
            { name: '100 школа', time: '5 минут' },
            { name: '101 школа', time: '15 минут' },
            { name: 'Super school', time: '10 минут' },
            { name: 'W-school', time: '30 минут' },
        ],
        images: {
            desktop: School,
            mobile: Schoolmob,
        },
    },
};

export default function Infrastructure() {
    const t = useTranslations('Building_page_main.Infrastructure');
    const [category, setCategory] = useState<keyof ApiData>('markets');

    // Function to handle category filtering
    const handleCategoryClick = (newCategory: keyof ApiData) => {
        setCategory(newCategory);
    };

    // Function to get filtered content based on selected category
    const getFilteredContent = () => {
        return (
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mdx:gap-x-[120px] mdx:gap-y-8 mt-[40px] mdx:mt-[60px]">
                {apiData[category].items.map((item, index) => (
                    <div key={index}>
                        <h4 className="text-[22px] font-medium mdx:text-[30px]">{item.name}</h4>
                        <p className="text-[#B3B3B3] text-[16px] mdx:text-[20px]">{item.time}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full h-full flex flex-col mx-auto max-w-[1440px] max-3xl:px-[16px]">
            <div className='xl:flex xl:h-full xl:items-center xl:gap-[20px] 3xl:gap-[60px] w-full'>
                <h3 className="text-[30px] font-medium mdx:text-[45px] xl:text-[55px] leading-[38px] max-mdx:max-w-[224px] xl:hidden">
                    {t('title')}
                </h3>
                <div className="w-full h-full overflow-hidden xl:max-w-[710px] xl:max-h-[564px] max-mdx:mt-[25px] mdx:mt-[40px] xl:mt-0">
                    <Image
                        src={apiData[category].images.desktop}
                        alt={'Buildings'}
                        quality={100}
                        className="object-cover w-full h-full max-w-[710px] xl:max-h-[564px] hidden xl:block"
                        layout="responsive"
                    />
                    <Image
                        src={apiData[category].images.mobile}
                        alt={'Buildings'}
                        quality={100}
                        className="object-cover w-full h-full xl:min-h-[250px] xl:max-h-[564px] xl:hidden"
                        layout="responsive"
                    />
                </div>

                <div className='w-full xl:max-w-[670px]'>
                    <h3 className="text-[30px] font-medium mdx:text-[45px] xl:text-[55px] leading-[38px] max-mdx:max-w-[224px] hidden xl:block">
                        {t('title')}
                    </h3>
                    <div className="border-b overflow-x-scroll hide-scrollbar scrollbar-hide flex mt-[24px] mdx:mt-[40px] xl:mt-[50px] w-full gap-[30px]">
                        <button
                            onClick={() => handleCategoryClick('markets')}
                            className={`text-[#858585] text-[16px] mdx:text-[20px] pb-[19px] border-b-2 ${category === 'markets' ? ' text-[#E1AF93] border-[#E1AF93]' : 'border-transparent'
                                }`}
                        >
                            {t('Markets')}
                        </button>
                        <button
                            onClick={() => handleCategoryClick('Machine')}
                            className={`text-[#858585] text-[16px] mdx:text-[20px] pb-[19px] border-b-2 ${category === 'Machine' ? ' text-[#E1AF93] border-[#E1AF93]' : 'border-transparent'
                                }`}
                        >
                            {t('Machine')}
                        </button>
                        <button
                            onClick={() => handleCategoryClick('schools')}
                            className={`text-[#858585] text-[16px] mdx:text-[20px] pb-[19px] border-b-2 ${category === 'schools' ? ' text-[#E1AF93] border-[#E1AF93]' : 'border-transparent'
                                }`}
                        >
                            {t('Schools')}
                        </button>
                    </div>

                    <p className="text-[16px] mdx:text-[20px] mt-[16px] mdx:mt-[30px]">
                        {apiData[category].description}
                    </p>

                    {/* Filtered content */}
                    <div>{getFilteredContent()}</div>
                </div>
            </div>
        </div>
    );
}

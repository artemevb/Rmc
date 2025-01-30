'use client'
import { useState } from 'react';
import Image from 'next/image';
// import build1 from "@/public/images/main/build1.png";
// import build1_big from "@/public/images/main/Build1-big.png";
// import build2 from "@/public/images/main/build1.5.png";
// import build2_big from "@/public/images/main/build1-sm.png";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ArrowRigt from "@/public/svg/arrow-right-red.svg";
import ArrowRigtWhite from "@/public/svg/arrow-right-white.svg";

import test2 from "@/public/images/main/1.jpeg";
import test1 from "@/public/images/main/2.jpeg";

interface local {
    locale: string;
}

export default function Banner({ locale }: local) {
    const t = useTranslations('Main.Investition');
    const [isHovered, setIsHovered] = useState(false); 

    const processText = (text: string) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className='w-full h-auto flex flex-col mx-auto bg-[#EDF3F5] py-[30px] mdx:py-[40px] xl:py-[80px]'>
            <div className='mx-2 xl:flex xl:items-center xl:flex-row max-w-[1440px] xl:mx-auto'>
                <div className="xl:w-1/2 xl:pr-4">
                    <h2 className='text-[29px] mdx:text-[40px] mdl:text-[45px] xl:text-[50px] 2xl:text-[55px] font-medium mb-[12px] leading-[30px] mdl:leading-[40px] xl:leading-[50px]'>{t('title')}</h2>
                    <h4 className='text-[14px] mdx:text-[20px] mt-[30px] mb-[50px] hidden mdx:block'>
                        {processText(t('subtitle'))}
                    </h4>
                    <div>
                        <Link href={`/${locale}/investmentDubai`}>
                            <button
                                className="border border-corporate hover:bg-hover_corporate text-[17px] font-semibold text-black hover:text-white py-2 px-4 mdx:py-3 w-full max-w-[175px] mdx:max-w-[223px] mt-[30px] hidden xl:flex items-center justify-center transition-all duration-300"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <span>{t('button')}</span>
                                <Image
                                    src={isHovered ? ArrowRigtWhite : ArrowRigt}
                                    quality={100}
                                    alt="Arrow Right"
                                    width={20}
                                    height={20}
                                    className="ml-2 transition-all duration-300"
                                />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='xl:w-1/2 xl:pl-4 grid grid-cols-2 gap-[12px] xl:hidden'>
                    <div className="relative w-full h-full min-h-[220px]">
                        <Image
                            src={test1}
                            alt="buildings1"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            className="absolute top-0 left-0"
                        />
                    </div>
                    <div className="relative w-full h-full min-h-[220px]">
                        <Image
                            src={test2}
                            alt="buildings2"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            className="absolute top-0 left-0"
                        />
                    </div>
                </div>
                <div className=" hidden flex-1 w-full h-full xl:flex relative z-10">
                    <div className="relative w-full flex justify-center">
                        <div className="w-1/3 relative">
                        </div>
                        <div className="w-[32%] h-[50%] ml-[130px] aspect-w-4 aspect-h-1 absolute bottom-[-30px] left-0 z-10">
                            <Image
                                src={test1}
                                quality={100}
                                alt="buildings"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="w-[62%] aspect-w-4 aspect-h-3 relative mb-[50px] ">
                            <Image
                                src={test2}
                                alt="Office"
                                quality={100}
                                objectFit="cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <h4 className='text-[14px] mdx:text-[20px] mt-[16px] mdx:hidden max-xl:px-[10px]'>
                {processText(t('subtitle'))}
            </h4>
            <div className='max-xl:px-[10px]'>
                <Link href={`/${locale}/investmentDubai`}>
                    <button
                        className="border border-corporate hover:bg-hover_corporate text-[17px] font-semibold text-black hover:text-white py-2 px-4 mdx:py-3 w-full max-w-[175px] mdx:max-w-[223px] mt-[30px] xl:hidden flex items-center justify-center transition-all duration-300"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <span>{t('button')}</span>
                        <Image
                            src={isHovered ? ArrowRigtWhite : ArrowRigt}
                            quality={100}
                            alt="Arrow Right"
                            width={18}
                            height={18}
                            className="ml-[7px] transition-all duration-300"
                        />
                    </button>
                </Link>
            </div>
        </div>
    );
}

"use client"
import { useState } from 'react';
import Image from 'next/image';
// import build1 from "@/public/images/main/build2.png";
// import build1_big from "@/public/images/main/build2-big.png";
// import build2 from "@/public/images/main/build3.png";
import { useTranslations } from 'next-intl';
import Application from '../Modal/Application';
import test2 from "@/public/images/main/3.jpeg";
import test1 from "@/public/images/main/4.jpeg";

export default function Banner() {
    const t = useTranslations('investmentsDubai.Consalting');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    const processText = (text: string) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className='w-full h-auto flex flex-col mx-auto bg-[#FCE8E9] py-[30px] mdx:py-[40px] xl:py-[80px]'>
            <div className='mx-2 xl:flex xl:items-center xl:justify-between xl:flex-row max-w-[1440px] xl:mx-auto'>
                <div className="xl:w-full xl:max-w-[800px] xl:pr-4">
                    <h2 className='text-[29px] mdx:text-[40px] mdl:text-[45px] xl:text-[50px] 2xl:text-[55px] font-medium mb-[12px] leading-[32px] mdl:leading-[40px] xl:leading-[58px]'>{t('title')}</h2>
                    <h4 className='text-[14px] mdx:text-[20px] mt-[30px] mb-[50px] hidden mdx:block'>
                        {processText(t('subtitle'))}
                    </h4>
                    <div>
                        <button
                            onClick={openModal}
                            className="bg-corporate hover:bg-hover_corporate text-[17px] font-semibold text-white py-2 px-4 mdx:py-3 w-full max-w-[175px] mdx:max-w-[223px] mt-[30px] hidden xl:block transition-all duration-300">
                            {t('button')}
                        </button>
                    </div>
                </div>
                <div className="xl:w-1/2 xl:pl-4 grid grid-cols-2 gap-[12px] xl:hidden">
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

                <div className=" hidden flex-1 w-full h-full xl:flex relative z-10 max-w-[588px]">
                    <div className="relative w-full flex justify-end">
                        <div className="w-[32%] h-[50%] left-[145px] aspect-w-4 aspect-h-1 absolute bottom-[-30px] z-10">
                            <Image
                                src={test2}
                                alt="Medical Equipment"
                                quality={100}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="w-[62%] aspect-w-4 aspect-h-3 relative mb-[50px] ml-[200px]">
                            <Image
                                src={test1}
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
                <button
                    onClick={openModal}
                    className="bg-corporate hover:bg-hover_corporate text-[17px] font-semibold text-white py-2 px-4 mdx:py-3 w-full max-w-[175px] mdx:max-w-[223px] mt-[30px] xl:hidden transition-all duration-300">
                    {t('button')}
                </button>
            </div>
            <Application isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

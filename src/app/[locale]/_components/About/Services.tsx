"use client";
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import scoop from "@/public/images/about/scoop.png";
import key from "@/public/images/about/key.png";
import nedvijimost from "@/public/images/about/nedvijimost.png";
import check from "@/public/svg/check_white.svg";

export default function Services() {
    const t = useTranslations('About.Service');
    const [isAbove460px, setIsAbove460px] = useState<boolean>(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 460) {
                setIsAbove460px(true);
            } else {
                setIsAbove460px(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="w-full max-w-[1440px] h-auto flex flex-col mdx:flex-row mx-auto px-[10px] overflow-auto hide-scrollbar mdx:gap-[12px]">
            <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium mdx:hidden">{t('title')}</h2>
            <p className='text-[16px] mdx:text-[20px] text-[#858585] mb-[30px] mdx:mb-[40px] mdx:hidden'>{t('subtitle')}</p>
            {/* Карточка 2 — сразу показываем и текст, и изображение */}
            <div className='flex-col w-full mt-[20px]'>
                <div className='w-full h-[390px] min-w-[342px] bg-[#EDF3F5] p-[22px] relative overflow-hidden'>
                    <h4 className='text-[22px] mdx:text-[22px] xl:text-[24px] font-medium'>{t('card2.title')}</h4>
                    {isAbove460px ? (
                        <>
                            {/* На больших экранах карточка с текстом и изображением */}
                            <div className='relative'>
                                <div className='absolute right-0 bottom-[-248px] w-[170px] h-[220px]'>
                                    <Image
                                        src={key}
                                        quality={100}
                                        alt={t('card2.imageAlt')}
                                        width={450}
                                        height={450}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='max-w-[223px] mt-[20px] w-full'>
                                    {/* Показываем сразу текст и изображения */}
                                    <div className='flex gap-[8px]'>
                                        <div className='rounded-full min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] bg-corporate flex items-center justify-center'>
                                            <Image
                                                src={check}
                                                quality={100}
                                                alt="check"
                                                objectFit="cover"
                                                className='min-w-[14.211px] min-h-[13.263px] max-w-[14.211px] max-h-[13.263px] w-full'
                                            />
                                        </div>
                                        <p className='text-[16px] mdx:text-[18px] xl:text-[20px] whitespace-nowrap'>{t('card2.items.0.text')}</p>
                                    </div>
                                    <div className='flex gap-[8px] mt-[10px] items-center'>
                                        <div className='rounded-full min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] bg-corporate flex items-center justify-center mt-[4px]'>
                                            <Image
                                                src={check}
                                                quality={100}
                                                alt="check"
                                                objectFit="cover"
                                                className='min-w-[14.211px] min-h-[13.263px] max-w-[14.211px] max-h-[13.263px] w-full'
                                            />
                                        </div>
                                        <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>{t('card2.items.1.text')}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Для маленьких экранов изображение будет рядом с текстом */}
                            <div className='absolute w-full max-w-[180px] h-auto right-0 bottom-[-5px]'>
                                <Image
                                    src={key}
                                    quality={100}
                                    alt={t('card2.imageAlt')}
                                    width={450}
                                    height={450}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div className='max-w-[265px] mt-[20px]'>
                                <div className='flex gap-[8px]'>
                                    <div className='rounded-full min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] bg-corporate flex items-center justify-center'>
                                        <Image
                                            src={check}
                                            quality={100}
                                            alt="check"
                                            objectFit="cover"
                                            className='min-w-[14.211px] min-h-[13.263px] max-w-[14.211px] max-h-[13.263px] w-full'
                                        />
                                    </div>
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>{t('card2.items.0.text')}</p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <div className='rounded-full min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] bg-corporate flex items-center justify-center mt-[4px]'>
                                        <Image
                                            src={check}
                                            quality={100}
                                            alt="check"
                                            objectFit="cover"
                                            className='min-w-[14.211px] min-h-[13.263px] max-w-[14.211px] max-h-[13.263px] w-full'
                                        />
                                    </div>
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>{t('card2.items.1.text')}</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className='flex-col w-full mt-[20px]'>
                <div className='w-full h-[390px] min-w-[342px] bg-[#EDF3F5] p-[22px] relative overflow-hidden'>
                    <h4 className='text-[22px] mdx:text-[22px] xl:text-[24px] font-medium'>{t('card3.title')}</h4>
                    {isAbove460px ? (
                        <>
                            {/* Для больших экранов — изображение с абсолютным позиционированием */}
                            <div className='relative'>
                                <div className='absolute right-0 bottom-[-205px] w-[180px] h-[200px]'>
                                    <Image
                                        src={scoop}
                                        quality={100}
                                        alt={t('card3.imageAlt')}
                                        width={450}
                                        height={450}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='max-w-[223px] mt-[20px] w-full'>
                                    {/* Показываем текст и изображения на больших экранах */}
                                    <div className='flex gap-[8px]'>
                                        <div className='rounded-full min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] bg-corporate flex items-center justify-center'>
                                            <Image
                                                src={check}
                                                quality={100}
                                                alt="check"
                                                objectFit="cover"
                                                className='min-w-[14.211px] min-h-[13.263px] max-w-[14.211px] max-h-[13.263px] w-full'
                                            />
                                        </div>
                                        <p className='text-[16px] mdx:text-[18px] xl:text-[20px] whitespace-nowrap'>{t('card3.items.0.text')}</p>
                                    </div>
                                    <div className='flex gap-[8px] mt-[10px]'>
                                        <div className='rounded-full min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] bg-corporate flex items-center justify-center mt-[4px]'>
                                            <Image
                                                src={check}
                                                quality={100}
                                                alt="check"
                                                objectFit="cover"
                                                className='min-w-[14.211px] min-h-[13.263px] max-w-[14.211px] max-h-[13.263px] w-full'
                                            />
                                        </div>
                                        <p className='text-[16px] mdx:text-[18px] xl:text-[20px] whitespace-nowrap'>{t('card3.items.1.text')}</p>
                                    </div>
                                    <div className='flex gap-[8px] mt-[10px]'>
                                        <div className='rounded-full min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] bg-corporate flex items-center justify-center mt-[4px]'>
                                            <Image
                                                src={check}
                                                quality={100}
                                                alt="check"
                                                objectFit="cover"
                                                className='min-w-[14.211px] min-h-[13.263px] max-w-[14.211px] max-h-[13.263px] w-full'
                                            />
                                        </div>
                                        <p className='text-[16px] mdx:text-[18px] xl:text-[20px] whitespace-nowrap'>{t('card3.items.2.text')}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Для маленьких экранов — показываем изображения и текст в потоке */}
                            <div className='absolute w-full max-w-[180px] h-auto right-[-10px] bottom-[-70px]'>
                                <Image
                                    src={scoop}
                                    quality={100}
                                    alt={t('card3.imageAlt')}
                                    width={450}
                                    height={450}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div className='max-w-[265px] mt-[20px]'>
                                <div className='flex gap-[8px]'>
                                    <div className='rounded-full min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] bg-corporate flex items-center justify-center'>
                                        <Image
                                            src={check}
                                            quality={100}
                                            alt="check"
                                            objectFit="cover"
                                            className='min-w-[14.211px] min-h-[13.263px] max-w-[14.211px] max-h-[13.263px] w-full'
                                        />
                                    </div>
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>{t('card3.items.0.text')}</p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <div className='rounded-full min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] bg-corporate flex items-center justify-center mt-[4px]'>
                                        <Image
                                            src={check}
                                            quality={100}
                                            alt="check"
                                            objectFit="cover"
                                            className='min-w-[14.211px] min-h-[13.263px] max-w-[14.211px] max-h-[13.263px] w-full'
                                        />
                                    </div>
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>{t('card3.items.1.text')}</p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <div className='rounded-full min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] bg-corporate flex items-center justify-center mt-[4px]'>
                                        <Image
                                            src={check}
                                            quality={100}
                                            alt="check"
                                            objectFit="cover"
                                            className='min-w-[14.211px] min-h-[13.263px] max-w-[14.211px] max-h-[13.263px] w-full'
                                        />
                                    </div>
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>{t('card3.items.2.text')}</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>


            <div className='flex-col w-full mt-[20px]'>
                <div className='w-full h-[390px] min-w-[342px] bg-[#EDF3F5] p-[22px] relative overflow-hidden mdx:overflow-y-auto hide-scrollbar'>
                    <h4 className='text-[22px] mdx:text-[22px] xl:text-[24px] font-medium'>{t('card4.title')}</h4>

                    {/* Отображаем сразу и текст, и изображение */}
                    {isAbove460px ? (
                        <div className='relative'>
                            <div className='absolute right-[-20px] bottom-[-50px] w-[250px] h-[270px]'>
                                <Image
                                    src={nedvijimost}
                                    quality={100}
                                    alt={t('card2.imageAlt')}
                                    width={450}
                                    height={450}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div className='max-w-[253px] mt-[20px]'>
                                {/* На больших экранах отображаем все элементы в одном блоке */}
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className='flex gap-[8px] mt-[10px] '>
                                        <div className='rounded-full min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] bg-corporate flex items-center justify-center mt-[4px]'>
                                            <Image
                                                src={check}
                                                quality={100}
                                                alt="check"
                                                objectFit="cover"
                                                className='min-w-[14.211px] min-h-[13.263px] max-w-[14.211px] max-h-[13.263px] w-full'
                                            />
                                        </div>
                                        <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                            {t(`card4.items.${index}.text`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Для маленьких экранов — отображаем изображение с абсолютным позиционированием */}
                            <div className='absolute w-full max-w-[240px] right-[-16px] bottom-[-50px]'>
                                <Image
                                    src={nedvijimost}
                                    quality={100}
                                    alt={t('card4.imageAlt')}
                                    width={350}
                                    height={350}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div className='max-w-[265px] mt-[20px]'>
                                {/* На маленьких экранах показываем текст с элементами в потоке */}
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className='flex gap-[8px] mt-[10px] '>
                                        <div className='rounded-full min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] bg-corporate flex items-center justify-center mt-[4px]'>
                                            <Image
                                                src={check}
                                                quality={100}
                                                alt="check"
                                                objectFit="cover"
                                                className='min-w-[14.211px] min-h-[13.263px] max-w-[14.211px] max-h-[13.263px] w-full'
                                            />
                                        </div>
                                        <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                            {t(`card4.items.${index}.text`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>


        </div>
    );
}

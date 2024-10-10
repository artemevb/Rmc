"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import scoop from "@/public/images/about/scoop.png";
import key from "@/public/images/about/key.png";
import nedvijimost from "@/public/images/about/nedvijimost.png";
import home from "@/public/images/about/home.png";
import check from "@/public/images/about/Check.png";

export default function Services() {
    const t = useTranslations('About.Service');
    const [activeCard, setActiveCard] = useState<number | null>(null); // Typed as number or null
    const [isAbove460px, setIsAbove460px] = useState<boolean>(true); // Explicitly typed as boolean

    const handleClick = (cardIndex: number) => { // Explicitly typed parameter
        // If the card is already active, close it. Otherwise, set it as active.
        setActiveCard(cardIndex === activeCard ? null : cardIndex);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 460) {
                setIsAbove460px(true);
                setActiveCard(null); // Reset active card on larger screens
            } else {
                setIsAbove460px(false);
            }
        };

        // Set initial screen size check
        handleResize();

        // Add event listener to listen for screen resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="w-full max-w-[1440px] h-auto flex flex-col mdx:flex-row mx-auto px-[10px] overflow-auto hide-scrollbar mdx:gap-[12px]">
            <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium mdx:hidden">{t('title')}</h2>
            <p className='text-[16px] mdx:text-[20px] text-[#858585] mb-[30px] mdx:mb-[40px] mdx:hidden'>{t('subtitle')}</p>

            {/* Карточка 1 */}
            <div className='flex-col w-full mt-[20px]'>
                <div
                    className='w-full h-[390px] mdx:h-[360px] mdx:w-[387px] xl:w-[588px] bg-[#EDF3F5] p-[22px] relative overflow-hidden cursor-pointer'
                    onClick={() => handleClick(1)}
                >
                    <h4 className='text-[22px] mdx:text-[28px] xl:text-[24px] font-medium'>{t('card1.title')}</h4>

                    {isAbove460px ? (
                        activeCard === 1 ? (
                            <div className='max-w-[223px] mdx:max-w-[327px] mt-[20px] '>
                                <div className='flex gap-[8px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card1.items.0.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card1.items.0.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card1.items.1.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card1.items.1.text')}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='absolute max-w-[260px] right-[-26px] bottom-[-10px] w-full'>
                                <Image
                                    src={home}
                                    quality={100}
                                    alt={t('card1.imageAlt')}
                                    width={350}
                                    height={350}
                                    className='w-full h-full object-cover transparent'
                                />
                            </div>
                        )
                    ) : (
                        <>
                            {/* На маленьких экранах всегда показываем текст и изображение */}
                            <div className='absolute right-[-26px] bottom-[-10px]'>
                                <Image
                                    src={home}
                                    quality={100}
                                    alt={t('card1.imageAlt')}
                                    width={350}
                                    height={350}
                                    className='w-full h-full object-cover max-w-[260px]'
                                />
                            </div>
                            <div className='max-w-[223px] mt-[20px]'>
                                <div className='flex gap-[8px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card1.items.0.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card1.items.0.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card1.items.1.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card1.items.1.text')}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Карточка 2 */}
            <div className='flex-col w-full mt-[20px]'>
                <div
                    className='w-full h-[390px] mdx:h-[360px] mdx:w-[266px] bg-[#EDF3F5] p-[22px] relative overflow-hidden cursor-pointer'
                    onClick={() => handleClick(2)}
                >
                    <h4 className='text-[22px] mdx:text-[22px] xl:text-[24px] font-medium'>{t('card2.title')}</h4>

                    {isAbove460px ? (
                        activeCard === 2 ? (
                            <div className='max-w-[223px] mt-[20px] w-full'>
                                <div className='flex gap-[8px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card2.items.0.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card2.items.0.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card2.items.1.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card2.items.1.text')}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='absolute right-[-10px] bottom-[-10px] max-w-[180px] w-full'>
                                <Image
                                    src={key}
                                    quality={100}
                                    alt={t('card2.imageAlt')}
                                    width={600}
                                    height={600}
                                    className='w-full h-full object-cover transparent'
                                />
                            </div>
                        )
                    ) : (
                        <>
                            {/* На маленьких экранах всегда показываем текст и изображение */}
                            <div className='absolute w-full max-w-[180px] h-auto right-0 bottom-[-5px]'>
                                <Image
                                    src={key}
                                    quality={100}
                                    alt={t('card2.imageAlt')}
                                    width={450}
                                    height={450}
                                    className='w-full h-full object-cover right-0 '
                                />
                            </div>
                            <div className='max-w-[265px] mt-[20px]'>
                                <div className='flex gap-[8px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card2.items.0.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card2.items.0.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card2.items.1.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card2.items.1.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card2.items.2.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card2.items.2.text')}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Карточка 3 */}
            <div className='flex-col w-full mt-[20px]'>
                <div
                    className='w-full h-[390px] mdx:h-[360px] mdx:w-[266px] bg-[#EDF3F5] p-[22px] relative overflow-hidden cursor-pointer'
                    onClick={() => handleClick(3)}
                >
                    <h4 className='text-[22px] mdx:text-[22px] xl:text-[24px] font-medium'>{t('card3.title')}</h4>

                    {isAbove460px ? (
                        activeCard === 3 ? (
                            <div className='max-w-[265px] mt-[20px]'>
                                <div className='flex gap-[8px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card3.items.0.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card3.items.0.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card3.items.1.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card3.items.1.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card3.items.2.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card3.items.2.text')}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='absolute right-[-10px] bottom-[-60px] max-w-[180px] w-full'>
                                <Image
                                    src={scoop}
                                    quality={100}
                                    alt={t('card3.imageAlt')}
                                    width={350}
                                    height={350}
                                    className='w-full h-full object-cover transparent'
                                />
                            </div>
                        )
                    ) : (
                        <>
                            {/* На маленьких экранах всегда показываем текст и изображение */}
                            <div className='absolute w-full max-w-[190px] right-[-10px] bottom-[-70px]'>
                                <Image
                                    src={scoop}
                                    quality={100}
                                    alt={t('card3.imageAlt')}
                                    width={350}
                                    height={350}
                                    className='w-full h-full object-cover '
                                />
                            </div>
                            <div className='max-w-[265px] mt-[20px]'>
                                <div className='flex gap-[8px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card3.items.0.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card3.items.0.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card3.items.1.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card3.items.1.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card3.items.2.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card3.items.2.text')}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Карточка 4 */}
            <div className='flex-col w-full mt-[20px]'>
                <div
                    className='w-full h-[390px] mdx:h-[360px] mdx:w-[266px] bg-[#EDF3F5] p-[22px] relative overflow-hidden overflow-y-auto hide-scrollbar cursor-pointer'
                    onClick={() => handleClick(4)}
                >
                    <h4 className='text-[22px] mdx:text-[22px] xl:text-[24px] font-medium'>{t('card4.title')}</h4>

                    {isAbove460px ? (
                        activeCard === 4 ? (
                            <div className='max-w-[223px] mt-[20px]'>
                                <div className='flex gap-[8px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card4.items.0.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card4.items.0.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card4.items.1.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card4.items.1.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card4.items.2.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card4.items.2.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card4.items.3.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card4.items.3.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card4.items.4.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card4.items.4.text')}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='absolute right-[-5px] bottom-[0px] max-w-[200px] w-full'>
                                <Image
                                    src={nedvijimost}
                                    quality={100}
                                    alt={t('card4.imageAlt')}
                                    width={650}
                                    height={650}
                                    className='w-full h-full object-cover transparent'
                                />
                            </div>
                        )
                    ) : (
                        <>
                            {/* На маленьких экранах всегда показываем текст и изображение */}
                            <div className='absolute w-full max-w-[240px] right-[-16px] bottom-[-50px]'>
                                <Image
                                    src={nedvijimost}
                                    quality={100}
                                    alt={t('card4.imageAlt')}
                                    width={350}
                                    height={350}
                                    className='w-full h-full object-cover '
                                />
                            </div>
                            <div className='max-w-[265px] mt-[20px]'>
                                <div className='flex gap-[8px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card4.items.0.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card4.items.0.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card4.items.1.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card4.items.1.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card4.items.2.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card4.items.2.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card4.items.3.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card4.items.3.text')}
                                    </p>
                                </div>
                                <div className='flex gap-[8px] mt-[10px]'>
                                    <Image
                                        src={check}
                                        quality={100}
                                        alt={t('card4.items.4.alt')}
                                        width={50}
                                        height={50}
                                        className='w-full h-full object-cover max-w-[19px]'
                                    />
                                    <p className='text-[16px] mdx:text-[18px] xl:text-[20px]'>
                                        {t('card4.items.4.text')}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

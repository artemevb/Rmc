import { useTranslations } from 'next-intl';
import Marker from "@/public/images/investmentsDubai/Marker.svg";
import Image from 'next/image';

export default function Scheme() {
    const t = useTranslations('PropertySearch.SchemeBuy');

    return (
        <div className="w-full max-w-[1440px] 5xl:max-w-[2000px] mx-auto max-3xl:px-[10px] flex flex-col gap-10">
            <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium leading-[38px] mdx:leading-[50px] xl:leading-[60px]">
                        {t('title')}
                    </h2>
                </div>
                {/** 
             * Обновили сетку:
             * grid-cols-1 xl:grid-cols-4 
             * для мобильной версии - 1 колонка и 7 рядов
             * для xl - 4 колонки и 2 ряда (первые 4 шага на первой строке, 5-7 на второй)
             */}
                <div className="grid w-full h-auto grid-cols-1 xl:grid-cols-4 grid-rows-7 xl:grid-rows-2 xl:gap-y-[93px]">

                    {/** Блок 1 */}
                    <div className="max-xl:border-l-2 relative border-[#EAEAEA] xl:border-t-2">
                        <div className="absolute xl:-top-[6px] max-xl:-left-[14px] xl:left-[38px] px-2 5xl:px-3 text-black">
                            <Image
                                src={Marker}
                                alt={t('marker_alt')}
                                width={1000}
                                height={1000}
                                quality={100}
                                className='w-[10px] h-auto absolute block'
                            />
                        </div>
                        <div className='flex flex-col mdl:flex-row xl:flex-col mdl:gap-[15px] slg:gap-[35px] justify-start items-start max-xl:pl-8 xl:mt-[40px]'>
                            <div className='rounded-full w-[50px] h-[50px] mdx:w-[70px] mdx:h-[70px] xl:w-[102px] xl:h-[102px] bg-corporate flex items-center justify-center text-white text-[20px] mdx:text-[25px] xl:text-[35px] font-medium xl:font-semibold'>
                                01
                            </div>
                            <div className="max-xl:pb-12 xl:pt-6 xl:pr-8 flex flex-col gap-2 max-mdl:mt-[10px]">
                                <h1 className="text-[22px] mdx:text-[28px] xl:text-[30px] font-semibold lh">
                                    {t('step1_title')}
                                </h1>
                                <p className="max-xl:max-w-[600px] text-[16px] mdx:text-[20px] text-[#858585]">
                                    {t('step1_description')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/** Блок 2 */}
                    <div className="max-xl:border-l-2 relative border-[#EAEAEA] xl:border-t-2">
                        <div className="absolute xl:-top-[6px] max-xl:-left-[14px] max-xl:-top-[-30px] max-mdx:top-[20px] xl:left-[38px] px-2 5xl:px-3 text-black">
                            <Image
                                src={Marker}
                                alt={t('marker_alt')}
                                width={1000}
                                height={1000}
                                quality={100}
                                className='w-[10px] h-auto absolute block'
                            />
                        </div>
                        <div className='flex flex-col mdl:flex-row xl:flex-col mdl:gap-[15px] slg:gap-[35px] justify-start items-start max-xl:pl-8 xl:mt-[40px]'>
                            <div className='rounded-full w-[50px] h-[50px] mdx:w-[70px] mdx:h-[70px] xl:w-[102px] xl:h-[102px] bg-corporate flex items-center justify-center text-white text-[20px] mdx:text-[25px] xl:text-[35px] font-medium xl:font-semibold'>
                                02
                            </div>
                            <div className="max-xl:pb-12 xl:pt-6 xl:pr-8 flex flex-col gap-2 max-mdl:mt-[10px]">
                                <h1 className="text-[22px] mdx:text-[28px] xl:text-[30px] font-semibold lh">
                                    {t('step2_title')}
                                </h1>
                                <p className="max-xl:max-w-[600px] text-[16px] mdx:text-[20px] text-[#858585]">
                                    {t('step2_description')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/** Блок 3 */}
                    <div className="max-xl:border-l-2 relative border-[#EAEAEA] xl:border-t-2">
                        <div className="absolute xl:-top-[6px] max-xl:-left-[14px] max-xl:-top-[-30px] max-mdx:top-[20px] xl:left-[38px] px-2 5xl:px-3 text-black">
                            <Image
                                src={Marker}
                                alt={t('marker_alt')}
                                width={1000}
                                height={1000}
                                quality={100}
                                className='w-[10px] h-auto absolute block'
                            />
                        </div>
                        <div className='flex flex-col mdl:flex-row xl:flex-col mdl:gap-[15px] slg:gap-[35px] justify-start items-start max-xl:pl-8 xl:mt-[40px]'>
                            <div className='rounded-full w-[50px] h-[50px] mdx:w-[70px] mdx:h-[70px] xl:w-[102px] xl:h-[102px] bg-corporate flex items-center justify-center text-white text-[20px] mdx:text-[25px] xl:text-[35px] font-medium xl:font-semibold'>
                                03
                            </div>
                            <div className="max-xl:pb-12 xl:pt-6 xl:pr-8 flex flex-col gap-2 max-mdl:mt-[10px] xl:max-w-[293px]">
                                <h1 className="text-[22px] mdx:text-[28px] xl:text-[30px] font-semibold lh">
                                    {t('step3_title')}
                                </h1>
                                <p className="max-xl:max-w-[600px] text-[16px] mdx:text-[20px] text-[#858585]">
                                    {t('step3_description')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/** Блок 4 */}
                    <div className="max-xl:border-l-2 relative border-[#EAEAEA] xl:border-t-2">
                        <div className="absolute xl:-top-[6px] max-xl:-left-[14px] max-xl:-top-[-30px] max-mdx:top-[20px] xl:left-[38px] px-2 5xl:px-3 text-black">
                            <Image
                                src={Marker}
                                alt={t('marker_alt')}
                                width={1000}
                                height={1000}
                                quality={100}
                                className='w-[10px] h-auto absolute block'
                            />
                        </div>
                        <div className='flex flex-col mdl:flex-row mdl:gap-[15px] slg:gap-[35px] xl:flex-col justify-start items-start max-xl:pl-8 xl:mt-[40px]'>
                            <div className='rounded-full w-[50px] h-[50px] mdx:w-[70px] mdx:h-[70px] xl:w-[102px] xl:h-[102px] bg-corporate flex items-center justify-center text-white text-[20px] mdx:text-[25px] xl:text-[35px] font-medium xl:font-semibold'>
                                04
                            </div>
                            <div className="max-xl:pb-12 xl:pt-6 xl:pr-8 flex flex-col gap-2 max-mdl:mt-[10px]">
                                <h1 className="text-[22px] mdx:text-[28px] xl:text-[30px] font-semibold lh">
                                    {t('step4_title')}
                                </h1>
                                <p className="max-xl:max-w-[600px] text-[16px] mdx:text-[20px] text-[#858585]">
                                    {t('step4_description')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/** Блок 5 */}
                    {/* <div className="max-xl:border-l-2 relative border-[#EAEAEA] xl:border-t-2 xl:col-span-1">
                        <div className="absolute xl:-top-[6px] max-xl:-left-[14px] max-xl:-top-[-30px] max-mdx:top-[20px] xl:left-[38px] px-2 5xl:px-3 text-black">
                            <Image
                                src={Marker}
                                alt={t('marker_alt')}
                                width={1000}
                                height={1000}
                                quality={100}
                                className='w-[10px] h-auto absolute block'
                            />
                        </div>
                        <div className='flex flex-col mdl:flex-row mdl:gap-[15px] slg:gap-[35px] xl:flex-col justify-start items-start max-xl:pl-8 xl:mt-[40px]'>
                            <div className='rounded-full w-[50px] h-[50px] mdx:w-[70px] mdx:h-[70px] xl:w-[102px] xl:h-[102px] bg-corporate flex items-center justify-center text-white text-[20px] mdx:text-[25px] xl:text-[35px] font-medium xl:font-semibold'>
                                05
                            </div>
                            <div className="max-xl:pb-12 xl:pt-6 xl:pr-8 flex flex-col gap-2 max-mdl:mt-[10px]">
                                <h1 className="text-[22px] mdx:text-[28px] xl:text-[30px] font-semibold lh">
                                    {t('step5_title')}
                                </h1>
                                <p className="max-xl:max-w-[600px] text-[16px] mdx:text-[20px] text-[#858585]">
                                    {t('step5_description')}
                                </p>
                            </div>
                        </div>
                    </div> */}

                    {/** Блок 6 */}
                    <div className="max-xl:border-l-2 relative border-[#EAEAEA] xl:border-t-2">
                        <div className="absolute xl:-top-[6px] max-xl:-left-[14px] max-xl:-top-[-30px] max-mdx:top-[20px] xl:left-[38px] px-2 5xl:px-3 text-black">
                            <Image
                                src={Marker}
                                alt={t('marker_alt')}
                                width={1000}
                                height={1000}
                                quality={100}
                                className='w-[10px] h-auto absolute block'
                            />
                        </div>
                        <div className='flex flex-col mdl:flex-row mdl:gap-[15px] slg:gap-[35px] xl:flex-col justify-start items-start max-xl:pl-8 xl:mt-[40px]'>
                            <div className='rounded-full w-[50px] h-[50px] mdx:w-[70px] mdx:h-[70px] xl:w-[102px] xl:h-[102px] bg-corporate flex items-center justify-center text-white text-[20px] mdx:text-[25px] xl:text-[35px] font-medium xl:font-semibold'>
                                05
                            </div>
                            <div className="max-xl:pb-12 xl:pt-6 xl:pr-8 flex flex-col gap-2 max-mdl:mt-[10px]">
                                <h1 className="text-[22px] mdx:text-[28px] xl:text-[30px] font-semibold lh">
                                    {t('step6_title')}
                                </h1>
                                <p className="max-xl:max-w-[600px] text-[16px] mdx:text-[20px] text-[#858585]">
                                    {t('step6_description')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/** Блок 7 */}
                    <div className="max-xl:border-l-2 relative border-[#EAEAEA] xl:border-t-2">
                        <div className="absolute xl:-top-[6px] max-xl:-left-[14px] max-xl:-top-[-30px] max-mdx:top-[20px] xl:left-[38px] px-2 5xl:px-3 text-black">
                            <Image
                                src={Marker}
                                alt={t('marker_alt')}
                                width={1000}
                                height={1000}
                                quality={100}
                                className='w-[10px] h-auto absolute block'
                            />
                        </div>
                        <div className='flex flex-col mdl:flex-row mdl:gap-[15px] slg:gap-[35px] xl:flex-col justify-start items-start max-xl:pl-8 xl:mt-[40px]'>
                            <div className='rounded-full w-[50px] h-[50px] mdx:w-[70px] mdx:h-[70px] xl:w-[102px] xl:h-[102px] bg-corporate flex items-center justify-center text-white text-[20px] mdx:text-[25px] xl:text-[35px] font-medium xl:font-semibold'>
                                06
                            </div>
                            <div className="max-xl:pb-12 xl:pt-6 xl:pr-8 flex flex-col gap-2 max-mdl:mt-[10px]">
                                <h1 className="text-[22px] mdx:text-[28px] xl:text-[30px] font-semibold lh">
                                    {t('step7_title')}
                                </h1>
                                <p className="max-xl:max-w-[600px] text-[16px] mdx:text-[20px] text-[#858585]">
                                    {t('step7_description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




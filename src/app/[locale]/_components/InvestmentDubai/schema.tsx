import { useTranslations } from 'next-intl';
import Marker from "@/public/images/investmentsDubai/Marker.svg";
import Image from 'next/image';

export default function Scheme() {
    const t = useTranslations('investmentsDubai.Scheme');

    return (
        <div className="w-full max-w-[1440px] 5xl:max-w-[2000px] mx-auto px-2 flex flex-col gap-10">

            <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium">
                        {t('title')}
                    </h2>
                </div>
                <div className="grid w-full h-auto grid-cols-1 xl:grid-cols-4 grid-rows-4 xl:grid-rows-1 max-xl:pl-4">
                    <div className="max-xl:border-l-2 relative border-[#EAEAEA] xl:border-t-2">
                        <div className="absolute xl:-top-[6px] max-xl:-left-[14px]  xl:left-[38px] px-2 5xl:px-3 text-black">
                            <Image
                                src={Marker}
                                alt="Medical Equipment"
                                width={1000}
                                height={1000}
                                quality={100}
                                objectFit="cover"
                                className='w-[10px] h-auto absolute block'
                            />
                        </div>
                        <div className='flex flex-col mdl:flex-row xl:flex-col mdl:gap-[15px] slg:gap-[35px] justify-start items-start max-xl:pl-8 xl:mt-[40px]'>
                            <div className='rounded-full w-[50px] h-[50px] mdx:w-[70px] mdx:h-[70px] xl:w-[102px] xl:h-[102px] bg-[#E1AF93] flex items-center justify-center text-white text-[20px] mdx:text-[25px] xl:text-[35px] font-medium xl:font-semibold'>
                                01
                            </div>
                            <div className=" max-xl:pb-12 xl:pt-6 xl:pr-8 flex flex-col gap-2 max-mdl:mt-[10px]">
                                <h1 className="text-[22px] mdx:text-[28px] xl:text-[30px] lh font-semibold">
                                    {t('text-1')}
                                </h1>
                                <p className="max-xl:max-w-[600px] text-[16px] mdx:text-[20px] text-[#858585]">
                                    {t('text-1-subtitle')}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="max-xl:border-l-2 relative border-[#EAEAEA] xl:border-t-2">
                        <div className="absolute xl:-top-[6px] max-xl:-left-[14px] max-xl:-top-[-30px] xl:left-[38px] px-2 5xl:px-3 text-black">
                            <Image
                                src={Marker}
                                alt="Medical Equipment"
                                width={1000}
                                height={1000}
                                quality={100}
                                objectFit="cover"
                                className='w-[10px] h-auto absolute block'
                            />
                        </div>
                        <div className='flex flex-col mdl:flex-row xl:flex-col mdl:gap-[15px] slg:gap-[35px] justify-start items-start  max-xl:pl-8 xl:mt-[40px]'>
                            <div className='rounded-full w-[50px] h-[50px] mdx:w-[70px] mdx:h-[70px] xl:w-[102px] xl:h-[102px] bg-[#E1AF93] flex items-center justify-center text-white text-[20px] mdx:text-[25px] xl:text-[35px] font-medium xl:font-semibold'>
                                02
                            </div>
                            <div className=" max-xl:pb-12 xl:pt-6 xl:pr-8 flex flex-col gap-2 max-mdl:mt-[10px]">
                                <h1 className="text-[22px] mdx:text-[28px] xl:text-[30px] lh font-semibold">
                                    {t('text-2')}
                                </h1>
                                <p className="max-xl:max-w-[600px] text-[16px] mdx:text-[20px] text-[#858585]">
                                    {t('text-2-subtitle')}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="max-xl:border-l-2 relative border-[#EAEAEA] xl:border-t-2">
                        <div className="absolute xl:-top-[6px] max-xl:-left-[14px] max-xl:-top-[-30px] xl:left-[38px] px-2 5xl:px-3 text-black">
                            <Image
                                src={Marker}
                                alt="Medical Equipment"
                                width={1000}
                                height={1000}
                                quality={100}
                                objectFit="cover"
                                className='w-[10px] h-auto absolute block'
                            />
                        </div>
                        <div className='flex flex-col mdl:flex-row xl:flex-col mdl:gap-[15px] slg:gap-[35px] justify-start items-start max-xl:pl-8 xl:mt-[40px]'>
                            <div className='rounded-full w-[50px] h-[50px] mdx:w-[70px] mdx:h-[70px] xl:w-[102px] xl:h-[102px] bg-[#E1AF93] flex items-center justify-center text-white text-[20px] mdx:text-[25px] xl:text-[35px] font-medium xl:font-semibold'>
                                03
                            </div>
                            <div className=" max-xl:pb-12 xl:pt-6 xl:pr-8 flex flex-col gap-2 max-mdl:mt-[10px] xl:max-w-[293px]">
                                <h1 className="text-[22px] mdx:text-[28px] xl:text-[30px] font-semibold lh">
                                    {t('text-3')}
                                </h1>
                                <p className="max-xl:max-w-[600px] text-[16px] mdx:text-[20px] text-[#858585]">
                                    {t('text-3-subtitle')}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="max-xl:border-l-2 relative border-[#EAEAEA] xl:border-t-2">
                        <div className="absolute xl:-top-[6px] max-xl:-left-[14px] max-xl:-top-[-30px] xl:left-[38px] px-2 5xl:px-3 text-black">
                            <Image
                                src={Marker}
                                alt="Medical Equipment"
                                width={1000}
                                height={1000}
                                quality={100}
                                objectFit="cover"
                                className='w-[10px] h-auto absolute block'
                            />
                        </div>
                        <div className='flex flex-col mdl:flex-row mdl:gap-[15px] slg:gap-[35px] xl:flex-col justify-start items-start max-xl:pl-8 xl:mt-[40px]'>
                            <div className='rounded-full w-[50px] h-[50px] mdx:w-[70px] mdx:h-[70px] xl:w-[102px] xl:h-[102px] bg-[#E1AF93] flex items-center justify-center text-white text-[20px] mdx:text-[25px] xl:text-[35px] font-medium xl:font-semibold'>
                                04
                            </div>
                            <div className=" max-xl:pb-12 xl:pt-6 xl:pr-8 flex flex-col gap-2 max-mdl:mt-[10px]">
                                <h1 className="text-[22px] mdx:text-[28px] xl:text-[30px] lh font-semibold">
                                    {t('text-4')}
                                </h1>
                                <p className="max-xl:max-w-[600px] text-[16px] mdx:text-[20px] text-[#858585]">
                                    {t('text-4-subtitle')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

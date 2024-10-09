import Image from 'next/image';
import build1 from "@/public/images/investmentsDubai/table.png";
import build2 from "@/public/images/investmentsDubai/pc.png";
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Invest() {
    const t = useTranslations('investmentsDubai.invest');

    const formatText = (text: string) => {
        return text.split('\n').map((line, index) => (
            <p key={index} className='mb-[10px]'>{line}</p>
        ));
    };


    return (
        <div className='w-full h-auto flex flex-col mx-auto max-xl:px-[10px] max-w-[1440px]'>
            <div>
                <div className='xl:flex flex-row-reverse xl:gap-[80px] xl:items-center'>
                    <div className='xl:max-w-[772px]'>
                        <h3 className='font-medium text-[30px] mdx:text-[45px] xl:text-[55px] leading-[38px] mdx:leading-[50px] xl:leading-[70px] max-w-[710px]'>
                            {formatText(t('title'))}
                        </h3>
                        <div className='text-[16px] font-normal mdx:text-[20px] text-[#858585] mt-[25px] mdx:mt-[30px] xl:mt-[25px]'>
                            {formatText(t('subtitle'))}
                        </div>

                        <div className='xl:grid grid-cols-2 gap-y-[45px] gap-x-[12px] w-full mt-[70px] auto-rows-fr text-[20px] hidden'>
                            <div className='flex'>
                                <div className='flex items-center border-l-2 border-[#E1AF93] pt-[4px] pb-[4px] pl-[10px] flex-grow max-w-[289px]'>
                                    {formatText(t('text-1'))}
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='flex items-center border-l-2 border-[#E1AF93] pt-[4px] pb-[4px] pl-[10px] flex-grow max-w-[289px]'>
                                    {formatText(t('text-2'))}
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='flex items-center border-l-2 border-[#E1AF93] pt-[4px] pb-[4px] pl-[10px] flex-grow max-w-[289px]'>
                                    {formatText(t('text-3'))}
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='flex items-center border-l-2 border-[#E1AF93] pt-[4px] pb-[4px] pl-[10px] flex-grow max-w-[289px]'>
                                    {formatText(t('text-4'))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full mt-[25px] mdx:mt-[30px] xl:mt-0'>
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
                            className="w-full h-auto object-cover hidden xl:block"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-y-[25px] mdx:gap-y-[45px] gap-x-[12px] w-full mt-[40px] mdx:mt-[50px] xl:mt-[70px] auto-rows-fr text-[16px] mdx:text-[20px] xl:hidden'>
                    <div className='flex'>
                        <div className='flex items-center border-l-2 border-[#E1AF93] pt-[4px] pb-[4px] pl-[10px] flex-grow'>
                            {formatText(t('text-1'))}
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex items-center border-l-2 border-[#E1AF93] pt-[4px] pb-[4px] pl-[10px] flex-grow'>
                            {formatText(t('text-2'))}
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex items-center border-l-2 border-[#E1AF93] pt-[4px] pb-[4px] pl-[10px] flex-grow'>
                            {formatText(t('text-3'))}
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex items-center border-l-2 border-[#E1AF93] pt-[4px] pb-[4px] pl-[10px] flex-grow'>
                            {formatText(t('text-4'))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

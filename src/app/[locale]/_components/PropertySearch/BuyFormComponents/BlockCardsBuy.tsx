import { useTranslations } from 'next-intl';
import Image from 'next/image';
import rent1 from "@/public/images/main/about_company/home.png";
import Illustration from "@/public/images/main/about_company/Illustration.png";
import divan from "@/public/images/main/about_company/divan.png";
import rent3 from "@/public/images/main/about_company/uprv.png";

export default function BlockCardsBuy() {
    const t = useTranslations('PropertySearch.BlockCardsBuy');

    return (
        <div className="w-full max-w-[1440px] 5xl:max-w-[2000px] mx-auto px-[10px] flex flex-col ">
            <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium hr leading-[38px] mdx:leading-[50px] xl:leading-[70px]">
                {t('title')}
            </h2>
            <p className="text-[16px] mdx:text-[20px] text-[#858585] max-w-[817px] mt-[12px] mdx:mt-[16px]">
                {t('description')}
            </p>
            <div className="w-full flex flex-col 3xl:flex-row gap-[16px] mt-[40px] xl:mt-[50px] 3xl:grid 3xl:grid-cols-3">
                <div className="w-full flex flex-col gap-[16px] mdl:flex-row">
                    <div className='w-full pt-[24px] pl-[24px] bg-[#EDF3F5] h-[350px] 3xl:h-[540px] relative overflow-hidden'>
                        <h3 className='text-[18px] mdx:text-[24px] top-0 max-w-[294px]'>{t('card1_title')}</h3>
                        <div className='absolute mdx:bottom-[35px] 3xl:bottom-[-30px] right-[-20px] mdx:h-[45%] bottom-[-20px] h-auto max-mdx:w-[84%]'>
                            <Image
                                src={rent1}
                                quality={100}
                                width={1500}
                                height={1500}
                                alt={t('card1_image_alt')}
                                className="w-full h-full object-cover min-h-[225px] "
                            />
                        </div>
                    </div>
                    {/** При 3xl: скрывается,т.к иначе отображается в начале*/}
                    <div className='w-full pt-[24px] px-[20px] bg-[#EDF3F5] h-[350px] 3xl:hidden relative overflow-hidden'>
                        <h3 className='text-[18px] mdx:text-[24px] top-0 max-w-[336px]'>{t('card2_title')}</h3>
                        <div className='absolute bottom-[0px] right-0 w-[66%]'>
                            <Image
                                src={rent3}
                                quality={100}
                                width={1500}
                                height={1500}
                                alt={t('card2_image_alt')}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col 3xl:grid 3xl:grid-cols-1 gap-[16px]">
                    <div className='w-full pt-[24px] pl-[24px] bg-[#EDF3F5] h-[350px] 3xl:h-[260px] relative overflow-hidden'>
                        <h3 className='text-[18px] mdx:text-[24px] top-0 max-w-[294px]'>{t('card3_title')}</h3>
                        <div className='absolute bottom-[-20px] right-0 h-[60%]'>
                            <Image
                                src={Illustration}
                                quality={100}
                                width={1500}
                                height={1500}
                                alt={t('card3_image_alt')}
                                className="w-full h-full object-cover "
                            />
                        </div>
                    </div>
                    <div className='w-full pt-[24px] px-[20px] bg-[#EDF3F5] h-[350px] 3xl:h-[260px] relative overflow-hidden'>
                        <h3 className='text-[18px] mdx:text-[24px] top-0 max-w-[336px]'>{t('card4_title')}</h3>
                        <div className='absolute bottom-[0px] mdx:right-[-40px] 3xl:right-[-10px] mdx:h-[70%] h-full mdx-mdx:w-[221px] right-0'>
                            <Image
                                src={divan}
                                quality={100}
                                width={1500}
                                height={1500}
                                alt={t('card4_image_alt')}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                {/** При 3xl: появляется и отображается в конце*/}
                <div className='hidden w-full pt-[24px] px-[20px] bg-[#EDF3F5] 3xl:block 3xl:h-[540px] relative overflow-hidden'>
                    <h3 className='text-[18px] mdx:text-[24px] top-0 max-w-[336px] '>{t('card5_title')}</h3>
                    <div className='absolute bottom-[0px] right-0 w-[66%]'>
                        <Image
                            src={rent3}
                            quality={100}
                            width={1500}
                            height={1500}
                            alt={t('card5_image_alt')}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

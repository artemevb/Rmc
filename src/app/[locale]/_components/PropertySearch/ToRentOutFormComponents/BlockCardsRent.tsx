import { useTranslations } from 'next-intl';
import Image from 'next/image';
import rent1 from "@/public/images/main/about_company/rent1.png";
import Illustration from "@/public/images/main/about_company/Illustration.png";
import divan from "@/public/images/main/about_company/divan.png";
import rent3 from "@/public/images/main/about_company/rent3.png";

export default function BlockCardsRent() {
    const t = useTranslations('PropertySearch.BlockCardsRent');

    return (
        <div className="w-full max-w-[1440px] 5xl:max-w-[2000px] mx-auto px-[10px] flex flex-col ">
            <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium hr leading-[38px] mdx:leading-[50px] xl:leading-[70px]">
                {t('header')}
            </h2>
            <p className="text-[16px] mdx:text-[20px] text-[#858585] max-w-[817px] mt-[12px] mdx:mt-[16px]">
                {t('subheader')}
            </p>
            <div className="w-full flex flex-col 3xl:flex-row gap-[16px] mt-[40px] xl:mt-[50px] 3xl:grid 3xl:grid-cols-3">
                <div className="w-full flex flex-col gap-[16px] mdl:flex-row">
                    <div className='w-full pt-[24px] pl-[24px] bg-[#EDF3F5] h-[350px] 3xl:h-[540px] relative overflow-hidden'>
                        <h3 className='text-[18px] mdx:text-[24px] top-0 max-w-[294px]'>
                            {t('card1.title')}
                        </h3>
                        <div className='absolute bottom-[-20px] right-0 h-[70%]'>
                            <Image
                                src={rent1}
                                quality={100}
                                width={1500}
                                height={1500}
                                alt={t('card1.alt')}
                                className="w-full h-full object-cover min-h-[225px] "
                            />
                        </div>
                    </div>
                    {/** Hidden on 3xl screens */}
                    <div className='w-full pt-[24px] px-[20px] bg-[#EDF3F5] h-[350px] 3xl:hidden relative overflow-hidden'>
                        <h3 className='text-[18px] mdx:text-[24px] top-0 max-w-[336px]'>
                            {t('card2.title')}
                        </h3>
                        <div className='absolute bottom-[10px] center w-[86%]'>
                            <Image
                                src={rent3}
                                quality={100}
                                width={1500}
                                height={1500}
                                alt={t('card2.alt')}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col 3xl:grid 3xl:grid-cols-1 gap-[16px]">
                    <div className='w-full pt-[24px] pl-[24px] bg-[#EDF3F5] h-[350px] 3xl:h-[260px] relative overflow-hidden'>
                        <h3 className='text-[18px] mdx:text-[24px] top-0 max-w-[294px]'>
                            {t('card3.title')}
                        </h3>
                        <div className='absolute bottom-[-20px] right-0 h-[60%]'>
                            <Image
                                src={Illustration}
                                quality={100}
                                width={1500}
                                height={1500}
                                alt={t('card3.alt')}
                                className="w-full h-full object-cover "
                            />
                        </div>
                    </div>
                    <div className='w-full pt-[24px] px-[20px] bg-[#EDF3F5] h-[350px] 3xl:h-[260px] relative overflow-hidden'>
                        <h3 className='text-[18px] mdx:text-[24px] top-0 max-w-[336px]'>
                            {t('card4.title')}
                        </h3>
                        <div className='absolute bottom-[0px] mdx:right-[-40px] 3xl:right-[-10px] mdx:h-[70%] h-auto max-mdx:w-[221px] right-0'>
                            <Image
                                src={divan}
                                quality={100}
                                width={1500}
                                height={1500}
                                alt={t('card4.alt')}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                {/** Visible only on 3xl screens */}
                <div className='w-full pt-[24px] px-[20px] bg-[#EDF3F5] hidden 3xl:h-[540px] 3xl:block relative overflow-hidden'>
                    <h3 className='text-[18px] mdx:text-[24px] top-0 max-w-[336px] '>
                        {t('card5.title')}
                    </h3>
                    <div className='absolute bottom-[10px] center w-[86%]'>
                        <Image
                            src={rent3}
                            quality={100}
                            width={1500}
                            height={1500}
                            alt={t('card5.alt')}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

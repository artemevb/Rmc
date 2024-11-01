import { useTranslations } from 'next-intl';
import Image from 'next/image';

import photo1 from "@/public/images/about/AboutCompany.png";


export default function Banner() {
    const t = useTranslations('About');

    return (
        <div className="w-full max-w-[1440px] h-auto flex flex-col mx-auto px-[10px] ">
            <div className='xl:flex xl:justify-between w-full xl:gap-[133px]'>
                <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium leading-[38px] mdx:leading-[50px] xl:leading-[60px] xl:min-w-[354px]">
                    {t('title-about')}<br /> <p className='text-corporate'>RMC DE LUXE</p>
                </h2>
                <div className='hidden mdl:flex text-[20px] mdl:flex-row mdl:mt-[30px] xl:mt-0 mdl:gap-[20px] xl:gap-[80px] w-full xl:justify-between'>
                    <h5 className='xl:max-w-[466px]'>{t('text-about-1')}</h5>
                    <h5 className='xl:max-w-[334px]'>{t('text-about-2')}</h5>
                </div>
            </div>
            <div className='w-full h-full mt-[20px] mdl:mt-[40px] xl:mt-[80px]'>
                <Image
                    src={photo1}
                    quality={100}
                    alt="Banner Image"
                    width={3000}
                    height={3000}
                    className='w-full h-full object-cover min-h-[250px] mdx:min-h-[400px] xl:min-h-[500px]'
                />
            </div>
            <div className='text-[16px] mdx:text-[20px] mdl:hidden mt-[30px]'>
                <h5>{t('text-about-1')}</h5>
                <h5 className='mt-[24px] '>{t('text-about-2')}</h5>
            </div>
        </div>
    );
}

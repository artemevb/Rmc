import Image from 'next/image';
import check from "@/public/svg/check.svg";
import { useTranslations } from 'next-intl';

export default function Banner() {
    const t = useTranslations('Main.Service');

    const processText = (text: string) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className='w-full h-auto flex flex-col mx-auto max-w-[1440px]'>
            <div className='mx-[10px]'>
                <h2 className="text-[30px] mdx:text-[40px] mdl:text-[45px] xl:text-[50px] 2xl:text-[55px] font-medium lh pb-[40px] border-b">
                    {processText(t('title'))}
                </h2>
                <div className='xl:grid xl:grid-cols-2 max-xl:gap-x-[40px]'>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b xl:border-r py-[20px] text-[18px] mdx:text-[20px] mdl:text-[22px] slg:text-[24px] xl:pr-[20px]'>
                        <Image
                            src={check}
                            quality={100}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        {t('points.tenantCheck')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:pl-[20px]'>
                        <Image
                            src={check}
                            quality={100}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        {t('points.maintenance')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b xl:border-r py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px]'>
                        <Image
                            src={check}
                            quality={100}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        {t('points.leaseContracts')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:pl-[20px]'>
                        <Image
                            src={check}
                            quality={100}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        {t('points.repairs')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b xl:border-r py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px]'>
                        <Image
                            src={check}
                            quality={100}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        {t('points.rentCollection')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:pl-[20px]'>
                        <Image
                            src={check}
                            quality={100}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        {t('points.propertyControl')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b xl:border-r py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px]'>
                        <Image
                            src={check}
                            quality={100}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        {t('points.tenantRequests')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:pl-[20px]'>
                        <Image
                            src={check}
                            quality={100}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        {t('points.tenantSelection')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:border-r'>
                        <Image
                            src={check}
                            quality={100}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        {t('points.leaseCompliance')}
                    </div>
                </div>
            </div>
        </div>
    );
}

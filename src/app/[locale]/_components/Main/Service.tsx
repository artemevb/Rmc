import Image from 'next/image';
import check from "@/public/svg/check_white.svg";
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
                <h2 className="text-[30px] mdx:text-[40px] mdl:text-[45px] xl:text-[50px] 2xl:text-[55px] font-medium lh pb-[40px] border-b leading-[23px] mdl:leading-[34px] xl:leading-[53px]">
                    {processText(t('title'))}
                </h2>
                <div className='xl:grid xl:grid-cols-2 max-xl:gap-x-[40px]'>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b xl:border-r py-[20px] text-[18px] mdx:text-[20px] mdl:text-[22px] slg:text-[24px] xl:pr-[20px]'>
                        <div className='rounded-full min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px] bg-corporate flex items-center justify-center flex-shrink-0'>
                            <Image
                                src={check}
                                quality={100}
                                alt="check"
                                objectFit="cover"
                                width={16}
                                height={16}
                                className='w-[16px] h-[16px]'
                            />
                        </div>
                        {t('points.tenantCheck')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:pl-[20px]'>
                        <div className='rounded-full min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px]  bg-corporate flex items-center justify-center flex-shrink-0'>
                            <Image
                                src={check}
                                quality={100}
                                alt="check"
                                objectFit="cover"
                                className='min-w-[13px] min-h-[14px] mdx:w-[16px] mdx:h-[16px]'
                            />
                        </div>
                        {t('points.maintenance')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b xl:border-r py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px]'>
                        <div className='rounded-full min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px] bg-corporate flex items-center justify-center'>
                            <Image
                                src={check}
                                quality={100}
                                alt="check"
                                objectFit="cover"
                                className='min-w-[13px] min-h-[14px] mdx:w-[16px] mdx:h-[16px]'
                            />
                        </div>
                        {t('points.leaseContracts')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:pl-[20px]'>
                        <div className='rounded-full min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px] bg-corporate flex items-center justify-center'>
                            <Image
                                src={check}
                                quality={100}
                                alt="check"
                                objectFit="cover"
                                className='min-w-[13px] min-h-[14px] mdx:w-[16px] mdx:h-[16px]'
                            />
                        </div>
                        {t('points.repairs')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b xl:border-r py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px]'>
                        <div className='rounded-full min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px] bg-corporate flex items-center justify-center'>
                            <Image
                                src={check}
                                quality={100}
                                alt="check"
                                objectFit="cover"
                                className='min-w-[13px] min-h-[14px] mdx:w-[16px] mdx:h-[16px]'
                            />
                        </div>
                        {t('points.rentCollection')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:pl-[20px]'>
                        <div className='rounded-full min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px] bg-corporate flex items-center justify-center'>
                            <Image
                                src={check}
                                quality={100}
                                alt="check"
                                objectFit="cover"
                                className='min-w-[13px] min-h-[14px] mdx:w-[16px] mdx:h-[16px]'
                            />
                        </div>
                        {t('points.propertyControl')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b xl:border-r py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px]'>
                        <div className='rounded-full min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px] bg-corporate flex items-center justify-center'>
                            <Image
                                src={check}
                                quality={100}
                                alt="check"
                                objectFit="cover"
                                className='min-w-[13px] min-h-[14px] mdx:w-[16px] mdx:h-[16px]'
                            />
                        </div>
                        {t('points.tenantRequests')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:pl-[20px]'>
                        <div className='rounded-full min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px] bg-corporate flex items-center justify-center'>
                            <Image
                                src={check}
                                quality={100}
                                alt="check"
                                objectFit="cover"
                                className='min-w-[13px] min-h-[14px] mdx:w-[16px] mdx:h-[16px]'
                            />
                        </div>
                        {t('points.tenantSelection')}
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:border-r'>
                        <div className='rounded-full min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px] bg-corporate flex items-center justify-center'>
                            <Image
                                src={check}
                                quality={100}
                                alt="check"
                                objectFit="cover"
                                className='min-w-[13px] min-h-[14px] mdx:w-[16px] mdx:h-[16px]'
                            />
                        </div>
                        {t('points.leaseCompliance')}
                    </div>
                </div>
            </div>
        </div>
    );
}

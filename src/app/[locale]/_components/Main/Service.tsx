import Image from 'next/image';
// import check from "@/public/svg/check_white.svg";
import svg1 from "@/public/svg/main/service/1.svg";
import svg2 from "@/public/svg/main/service/2.svg";
import svg3 from "@/public/svg/main/service/3.svg";
// import svg4 from "@/public/svg/main/service/4.svg";
// import svg5 from "@/public/svg/main/service/5.svg";
import svg6 from "@/public/svg/main/service/6.svg";
import people from "@/public/svg/main/service/pepople.svg";
import gka from "@/public/svg/main/service/gayka.svg";
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
                <h1 className="text-[30px] mdx:text-[40px] mdl:text-[45px] xl:text-[50px] 2xl:text-[55px] font-medium lh pb-[40px]  leading-[23px] mdl:leading-[34px] xl:leading-[53px]">
                    {processText(t('title'))}
                </h1>
                <div className='grid mdl:grid-cols-2 xl:grid-cols-3 max-xl:gap-5 xl:gap-y-[100px] '>
                    <div className='w-full flex flex-col gap-[16px] xl:max-w-[412px] xl:flex-row'>
                        <div className='w-full max-w-[40px] h-[40px]'>
                            <Image
                                src={svg1}
                                quality={100}
                                alt="icons searh "
                                objectFit="cover"
                                width={40}
                                height={40}
                                className='w-[40px] h-[40px]'
                            />
                        </div>
                        <div>
                            <h4 className='text-[20px] mdx:text-[25px] font-medium text-[#333] opacity-80'>
                                {t('points.tenantCheck')}
                            </h4>
                            <p className='text-[18px] mdx:text-[24px] text-[#333] opacity-60'>
                                {t('points.tenantCheck-desc')}
                            </p>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-[16px] xl:max-w-[412px] xl:flex-row'>
                        <div className='w-full max-w-[40px] h-[40px]'>
                            <Image
                                src={svg2}
                                quality={100}
                                alt="icons searh "
                                objectFit="cover"
                                width={40}
                                height={40}
                                className='w-[40px] h-[40px]'
                            />
                        </div>
                        <div>
                            <h4 className='text-[20px] mdx:text-[25px] font-medium text-[#333] opacity-80'>
                                {t('points.rentCollection')}
                            </h4>
                            <p className='text-[18px] mdx:text-[24px] text-[#333] opacity-60'>
                                {t('points.rentCollection-desc')}
                            </p>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-[16px] xl:max-w-[412px] xl:flex-row'>
                        <div className='w-full max-w-[40px] h-[40px]'>
                            <Image
                                src={svg6}
                                quality={100}
                                alt="icons searh "
                                objectFit="cover"
                                width={40}
                                height={40}
                                className='w-[40px] h-[40px]'
                            />
                        </div>
                        <div>
                            <h4 className='text-[20px] mdx:text-[25px] font-medium text-[#333] opacity-80'>
                                {t('points.propertyControl')}
                            </h4>
                            <p className='text-[18px] mdx:text-[24px] text-[#333] opacity-60'>
                                {t('points.propertyControl-desc')}
                            </p>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-[16px] xl:max-w-[412px] xl:flex-row'>
                        <div className='w-full max-w-[40px] h-[40px]'>
                            <Image
                                src={svg3}
                                quality={100}
                                alt="icons searh "
                                objectFit="cover"
                                width={40}
                                height={40}
                                className='w-[40px] h-[40px]'
                            />
                        </div>
                        <div>
                            <h4 className='text-[20px] mdx:text-[25px] font-medium text-[#333] opacity-80'>
                                {t('points.tenantRequests')}
                            </h4>
                            <p className='text-[18px] mdx:text-[24px] text-[#333] opacity-60'>
                                {t('points.tenantRequests-desc')}
                            </p>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-[16px] xl:max-w-[412px] xl:flex-row'>
                        <div className='w-full max-w-[40px] h-[40px]'>
                            <Image
                                src={people}
                                quality={100}
                                alt="icons searh "
                                objectFit="cover"
                                width={40}
                                height={40}
                                className='w-[40px] h-[40px]'
                            />
                        </div>
                        <div>
                            <h4 className='text-[20px] mdx:text-[25px] font-medium text-[#333] opacity-80'>
                                {t('points.tenantSelection')}
                            </h4>
                            <p className='text-[18px] mdx:text-[24px] text-[#333] opacity-60'>
                                {t('points.tenantSelection-desc')}
                            </p>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-[16px] xl:max-w-[412px] xl:flex-row'>
                        <div className='w-full max-w-[40px] h-[40px]'>
                            <Image
                                src={gka}
                                quality={100}
                                alt="icons searh "
                                objectFit="cover"
                                width={40}
                                height={40}
                                className='w-[40px] h-[40px]'
                            />
                        </div>
                        <div>
                            <h4 className='text-[20px] mdx:text-[25px] font-medium text-[#333] opacity-80'>
                                {t('points.leaseCompliance')}
                            </h4>
                            <p className='text-[18px] mdx:text-[24px] text-[#333] opacity-60'>
                                {t('points.leaseCompliance-desc')}
                            </p>
                        </div>
                    </div>

                    {/* <div className='w-full flex flex-col gap-[16px] xl:max-w-[372px]'>
                        <div>
                            <Image
                                src={svg6}
                                quality={100}
                                alt="icons searh "
                                objectFit="cover"
                                width={16}
                                height={16}
                                className='w-[40px] h-[40px]'
                            />
                        </div>
                        <h4 className='text-[20px] mdx:text-[25px] font-medium text-[#333] opacity-80'>
                            {t('points.tenantCheck')}
                        </h4>
                        <p className='text-[18px] mdx:text-[24px] text-[#333] opacity-60'>
                            {t('points.tenantCheck')}
                        </p>
                    </div> */}

                    {/* <div className='w-full flex flex-col gap-[16px] xl:max-w-[372px]'>
                        <div>
                            <Image
                                src={svg6}
                                quality={100}
                                alt="icons searh "
                                objectFit="cover"
                                width={16}
                                height={16}
                                className='w-[40px] h-[40px]'
                            />
                        </div>
                        <h4 className='text-[20px] mdx:text-[25px] font-medium text-[#333] opacity-80'>
                            {t('points.tenantCheck')}
                        </h4>
                        <p className='text-[18px] mdx:text-[24px] text-[#333] opacity-60'>
                            {t('points.tenantCheck')}
                        </p>
                    </div>

                    <div className='w-full flex flex-col gap-[16px] xl:max-w-[372px]'>
                        <div>
                            <Image
                                src={svg6}
                                quality={100}
                                alt="icons searh "
                                objectFit="cover"
                                width={16}
                                height={16}
                                className='w-[40px] h-[40px]'
                            />
                        </div>
                        <h4 className='text-[20px] mdx:text-[25px] font-medium text-[#333] opacity-80'>
                            {t('points.tenantCheck')}
                        </h4>
                        <p className='text-[18px] mdx:text-[24px] text-[#333] opacity-60'>
                            {t('points.tenantCheck')}
                        </p>
                    </div> */}
                </div>

                {/* <div className='xl:grid mdl:grid-cols-2 xl:grid-cols-3 gap-x-[40px]'>
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
                </div> */}
            </div>
        </div>
    );
}

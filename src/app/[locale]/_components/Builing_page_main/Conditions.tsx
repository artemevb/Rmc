import { useTranslations } from 'next-intl';


export default function Conditions() {
    const t = useTranslations('Building_page_main.Conditions');


    return (
        <div className="w-full h-full flex flex-col mx-auto max-w-[1440px] max-2xl:px-[16px]">
            <div className='max-xl:border-b'>
                <h2 className='text-[30px] mdx:text-[45px] xl:text-[55px] font-medium pb-[12px] mdx:pb-[15px]'>{t('title')}</h2>
                <p className='text-[16px] mdx:text-[20px] text-[#858585] pb-[40px] xl:max-w-[710px]'>{t('description')}</p>
            </div>
            <div className='xl:flex flex-col'>
                <div className='border-b py-[24px] xl:flex xl:justify-between'>
                    <h4 className='text-[20px] mdx:text-[25px] font-medium'>{t('text-1')}</h4>
                    <div className='mt-[15px] mdx:mt-[20px] xl:w-full xl:max-w-[588px]'>
                        <p className='text-[16px] mdx:text-[20px]'>{t('text-1-subtitle')}</p>
                        <p className='text-[16px] mdx:text-[20px] pt-[4px] mdx:pt-[12px]'>{t('text-1-5-subtitle')}</p>
                    </div>
                </div>
                <div className='border-b py-[24px] xl:flex xl:justify-between'>
                    <h4 className='text-[20px] mdx:text-[25px] font-medium'>{t('text-2')}</h4>
                    <div className='mt-[15px] mdx:mt-[20px] xl:w-full xl:max-w-[588px]'>
                        <p className='text-[16px] mdx:text-[20px]'>{t('text-2-subtitle')}</p>
                        <p className='text-[16px] mdx:text-[20px] pt-[4px] mdx:pt-[12px]'>{t('text-2-5-subtitle')}</p>
                    </div>
                </div>
                <div className='border-b py-[24px] xl:flex xl:justify-between'>
                    <h4 className='text-[20px] mdx:text-[25px] font-medium'>{t('text-3')}</h4>
                    <div className='mt-[15px] mdx:mt-[20px] xl:w-full xl:max-w-[588px]'>
                        <p className='text-[16px] mdx:text-[20px]'>{t('text-3-subtitle')}</p>
                        <p className='text-[16px] mdx:text-[20px] pt-[4px] mdx:pt-[12px]'>{t('text-3-5-subtitle')}</p>
                    </div>
                </div>
                <div className='border-b py-[24px] xl:flex xl:justify-between'>
                    <h4 className='text-[20px] mdx:text-[25px] font-medium'>{t('text-4')}</h4>
                    <div className='mt-[15px] mdx:mt-[20px] xl:w-full xl:max-w-[588px]'>
                        <p className='text-[16px] mdx:text-[20px]'>{t('text-4-subtitle')}</p>
                        <p className='text-[16px] mdx:text-[20px] pt-[4px] mdx:pt-[12px]'>{t('text-4-5-subtitle')}</p>
                    </div>
                </div>
                <div className='border-b py-[24px] xl:flex xl:justify-between'>
                    <h4 className='text-[20px] mdx:text-[25px] font-medium'>{t('text-5')}</h4>
                    <div className='mt-[15px] mdx:mt-[20px] xl:w-full xl:max-w-[588px]'>
                        <p className='text-[16px] mdx:text-[20px]'>{t('text-5-subtitle')}</p>
                        <p className='text-[16px] mdx:text-[20px] pt-[4px] mdx:pt-[12px]'>{t('text-5-5-subtitle')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

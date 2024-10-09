import { useTranslations } from 'next-intl';

export default function Scheme() {
    const t = useTranslations('Contacts');

    return (
        <div className="w-full max-w-[1440px] 5xl:max-w-[2000px] mx-auto px-2 flex flex-col gap-10">
            <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium hr max-w-[612px]">
                <p className='text-[#E1AF93]'>{t('title-1')}</p>{t('title-2')}
            </h2>
            <div className='w-full flex flex-col gap-[16px]'>

                <div className='border p-[24px] flex flex-col items-start justify-between w-full'>
                    <div className=' pb-[20px]'>
                        <p className='text-[#B3B3B3] text-[14px] mdx:text-[18px] xl:text-[20px]'>Телефон</p>
                        <p className='text-[22px] mdx:text-[28px] xl:text-[30px]'>+998 (90) 123 45 67</p>
                    </div>
                    <hr className='w-full' />
                    <div className=' pt-[20px]'>
                        <p className='text-[#B3B3B3] text-[14px] mdx:text-[18px] xl:text-[20px]'>E-mail</p>
                        <p className='text-[22px] mdx:text-[28px] xl:text-[30px]'>name@domain.uz</p>
                    </div>
                </div>

                <div className='border p-[24px] flex flex-col items-start justify-between w-full'>
                    <div >
                        <p className='text-[#B3B3B3] text-[14px] mdx:text-[18px] xl:text-[20px]'>График работы</p>
                        <p className='text-[22px] mdx:text-[28px] xl:text-[30px] mt-[4px]'>09:00 - 18:00
                            пн-пт</p>
                    </div>
                </div>

                <div className='border p-[24px] flex flex-col items-start justify-between w-full'>
                    <div >
                        <p className='text-[#B3B3B3] text-[14px] mdx:text-[18px] xl:text-[20px]'>Адрес</p>
                        <p className='text-[22px] mdx:text-[28px] xl:text-[30px] lh mt-[4px]'>Узбекистан, г.Ташкент, ул.Такая-то, дом такой-то, Ориентир такой-то</p>
                    </div>
                </div>
                <div className="h-[300px] mdx:h-[350px] xl:h-[550px] w-full ">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1804.0640191323969!2d55.30726323929795!3d25.266277951561523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43e4158d75a1%3A0x352852e5ebff102d!2sCasiani%20Furs!5e0!3m2!1sru!2s!4v1723103423605!5m2!1sru!2s"
                        width="100%"
                        height="400"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="relative top-0 left-0 w-full h-full border-none"
                        frameBorder="0">
                    </iframe>
                </div>
            </div>
        </div >
    )
}

// import { useTranslations } from 'next-intl';
import Image from 'next/image';
import document from "@/public/svg/tools/document.svg";
import time from "@/public/svg/tools/time.svg";

export default function Scheme() {
    // const t = useTranslations('Contacts');

    return (
        <div className="w-full max-w-[1440px] 5xl:max-w-[2000px] mx-auto px-2 flex flex-col gap-10">
            <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium hr max-w-[612px] leading-[38px] mdx:leading-[50px] xl:leading-[70px]">
                Необходимые документы и сроки
            </h2>
            <div className='w-full flex flex-col xl:flex-row gap-[12px] mdx:gap-[20px] text-[16px] mdx:text-[20px]'>
                <div className='px-[20px] mdx:px-[40px] mdx:py-[40px] py-[25px] border w-full'>
                    <Image
                        src={document}
                        quality={100}
                        alt="document icon"
                        width={50}
                        height={50}
                        className='w-[35px] h-[35px] mdx:w-[40px] mdx:h-[44px] xl:w-[50px] xl:h-[50px] mb-[20px] mdx:mb-[30px]'
                    />
                    <div className='flex flex-col gap-[2px]'>
                        <p>Кадастровый план</p>
                        <p>Свидетельство о праве собственности</p>
                        <p>Технический паспорт объекта</p>
                        <p>Документы, подтверждающие право на землю</p>
                        <p>Документы, подтверждающие состояние и историю объекта</p>
                        <p>Документы, подтверждающие использование и эксплуатацию</p>
                        <p>Правоустанавливающие документы на имущество</p>
                    </div>
                </div>
                <div className='px-[20px] mdx:px-[40px] mdx:py-[40px] py-[25px] border w-full'>
                    <Image
                        src={time}
                        quality={100}
                        alt="time icon"
                        width={50}
                        height={50}
                        className='w-[35px] h-[35px] mdx:w-[40px] mdx:h-[44px] xl:w-[50px] xl:h-[50px] mb-[20px] mdx:mb-[30px]'
                    />
                    <p>Стандартная квартира или дом — 1-3 дня</p>
                    <p>Коммерческая недвижимость – 3-7 дней</p>
                    <p>Сложные объекты— 7-15 дней</p>
                </div>

            </div>
        </div >
    )
}

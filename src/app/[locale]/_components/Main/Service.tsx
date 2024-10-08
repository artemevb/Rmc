import Image from 'next/image';
import check from "@/public/svg/check.svg";

export default function Banner() {
    return (
        <div className='w-full h-auto flex flex-col mx-auto max-w-[1440px]'>
            <div className='mx-[10px]'>
                <h2 className="text-[30px] mdx:text-[40px] mdl:text-[45px] xl:text-[50px] 2xl:text-[55px] font-medium lh pb-[40px] border-b">Что входит в услугу<br/> управления недвижимостью</h2>
                <div className='xl:grid xl:grid-cols-2 max-xl:gap-x-[40px]'>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b xl:border-r py-[20px] text-[18px] mdx:text-[20px] mdl:text-[22px] slg:text-[24px] xl:pr-[20px]'>
                        <Image
                            src={check}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        Проверка арендаторов (кредитная история, рекомендации)
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:pl-[20px]'>
                        <Image
                            src={check}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        Регулярное техническое обслуживание
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b xl:border-r py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px]'>
                        <Image
                            src={check}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        Подготовка и подписание договоров аренды
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:pl-[20px]'>
                        <Image
                            src={check}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        Организация и проведение ремонтных работ
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b xl:border-r py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px]'>
                        <Image
                            src={check}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        Сбор арендной платы
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:pl-[20px]'>
                        <Image
                            src={check}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        Контроль за состоянием недвижимости
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b xl:border-r py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px]'>
                        <Image
                            src={check}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        Обработка запросов и жалоб арендаторов
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] border-b py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:pl-[20px]'>
                        <Image
                            src={check}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        Подбор надежных арендаторов
                    </div>
                    <div className='flex flex-row mdl:items-center gap-[12px] mdx:gap-[16px] py-[20px] xl:py-[40px] text-[18px] mdx:text-[24px] xl:border-r'>
                        <Image
                            src={check}
                            alt="check"
                            objectFit="cover"
                            className='w-[25px] h-[25px] mdx:w-[30px] mdx:h-[30px]'
                        />
                        Контроль соблюдения условий аренды
                    </div>
                </div>
            </div>
        </div>
    );
}

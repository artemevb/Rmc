import Image from 'next/image';
import build1 from "@/public/images/main/whyus/build1.png";
import build2 from "@/public/images/main/whyus/build2.png";
import build3 from "@/public/images/main/whyus/build3.png";
import build4 from "@/public/images/main/whyus/build4.png";
import build5 from "@/public/images/main/whyus/build5.png";

export default function Banner() {
    return (
        <div className='w-full h-auto flex flex-col mx-auto max-w-[1440px]'>
            <div className='mx-[10px]'>
                <h2 className="text-[30px] mdx:text-[40px] mdl:text-[45px] xl:text-[50px] 2xl:text-[55px] font-medium lh pb-[40px] ">Почему выбирают нас</h2>
                <div className='gap-[12px] flex flex-col mdl:grid mdl:grid-cols-2 2xl:grid-cols-3'>
                    <div className='border flex flex-col items-start justify-center px-[16px] min-h-[190px] mdx:min-h-[326px] order-1'>
                        <h3 className='font-medium text-[22px] mdx:text-[25px] mdl:text-[28px] slg:text-[30px] mb-[8px]'>Опыт и профессионализм</h3>
                        <p className='text-[16px] mdx:text-[20px] text-[#333]'>Наши специалисты имеют многолетний опыт в различных сферах недвижимости, что гарантирует высокое качество услуг</p>
                    </div>
                    <div className='order-2 2xl:order-1'>
                        <Image
                            src={build1}
                            width={500}
                            height={500}
                            alt="building"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className='order-4 mdx:order-3 2xl:order-3'>
                        <Image
                            src={build2}
                            width={500}
                            height={500}
                            alt="building"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className='border flex flex-col items-start justify-center px-[16px] min-h-[190px] mdx:min-h-[326px] order-3 mdx:order-4 2xl:order-1'>
                        <h3 className='font-medium text-[22px] mdx:text-[25px] mdl:text-[28px] slg:text-[30px] mb-[8px]'>Прозрачность и доверие</h3>
                        <p className='text-[16px] mdx:text-[20px] text-[#333]'>Обеспечение полной прозрачности всех операций и предоставление отчетов. Работа основана на принципах честности и доверия, что подтверждается отзывами</p>
                    </div>

                    <div className='border flex flex-col items-start justify-center px-[16px] xl:px-[29px] min-h-[190px] mdx:min-h-[326px] order-5 2xl:order-5'>
                        <h3 className='font-medium text-[22px] mdx:text-[25px] mdl:text-[28px] slg:text-[30px] mb-[8px]'>Высокий уровень обслуживания</h3>
                        <p className='text-[16px] mdx:text-[20px] text-[#333]'>Мы всегда на связи, чтобы помочь вам в любое время</p>
                    </div>
                    <div className='order-6 2xl:order-7'>
                        <Image
                            src={build3}
                            width={500}
                            height={500}
                            alt="building"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className='order-8 mdx:order-7 2xl:order-8'>
                        <Image
                            src={build4}
                            width={500}
                            height={500}
                            alt="building"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className='border flex flex-col items-start justify-center px-[16px] min-h-[190px] mdx:min-h-[326px] order-7 mdx:order-8 2xl:order-7'>
                        <h3 className='font-medium text-[22px] mdx:text-[25px] mdl:text-[28px] slg:text-[30px] mb-[8px]'>Индивидуальный подход</h3>
                        <p className='text-[16px] mdx:text-[20px] text-[#333]'>Мы разрабатываем персонализированные решения, учитывая уникальные потребности каждого клиента</p>
                    </div>

                    <div className='border flex flex-col items-start justify-center px-[16px] min-h-[190px] mdx:min-h-[326px] order-9 2xl:order-9'>
                        <h3 className='font-medium text-[22px] mdx:text-[25px] mdl:text-[28px] slg:text-[30px] mb-[8px]'>Комплексное обслуживание</h3>
                        <p className='text-[16px] mdx:text-[20px] text-[#333]'>Полный спектр услуг, включающий аренду, куплю-продажу, управление и инвестиции в недвижимость.</p>
                    </div>
                    <div className='max-mdx:hidden 2xl:hidden order-10'>
                        <Image
                            src={build5}
                            width={500}
                            height={500}
                            alt="building"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


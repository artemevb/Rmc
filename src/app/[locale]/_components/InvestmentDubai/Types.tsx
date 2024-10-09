import Image from 'next/image';
import build1 from "@/public/images/investmentsDubai/type-1.png";
import build2 from "@/public/images/investmentsDubai/type-2-pc.png";
import build3 from "@/public/images/investmentsDubai/type-2.png";
import build4 from "@/public/images/investmentsDubai/type-3-pc.png";
import build5 from "@/public/images/investmentsDubai/type-3.png";
import build6 from "@/public/images/investmentsDubai/type-4-pc.png";
import build7 from "@/public/images/investmentsDubai/type-4.png";
import build8 from "@/public/images/investmentsDubai/type-5-pc.png";
import build9 from "@/public/images/investmentsDubai/type-5.png";

import { useTranslations } from 'next-intl';

export default function Invest() {
    const t = useTranslations('investmentsDubai.Types');

    // Массив с изображениями и соответствующими заголовками
    const images = [
        { src: build1, alt: "Жилые комплексы", subtitle: t('subtitle-1') },
        { src: build3, alt: "Коммерческая недвижимость", subtitle: t('subtitle-2') },
        { src: build5, alt: "Офисы и коворкинги", subtitle: t('subtitle-3') },
        { src: build7, alt: "Отели и гостиничные апартаменты", subtitle: t('subtitle-4') },
        { src: build9, alt: "Виллы и таунхаусы", subtitle: t('subtitle-5') },
    ];

    return (
        <div className='w-full h-auto flex flex-col mx-auto max-xl:px-[10px] max-w-[1440px]'>
            <h3 className='font-medium text-[30px] mdx:text-[45px] xl:text-[55px] leading-[38px] mdx:leading-[50px] xl:leading-[70px] max-w-[710px]'>
                {t('title')}
            </h3>
            <div className='mt-[25px] grid gap-[12px] mdx:hidden'>
                {images.map((image, index) => (
                    <div key={index} className='relative'>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={1000}
                            height={1000}
                            quality={100}
                            layout="responsive"
                            objectFit="contain"
                            className='w-full h-full min-h-[220px]'
                        />
                        <h3 className='text-[22px] mdx:text-[30px] font-medium absolute bottom-2 left-2 text-white p-2'>
                            {image.subtitle}
                        </h3>
                    </div>
                ))}
            </div>


            <div className='mt-6 hidden mdx:block'>
                {/* Отдельное изображение для экрана меньше xl */}
                <div className='xl:hidden mb-3 relative'>
                    <Image
                        src={build1}
                        alt="Жилые комплексы"
                        width={1000}
                        height={1000}
                        quality={100}
                        layout="responsive"
                        objectFit="contain"
                        className='w-full h-full min-h-[220px] hover:shadow-lg transition-shadow duration-300'
                    />
                    <h3 className='absolute mdx:text-[30px] font-medium bottom-2 left-2 text-white p-2  rounded'>
                        {t('subtitle-1')}
                    </h3>
                </div>

                {/* Grid layout для xl экранов */}
                <div className="grid grid-cols-1 mdx:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div className="hidden xl:block relative xl:col-span-2">
                        <Image src={build1} quality={100} alt="Жилые комплексы" className="w-full h-full object-cover" />
                        <h3 className="text-[22px] mdx:text-[30px] xl:text-[35px] font-medium absolute bottom-2 left-2 text-white p-2  rounded">
                            {t('subtitle-1')}
                        </h3>
                    </div>
                    <div className="relative">
                        <Image src={build2} quality={100} alt="Коммерческая недвижимость" className="w-full h-auto object-cover " />
                        <h3 className="text-[22px] mdx:text-[30px] xl:text-[35px] font-medium absolute bottom-2 left-2 text-white p-2  rounded">
                            {t('subtitle-2')}
                        </h3>
                    </div>
                    <div className="relative">
                        <Image src={build4} quality={100} alt="Офисы и коворкинги" className="w-full h-auto object-cover " />
                        <h3 className="text-[22px] mdx:text-[30px] xl:text-[35px] font-medium absolute bottom-2 left-2 text-white p-2  rounded">
                            {t('subtitle-3')}
                        </h3>
                    </div>
                    <div className="relative">
                        <Image src={build6} quality={100} alt="Отели и гостиничные апартаменты" className="w-full h-auto object-cover" />
                        <h3 className="text-[22px] mdx:text-[30px] xl:text-[35px] font-medium absolute bottom-2 left-2 text-white p-2  rounded">
                            {t('subtitle-4')}
                        </h3>
                    </div>
                    <div className="relative">
                        <Image src={build8} quality={100} alt="Виллы и дома" className="w-full h-auto object-cover " />
                        <h3 className="text-[22px] mdx:text-[30px] xl:text-[35px] font-medium absolute bottom-2 left-2 text-white p-2  rounded">
                            {t('subtitle-5')}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

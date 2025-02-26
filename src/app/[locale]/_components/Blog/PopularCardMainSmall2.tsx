'use client';
import Image from 'next/image';
import Arrow_White from '@/public/svg/arrow-right-white.svg';
import Eyes from '@/public/svg/eyes-slider.svg';
import { useTranslations } from 'next-intl';

interface NewCardProps {
    subtitle: string;
    date: string;
    views: string;
    imageSrc: string;

}

const NewCard: React.FC<NewCardProps> = ({ subtitle, imageSrc, date, views }) => {
    const t = useTranslations('Main.Slider.Blog');

    return (

        <a className="w-full bg-white h-full flex flex-col justify-between relative group cursor-pointer ">
            <div className="relative h-full w-full">
                <Image
                    src={imageSrc}
                    width={1500}
                    height={1500}
                    quality={100}
                    alt={`News Image`}
                    className="w-full h-full object-cover xl:max-h-[290px] 2xl:min-h-[220px] 3xl:min-h-[290px]"
                />
                <div className="absolute inset-0 bg-black/25 to-transparent"></div>
                <div className="absolute inset-0  opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 xl:p-5">
                    <div className="flex justify-between items-center">
                        <p className="text-[16px] xl:text-[20px] text-[#fff] rounded">
                            {date}
                        </p>
                        <div className="flex items-center space-x-1  text-[16px] xl:text-[20px] text-[#fff] rounded">
                            <Image
                                src={Eyes}
                                width={24}
                                height={24}
                                quality={100}
                                alt={`Eyes icon`}
                                className="w-[24px] h-[24px] object-contain"
                            />
                            <p>{views}</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[20px] mdx:text-[22px] lh font-medium text-[#fff] mt-[8px] line-clamp-2">
                            {subtitle}
                        </p>
                        <div className="flex flex-row gap-[5px] items-center mt-[7px]">
                            <p className="text-[#ffffff] text-[16px] mdx:text-[18px] font-semibold">
                                {t('button-more')}
                            </p>
                            <Image
                                src={Arrow_White}
                                width={20}
                                height={20}
                                quality={100}
                                alt="arrow icon"
                                className="w-[20px] h-[20px] object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </a>

    );
};

export default NewCard;

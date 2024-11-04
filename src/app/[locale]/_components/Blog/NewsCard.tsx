'use client';
import Image from 'next/image';
import Arrow_Gold from '@/public/svg/arrow-right-gold.svg';
import Eyes from '@/public/svg/eyes-slider.svg';
import { useTranslations } from 'next-intl';

// Интерфейс для пропсов
interface NewCardProps {
  subtitle: string;
  date: string;
  views: string;  // Adding views count
  imageSrc: string;
}

const NewCard: React.FC<NewCardProps> = ({ subtitle, imageSrc, date, views }) => {
  const t = useTranslations('Main.Slider.Blog');

  return (
    <div className="w-full bg-white h-full flex flex-col justify-between relative">
      {/* Image Wrapper with Overlayed Date and Views */}
      <div className="relative">
        <Image
          src={imageSrc}
          width={1000}
          height={1000}
          quality={100}
          alt="News Image"
          className="w-full h-auto object-cover xl:max-w-[466px] min-h-[240px] max-h-[240px] mdx:min-h-[290px] mdx:max-h-[290px] xl:min-h-[300px] lg:max-h-[300px]"
        />

        {/* Градиентный overlay поверх изображения */}
        <div className="absolute inset-0 bg-black/20 to-transparent"></div>

        {/* Date and Views Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex items-end p-4 z-10">
          <div className="flex justify-between items-center w-full">
            {/* Date */}
            <p className="bg-opacity-70 px-2 py-1 text-[16px] xl:text-[20px] text-[#fff]">
              {date}
            </p>

            {/* Views */}
            <div className="flex items-center space-x-1 bg-opacity-70 px-2 py-1 text-[16px] xl:text-[20px] text-[#fff]">
              <Image
                src={Eyes}
                width={24}
                height={24}
                quality={100}
                alt="Views Icon"
                className="w-full h-auto object-cover"
              />
              <p>{views}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle and Button */}
      <div className="w-full flex flex-col flex-grow justify-between mt-[10px] xl:mt-[15px]">
        <p className="text-[20px] mdx:text-[24px] lh font-medium text-[#333333] mt-[8px] line-clamp-2">
          {subtitle}
        </p>
        <div className="flex flex-row gap-[5px] items-center mt-[10px]">
          <p className="text-corporate hover:text-corporate-dark text-[16px] mdx:text-[18px] font-semibold">
            {t('button-more')}
          </p>
          <Image
            src={Arrow_Gold}
            width={20} // Adjusted to match the className width
            height={20} // Adjusted to match the className width
            quality={100}
            alt="Arrow Icon"
            className="w-[25px] h-[25px]" // Ensure height matches for consistent sizing
          />
        </div>
      </div>
    </div>
  );
};

export default NewCard;

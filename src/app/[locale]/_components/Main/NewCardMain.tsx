'use client';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import Arrow_Gold from '@/public/svg/arrow-right-gold.svg';
import { useTranslations } from 'next-intl';

// Интерфейс для пропсов
interface NewCardProps {
  subtitle: string;
  date: string;
  imageSrc: StaticImageData;
}

const NewCard: React.FC<NewCardProps> = ({ subtitle,  imageSrc }) => {
  const t = useTranslations('News.Main');

  return (
    <div className="w-full bg-white h-full flex flex-col justify-between">
      <Image
        src={imageSrc}
        width={800}
        height={800}
        quality={100}
        alt={`News Image`}
        className="w-full h-auto object-cover"
      />
      <div className="w-full flex flex-col flex-grow justify-between mt-[10px] xl:mt-[15px]">
        <div className="line-clamp-2">
          <p className="text-[15px] mdx:text-[16px] xl:text-[18px] lh font-medium text-[#666] mt-[8px] line-clamp-2">
            {subtitle}
          </p>
        </div>
        <div className="flex flex-row gap-[5px] items-center mt-[10px]">
          <p className="text-[#E1AF93] hover: text-[16px] mdx:text-[18px] font-semibold">
            {t('button')}
          </p>
          <Image
            src={Arrow_Gold}
            width={20} // Adjusted to match the className width
            height={20} // Adjusted to match the className width
            quality={100}
            alt="Green Arrow"
            className="w-[25px] h-[25px]" // Ensure height matches for consistent sizing
          />
        </div>
      </div>
    </div>
  );
};

export default NewCard;

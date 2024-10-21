'use client';
import Image from 'next/image';

interface NewCardProps {
    subtitle: string;
    imageSrc: string;
    coast: string;
}

const NewCard: React.FC<NewCardProps> = ({ coast, subtitle, imageSrc }) => {
    return (
        <div className="w-full bg-white h-full flex flex-col justify-between relative">
            <div className="relative">
                <Image
                    src={imageSrc}
                    width={1000}
                    height={1000}
                    quality={100}
                    alt={`News Image`}
                    className="w-full h-auto object-cover xl:max-w-[467px] min-h-[400px] xl:min-h-[600px]"
                />
            </div>
            <div className="absolute w-full flex flex-col flex-grow justify-between bottom-[20px] mdx:bottom-[24px] left-[20px]">
                <p className="text-[28px] mdx:text-[30px] xl:text-[35px] lh font-semibold text-[#ffffff] line-clamp-2">
                    {subtitle}
                </p>
                <p className="text-[16px] mdx:text-[20px] lh text-[#ffffff] line-clamp-2">
                    {coast}
                </p>
            </div>
        </div>
    );
};

export default NewCard;


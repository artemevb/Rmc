import Image from 'next/image';
import build1 from "@/public/images/main/build2.png";
import build1_big from "@/public/images/main/build2-big.png";
import build2 from "@/public/images/main/build3.png";
import { useTranslations } from 'next-intl';

export default function Banner() {
    const t = useTranslations('Main.Consalting');

    const processText = (text: string) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className='w-full h-auto flex flex-col mx-auto bg-[#FCF7F4] py-[30px] mdx:py-[40px] xl:py-[80px]'>
            <div className='mx-2 xl:flex xl:items-center xl:justify-between xl:flex-row max-w-[1440px] xl:mx-auto'>
                <div className="xl:w-full xl:max-w-[800px] xl:pr-4">
                    <h2 className='text-[29px] mdx:text-[40px] mdl:text-[45px] xl:text-[50px] 2xl:text-[55px] font-medium mb-[12px] leading-[35px] xl:leading-[70px]'>{t('title')}</h2>
                    <h4 className='text-[14px] mdx:text-[20px] mt-[16px] mb-[50px] hidden mdx:block'>
                        {processText(t('subtitle'))}
                    </h4>
                    <div>
                        <button className="bg-[#E1AF93] hover:bg-[#EAC7B4] text-[17px] font-semibold text-white py-2 px-4 mdx:py-3 w-full max-w-[175px] mdx:max-w-[223px] mt-[30px] hidden xl:block">{t('button')}</button>
                    </div>
                </div>
                <div className='xl:w-1/2 xl:pl-4 grid grid-cols-2 gap-[12px] xl:hidden'>
                    <div>
                        <Image src={build1}
                            alt="buildings1"
                            width={1000}
                            height={1000}
                            quality={100}
                            layout="responsive"
                            objectFit="contain"
                            className='w-full h-full min-h-[220px]' />
                    </div>
                    <div>
                        <Image src={build2}
                            alt="buildings2"
                            width={1000}
                            height={1000}
                            quality={100}
                            layout="responsive"
                            objectFit="contain"
                            className='w-full h-full min-h-[220px]' />
                    </div>
                </div>
                <div className=" hidden flex-1 w-full h-full xl:flex relative z-10 max-w-[588px]">
                    <div className="relative w-full flex justify-end">
                        <div className="w-[32%] h-[50%] left-[145px] aspect-w-4 aspect-h-1 absolute bottom-[-30px] z-10">
                            <Image
                                src={build2}
                                alt="Medical Equipment"
                                quality={100}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="w-[62%] aspect-w-4 aspect-h-3 relative mb-[50px] ml-[200px]">
                            <Image
                                src={build1_big}
                                alt="Office"
                                quality={100}
                                objectFit="cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <h4 className='text-[14px] mdx:text-[20px] mt-[16px] mdx:hidden max-xl:px-[10px]'>
                {processText(t('subtitle'))}
            </h4>
            <div className='max-xl:px-[10px]'>
                <button className="bg-[#E1AF93] hover:bg-[#EAC7B4] text-[17px] font-semibold text-white py-2 px-4 mdx:py-3 w-full max-w-[175px] mdx:max-w-[223px] mt-[30px] xl:hidden">{t('button')}</button>
            </div>
        </div>
    );
}

import Image from 'next/image';
import build1 from "@/public/images/main/build1.png";
import build1_big from "@/public/images/main/Build1-big.png";
import build2 from "@/public/images/main/build1.5.png";
import build2_big from "@/public/images/main/build1-sm.png";
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface local {
    locale: string;
}

export default function Banner({ locale }: local) {
    const t = useTranslations('Main.Investition');

    const processText = (text: string) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className='w-full h-auto flex flex-col mx-auto bg-[#EDF3F5] py-[30px] mdx:py-[40px] xl:py-[80px]'>
            <div className='mx-2 xl:flex xl:items-center xl:flex-row max-w-[1440px] xl:mx-auto'>
                <div className="xl:w-1/2 xl:pr-4">
                    <h2 className='text-[29px] mdx:text-[40px] mdl:text-[45px] xl:text-[50px] 2xl:text-[55px] font-medium mb-[12px] leading-[35px] xl:leading-[70px]'>{t('title')}</h2>
                    <h4 className='text-[14px] mdx:text-[20px] mt-[16px] mb-[50px] hidden mdx:block'>
                        {processText(t('subtitle'))}
                    </h4>
                    <div>
                        <Link href={`/${locale}/investmentDubai`}>
                            <button className="bg-corporate hover:bg-hover_corporate text-[17px] font-semibold text-white py-2 px-4 mdx:py-3 w-full max-w-[175px] mdx:max-w-[223px] mt-[30px] hidden xl:block">{t('button')}</button>
                        </Link>
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
                        <Image src={build2_big}
                            alt="buildings2"
                            width={1000}
                            height={1000}
                            quality={100}
                            layout="responsive"
                            objectFit="contain"
                            className='w-full h-full min-h-[220px]' />
                    </div>
                </div>
                <div className=" hidden flex-1 w-full h-full xl:flex relative z-10">
                    <div className="relative w-full flex justify-center">
                        <div className="w-1/3 relative">
                        </div>
                        <div className="w-[32%] h-[50%] ml-[130px] aspect-w-4 aspect-h-1 absolute bottom-[-30px] left-0 z-10">
                            <Image
                                src={build2}
                                quality={100}
                                alt="Medical Equipment"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="w-[62%] aspect-w-4 aspect-h-3 relative mb-[50px] ">
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
                <Link href={`/${locale}/investmentDubai`}>
                    <button className="bg-corporate hover:bg-hover_corporate text-[17px] font-semibold text-white py-2 px-4 mdx:py-3 w-full max-w-[175px] mdx:max-w-[223px] mt-[30px] xl:hidden">{t('button')}</button>
                </Link>
            </div>
        </div>
    );
}

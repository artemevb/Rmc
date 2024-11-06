
import { useTranslations } from 'next-intl';
import photo1 from "@/public/images/about/Full-screen2.jpg";

export default function Banner() {
    const t = useTranslations('About');

    return (
        <div className="w-full h-auto flex flex-col mx-auto">
            <div 
                className="relative w-full h-auto min-h-[650px] max-h-[800px] bg-cover bg-center" 
                style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${photo1.src}) lightgray 50% / cover no-repeat`
                }}
            >
                <img
                    src={photo1.src}
                    alt="Banner Image"
                    className="opacity-0 w-full h-auto"
                />
                <div className="absolute bottom-10 2xl:bottom-14 ml-[10px] mdx:ml-[20px] xl:left-10 3xl:left-[10%] text-white">
                    <h2
                        className="text-[35px] mdx:text-[55px] mdl:text-[60px] lg:text-[70px] xl:text-[75px] 3xl:text-[80px] font-medium max-w-[520px] lg:max-w-[650px] xl:max-w-[710px]"
                        style={{ lineHeight: "1.1" }}
                    >
                        {t('title')}
                    </h2>
                </div>
            </div>
        </div>
    );
}

'use client';

// import facebook from '@/public/svg/footer/facebook.svg';
import instagr from '@/public/svg/footer/instagram.svg';
import telegram from '@/public/svg/footer/telegram.svg';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslations } from 'next-intl';

interface NewsCompProps {
    locale: string;
}

interface Photo {
    id: number;
    url: string;
}

interface Title {
    uz: string;
    ru: string;
    en: string;
}

interface Description {
    uz: string;
    ru: string;
    en: string;
}

interface Option {
    id: number;
    title: Title;
    description: Description;
    orderNum: number;
    photo: Photo;
}

interface Type {
    id: number;
    name: Title;
}

interface Data {
    id: number;
    slug: string;
    options: Option[];
    type: Type;
    createdDate: string;
    viewCounter: number;
    active: boolean;
    main: boolean;
}

interface ApiResponse {
    message: string;
    data: Data;
}

export default function NewsTitle({ locale }: NewsCompProps) {
    const t = useTranslations('Blog.Share');

    const [news, setNews] = useState<Data | null>(null);

    const { slug } = useParams();

    useEffect(() => {
        const fetchNewsWithSlug = async () => {
            try {
                const response = await axios.get<ApiResponse>(
                    `https://rmc.mrjtrade.uz/api/blog/get-by-slug/${slug}`,
                    {
                        headers: { 'Accept-Language': locale },
                    }
                );
                setNews(response.data.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Failed to fetch news:', error.message);
                } else {
                    console.error('Failed to fetch news:', error);
                }
                setNews(null); // Сброс состояния при ошибке
            }
        };
        fetchNewsWithSlug();
    }, [locale, slug]);

    const icons = [
        {
            src: instagr,
            alt: 'Instagram Icon',
            link: 'https://www.instagram.com/rmc_de_luxe?igsh=cWpxdXVobHgxODcx',
        },
        { src: telegram, alt: 'Telegram Icon', link: 'https://t.me/rmcdeluxegroup' },
        // {
        //     src: facebook,
        //     alt: 'Facebook Icon',
        //     link: '#',
        // },
    ];

    const copyLinkToClipboard = () => {
        navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
                toast.success(t('link_copied'), {
                    position: 'top-right',
                    autoClose: 3000,
                });
            })
            .catch((err) => {
                toast.error(t('copy_error'), {
                    position: 'top-right',
                    autoClose: 3000,
                });
                console.error(t('copy_error'), err);
            });
    };

    return (
        <div className='max-xl:bg-slate-100 mb-[120px] mdx:mb-[150px] xl:mb-[200px]'>
            <ToastContainer />
            <div className=' mdl:mx-auto max-w-[1440px]'>
                <div className='max-xl:mx-[15px] xl:flex xl:flex-row mdl:items-center mdl:justify-between  xl:justify-center relative mdl:py-4'>
                    <div className='mdl:items-center mdl:flex flex justify-start content-left xl:mt-[13%]'>
                        {news?.options && news.options.length > 0 ? (
                            <Image
                                src={news.options[0].photo.url}
                                width={1000}
                                height={1000}
                                quality={100}
                                alt='News Image'
                                className='w-full h-full mt-[40px] max-w-[340px] max-h-[340px] object-cover mdl:w-full mdl:mr-5 xl:mr-0 xl:min-h-[466px] xl:min-w-[500px]  xl:max-h-[466px] xl:max-w-[710px]'
                            />
                        ) : (
                            <p>Изображение не доступно</p>
                        )}
                    </div>
                    <div className='relative z-[999] bg-slate-100 w-full'>

                        <div className='flex flex-col mdl:flex-1 pb-[24px] '>
                            <h2 className='z-20 mt-8 font-semibold text-[27px] xl:text-[35px] xl:ml-9 mdl:text-[23px] slg:text-[30px] text-[#333333]'>
                                {t('title')}
                            </h2>
                        </div>
                        <div className='flex gap-3 pb-[40px] mdl:pb-[30px] mdl:ml-3 xl:ml-9'>
                            <button
                                onClick={copyLinkToClipboard}
                                className='flex items-center justify-center text-white text-[16px] xl:text-[20px] min-w-[169px] py-3 bg-[#E1AF93] hover:bg-[#EAC7B4] mdx:min-w-[223px]'
                            >
                                {t('copy-link')}
                            </button>
                            {icons.map((icon, index) => (
                                <div
                                    key={index}
                                    className='w-[49px] h-[49px]'
                                >
                                    <a
                                        href={icon.link}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        className='flex items-center justify-center w-full h-full'
                                    >
                                        <Image
                                            src={icon.src}
                                            width={21}
                                            height={21}
                                            quality={100}
                                            alt={icon.alt}
                                            className='w-[30px] h-[30px] object-cover slg:h-[35px] slg:w-[35px]'
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

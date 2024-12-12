"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { client } from '../../../../sanity/lib/client';
import { ClimbingBoxLoader } from 'react-spinners';
import { GET_RESIDENTIAL_COMPLEXES } from '../NewBuildings/queries';
import { ResidentialComplex } from '../NewBuildings/types';

interface InvestProps {
    locale: string;
}

interface ImageItem {
    _id: string;
    mainImageUrl: string;
    mainImageAlt: string;
    subtitle: string;
    price: string;
    priceValue: number;
    slug: {
        current: string;
    };
}

export default function Invest({ locale }: InvestProps) {
    const t = useTranslations('NewBuildingsMain');
    const [images, setImages] = useState<ImageItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const complexes: ResidentialComplex[] = await client.fetch(GET_RESIDENTIAL_COMPLEXES);

                const transformedData: ImageItem[] = complexes.map(item => ({
                    _id: item._id,
                    mainImageUrl: item.mainImage.asset.url,
                    mainImageAlt: item.alt[locale as keyof typeof item.alt] || item.alt['ru'],
                    subtitle: item.subtitle[locale as keyof typeof item.subtitle] || item.subtitle['ru'],
                    price: item.price,
                    priceValue: item.priceValue,
                    slug: {
                        current: item.slug?.current || '',
                    },
                }));

                setImages(transformedData);
                setIsLoading(false);
            } catch (err) {
                console.error('Ошибка при получении данных из Sanity:', err);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [locale]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <ClimbingBoxLoader size={15} color="#E94B50" loading={isLoading} />
            </div>
        );
    }

    // Ограничение на отображение 6 карточек
    const displayedImages = images.slice(0, 6);

    return (
        <div className="w-full h-auto flex flex-col mx-auto px-4 max-w-full md:max-w-[1440px] mb-[120px]">
            <h3 className="font-medium text-[30px] mdx:text-[45px] xl:text-[55px] leading-[38px] mdx:leading-[50px] xl:leading-[70px] max-w-[710px]">
                {t('title')}
            </h3>
            <div className="mt-[25px] grid gap-[12px] xl:gap-[20px] mdx:grid-cols-2 xl:grid-cols-3">
                {displayedImages.map((image) => (
                    <Link
                        key={image._id}
                        href={`/${locale}/new-buildings/${image.slug?.current || ''}`}
                        className="w-full flex flex-col"
                    >
                        <div className="relative w-full h-[350px] xl:h-[550px]">
                            <Image
                                src={image.mainImageUrl}
                                alt={image.mainImageAlt}
                                layout="fill"
                                objectFit="cover"
                                className="w-full h-full"
                            />
                        </div>
                        <div className="mt-2 p-1">
                            <h3 className="text-[28px] mdx:text-[30px] xl:text-[35px] font-medium text-gray-900 leading-[35px] xl:leading-[45px] line-clamp-2">
                                {image.subtitle}
                            </h3>
                            <h5 className="text-[16px] mdx:text-[20px] text-gray-900 mt-2">
                                {image.price}
                            </h5>
                        </div>
                    </Link>
                ))}

                {images.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">
                        {t("noResults") || "Нет доступных объектов."}
                    </p>
                )}
            </div>

            {/* Кнопка перейти в каталог */}
            <div className="flex justify-center mt-[50px]">
                <Link
                    href={`/${locale}/new-buildings`}
                    className="py-3 px-8 bg-corporate text-white text-[16px] mdx:text-[18px] rounded-md shadow-md transition-all hover:bg-hover_corporate"
                >
                    {t('goToCatalog') || "Перейти в каталог"}
                </Link>
            </div>
        </div>
    );
}
"use client";
import { useState, useEffect } from 'react';
import { client } from '@/src/sanity/lib/client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface LocaleString {
  ru?: string;
  en?: string;
  uz?: string;
}

interface CategoryData {
  description?: LocaleString;
  items?: { name: LocaleString; time: LocaleString }[];
  images?: { desktop: string };
}

interface ApiData {
  markets?: CategoryData;
  Machine?: CategoryData;
  schools?: CategoryData;
}

interface InfrastructureProps {
  locale: 'ru' | 'uz' | 'en';
  complexSlug: string;
}

export default function Infrastructure({ locale, complexSlug }: InfrastructureProps) {
  const t = useTranslations('Building_page_main.Infrastructure');
  const [category, setCategory] = useState<keyof ApiData>('markets');
  const [apiData, setApiData] = useState<ApiData | null>(null);

  useEffect(() => {
    if (!complexSlug) return;

    client
      .fetch(
        `*[_type == "infrastructure" && residentialComplex->slug.current == $slug][0]{
          markets{
            description,
            items[] {
              name,
              time
            },
            images {
              "desktop": desktop.asset->url
            }
          },
          Machine{
            description,
            items[] {
              name,
              time
            },
            images {
              "desktop": desktop.asset->url
            }
          },
          schools{
            description,
            items[] {
              name,
              time
            },
            images {
              "desktop": desktop.asset->url
            }
          },
          residentialComplex-> {
            title,
            slug
          }
        }`,
        { slug: complexSlug }
      )
      .then((data) => {
        console.log('Полученные данные:', data);
        setApiData(data || null);
      })
      .catch(console.error);
  }, [complexSlug]);

  if (!apiData) {
    return null; // Если данные вообще не приходят, не рендерить компонент
  }

  const handleCategoryClick = (newCategory: keyof ApiData) => {
    setCategory(newCategory);
  };

  const getFilteredContent = () => {
    if (!apiData[category]?.items) return null; // Если items нет, не рендерим контент
    return (
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mdx:gap-x-[120px] mdx:gap-y-8 mt-[40px] mdx:mt-[60px]">
        {apiData[category]?.items?.map((item, index) => (
          <div key={index}>
            <h4 className="text-[22px] font-medium mdx:text-[30px]">{item.name[locale]}</h4>
            <p className="text-[#B3B3B3] text-[16px] mdx:text-[20px]">{item.time[locale]}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col mx-auto max-w-[1440px] max-3xl:px-[16px] mt-[120px] mdl:mt-[150px] xl:mt-[200px]">
      <div className="xl:flex xl:h-full xl:items-center xl:gap-[20px] 3xl:gap-[60px] w-full">
        <h3 className="text-[30px] font-medium mdx:text-[45px] xl:text-[55px] leading-[38px] max-mdx:max-w-[224px] xl:hidden">
          {t('title')}
        </h3>
        {apiData[category]?.images?.desktop && (
          <div className="w-full h-full overflow-hidden xl:max-w-[710px] xl:max-h-[564px] max-mdx:mt-[25px] mdx:mt-[40px] xl:mt-0">
            <Image
              src={apiData[category].images.desktop}
              alt="Buildings image"
              quality={100}
              className="object-cover w-full h-full"
              width={1500}
              height={1564}
            />
          </div>
        )}

        <div className="w-full xl:max-w-[670px]">
          <h3 className="text-[30px] font-medium mdx:text-[45px] xl:text-[55px] leading-[38px] max-mdx:max-w-[224px] hidden xl:block">
            {t('title')}
          </h3>
          <div className="border-b overflow-x-scroll hide-scrollbar scrollbar-hide flex mt-[24px] mdx:mt-[40px] xl:mt-[50px] w-full gap-[30px]">
            {apiData.markets && (
              <button
                onClick={() => handleCategoryClick('markets')}
                className={`text-[#858585] text-[16px] mdx:text-[20px] pb-[19px] border-b-2 transition-all duration-300 ${
                  category === 'markets' ? 'text-corporate border-corporate' : 'border-transparent'
                }`}
              >
                {t('Markets')}
              </button>
            )}
            {apiData.Machine && (
              <button
                onClick={() => handleCategoryClick('Machine')}
                className={`text-[#858585] text-[16px] mdx:text-[20px] pb-[19px] border-b-2 transition-all duration-300 ${
                  category === 'Machine' ? 'text-corporate border-corporate' : 'border-transparent'
                }`}
              >
                {t('Machine')}
              </button>
            )}
            {apiData.schools && (
              <button
                onClick={() => handleCategoryClick('schools')}
                className={`text-[#858585] text-[16px] mdx:text-[20px] pb-[19px] border-b-2 transition-all duration-300 ${
                  category === 'schools' ? 'text-corporate border-corporate' : 'border-transparent'
                }`}
              >
                {t('Schools')}
              </button>
            )}
          </div>

          {apiData[category]?.description && (
            <p className="text-[16px] mdx:text-[20px] mt-[16px] mdx:mt-[30px]">
              {apiData[category].description[locale]}
            </p>
          )}

          <div>{getFilteredContent()}</div>
        </div>
      </div>
    </div>
  );
}

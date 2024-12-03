'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { urlFor } from '@/src/sanity/lib/image';
import { client } from '@/src/sanity/lib/client';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ClimbingBoxLoader } from 'react-spinners';
import { useTranslations } from 'next-intl';

interface ResidentialComplexTitle {
  ru: string;
  uz: string;
  en: string;
}

interface ResidentialComplex {
  _id: string;
  subtitle: ResidentialComplexTitle;
  mainImage: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  slug: {
    current: string;
  };
  district: {
    _id: string;
    name_ru: string;
    name_uz: string;
    name_en: string;
  };
  type: {
    _id: string;
    name_ru: string;
    name_uz: string;
    name_en: string;
  };
}

const ResultsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState<ResidentialComplex[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations('Main.Search');

  useEffect(() => {
    const fetchResults = async () => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) {
        setResults([]);
        setLoading(false);
        return;
      }

      // Формируем GROQ-запрос с поиском по subtitle, district и type на всех языках
      const sanityQuery = `*[_type == "residentialComplex" && 
        (
          subtitle.ru match $search || 
          subtitle.uz match $search || 
          subtitle.en match $search || 
          district->name_ru match $search || 
          district->name_uz match $search || 
          district->name_en match $search || 
          type->name_ru match $search || 
          type->name_uz match $search || 
          type->name_en match $search
        )
      ]{
        _id,
        subtitle,
        mainImage,
        district->{ _id, name_ru, name_uz, name_en },
        type->{ _id, name_ru, name_uz, name_en },
        slug,
      }`;

      try {
        setLoading(true);
        const data: ResidentialComplex[] = await client.fetch(sanityQuery, { search: `*${trimmedQuery}*` });
        setResults(data);
      } catch (err) {
        console.error('Ошибка при получении данных из Sanity:', err);
        setError(t('error.fetchingData'));
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, locale]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
        <ClimbingBoxLoader size={15} color="#E94B50" loading={loading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium text-[#333333]">{t('resultsTitle')}</h1>
      <h5 className="text-[16px] xl:text-[20px] mt-[8px] mdx:mt-[11px] text-[#858585]">
        {t('resultsForQuery')} <span className='text-corporate'>«{query}»</span>
      </h5>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 mdx:grid-cols-2 xl:grid-cols-3 gap-4 mt-[40px]">
          {results.map((complex) => (
            <div key={complex._id} className="border hover:bg-[#F7F7F7] transition-all">
              <Link href={`/${locale}/new-buildings/${complex.slug.current}`}>
                {complex.mainImage && complex.mainImage.asset._ref && (
                  <Image
                    src={urlFor(complex.mainImage).url() || '/placeholder.png'}
                    alt={complex.subtitle[locale as keyof ResidentialComplexTitle] || t('defaultImageAlt')}
                    width={400}
                    height={300}
                    quality={100}
                    className="w-full h-[300px] object-cover"
                  />
                )}
                <div className='p-3'>
                  <h2 className="text-xl font-semibold mt-[5px]">{complex.subtitle[locale as keyof ResidentialComplexTitle]}</h2>
                  <p className="text-gray-600 mt-[3px]">
                    {t('district')}: {getName(complex.district, locale)}
                  </p>
                  <p className="text-gray-600 mt-[3px]">
                    {t('type')}: {getName(complex.type, locale)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className='mt-4'>{t('noResults')}</p>
      )}
    </div >
  );
};

const getName = (item: { [key: string]: string }, locale: string): string => {
  return item[`name_${locale}`] || item['name_ru'] || 'Неизвестно';
};

export default ResultsPage;

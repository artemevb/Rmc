// components/Conditions.tsx

"use client";

import { useTranslations } from 'next-intl';
import { client } from '@/src/sanity/lib/client';
import groq from 'groq';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

interface ConditionsProps {
    locale: 'ru' | 'en' | 'uz';
    complexSlug: string;
}

interface ConditionSection {
    _key: string;
    heading_ru: string;
    heading_en: string;
    heading_uz: string;
    paragraphs_ru: string[];
    paragraphs_en: string[];
    paragraphs_uz: string[];
}

interface ConditionsData {
    sections: ConditionSection[];
}

const Conditions: React.FC<ConditionsProps> = ({ locale, complexSlug }) => {
    const t = useTranslations('Building_page_main.Conditions');
    const [data, setData] = useState<ConditionsData>({ sections: [] });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchConditions = async () => {
            setLoading(true);
            setError(null);
            try {
                const query = groq`*[_type == "conditions" && residentialComplex->slug.current == $complexSlug][0]{
                  sections[]{
                    _key,
                    heading_${locale},
                    paragraphs_${locale}
                  }
                }`;
                const result = await client.fetch(query, { complexSlug });
                if (result && result.sections) {
                    setData({ sections: result.sections });
                } else {
                    setData({ sections: [] });
                }
            } catch (err) {
                console.error('Ошибка при загрузке данных:', err);
                setError('Не удалось загрузить данные.');
            } finally {
                setLoading(false);
            }
        };

        if (complexSlug) {
            fetchConditions();
        } else {
            setLoading(false);
            setError('Не указан slug жилого комплекса.');
        }
    }, [locale, complexSlug]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    // Если произошла ошибка или нет данных, не отображаем компонент
    if (error || !data.sections.length) {
        return null;
    }

    return (
        <div className="w-full h-full flex flex-col mx-auto max-w-[1440px] max-2xl:px-[16px]">
            <div className='max-xl:border-b'>
                <h2 className='text-[30px] mdx:text-[45px] xl:text-[55px] font-medium pb-[12px] mdx:pb-[15px]'>
                    {t('title')}
                </h2>
                <p className='text-[16px] mdx:text-[20px] text-[#858585] pb-[40px] xl:max-w-[710px]'>
                    {t('description')}
                </p>
            </div>
            <div className='xl:flex flex-col'>
                {data.sections.map((section) => (
                    <div key={section._key} className='border-b py-[24px] xl:py-[40px] xl:flex xl:justify-between'>
                        <h4 className='text-[20px] mdx:text-[25px] font-medium'>
                            {section[`heading_${locale}`]}
                        </h4>
                        <div className='mt-[15px] mdx:mt-[20px] xl:mt-0 xl:w-full xl:max-w-[588px]'>
                            {section[`paragraphs_${locale}`].map((paragraph, pIndex) => (
                                <p key={pIndex} className='text-[16px] mdx:text-[20px] pt-[4px] mdx:pt-[12px] text-[#333]'>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

Conditions.propTypes = {
    locale: PropTypes.oneOf(['ru', 'en', 'uz'] as const).isRequired,
    complexSlug: PropTypes.string.isRequired,
};

export default Conditions;

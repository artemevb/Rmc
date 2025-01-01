"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import NewCardMain from '../Main/NewCardMain';
import Slider from 'react-slick';
import { useTranslations } from "next-intl";
import Link from "next/link";
import { client } from '@/src/sanity/lib/client'; // Импорт клиента Sanity

// Интерфейс для пропсов компонента
interface LocaleProps {
  locale: string;
}

// Интерфейс для исходных данных новостей
interface NewsItem {
  slug: { current: string };
  title: { [key: string]: string };
  date: string;
  viewCounter?: number;
  mainImage?: { asset?: { url?: string } };
}

// Интерфейс для отображаемых данных новостей
interface MappedNewsItem {
  slug: string;
  title: string;
  date: string;
  viewCounter: number;
  mainImageUrl: string;
}

export default function NewsComp({ locale }: LocaleProps) {
  const t = useTranslations('Blog.Other');
  const [visibleNews, setVisibleNews] = useState<MappedNewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с нуля
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const fetchNews = async () => {
    try {
      const query = `*[_type == "news"] | order(date desc) {
        slug,
        title,
        date,
        viewCounter,
        mainImage{
          asset->{
            _id,
            url
          }
        }
      }[0...10]`;

      const newsItems: NewsItem[] = await client.fetch<NewsItem[]>(query);

      // Преобразование данных новостей в нужный формат
      const mappedNews: MappedNewsItem[] = newsItems.map((item: NewsItem) => ({
        slug: item.slug.current,
        title: item.title[locale] || item.title['ru'] || '',
        date: formatDate(item.date),
        viewCounter: item.viewCounter ?? 0, // Используем оператор нулевого слияния
        mainImageUrl: item.mainImage?.asset?.url || '',
      }));

      setVisibleNews(mappedNews);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Не удалось загрузить новости.');
      setLoading(false);
    }
  };

  // Получение новостей при изменении локали
  useEffect(() => {
    fetchNews();
  }, [locale]);

  if (loading) {
    return <div className='text-center'>Загрузка...</div>;
  }

  if (error) {
    return <div className='text-center text-red-500'>{error}</div>;
  }

  if (visibleNews.length === 0) {
    return <div className='text-center'>Нет доступных новостей.</div>;
  }

  return (
    <div className='w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 mb-[90px] mdx:mb-[150px] 2xl:mb-[190px]'>
      <h2 className='text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-medium'>
        {t("title")}
      </h2>
      <div className='w-full h-auto'>
        <Slider {...settings} className='h-auto w-full'>
          {visibleNews.map((item) => (
            <div className='px-[10px] xl:h-[426px] max-h-full' key={item.slug}>
              <Link href={`/${locale}/blog/${item.slug}`}>
                <NewCardMain
                  subtitle={item.title}
                  date={item.date}
                  imageSrc={item.mainImageUrl}
                  views={item.viewCounter}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex items-center justify-center xl:mt-[60px] mdx:mt-[40px] mt-[30px]">
        <Link
          href={`/${locale}/blog`}
          className='bg-corporate hover:bg-hover_corporate text-white py-[12px] px-4 w-[223px] flex justify-center font-semibold text-[17px] transition-all duration-300'
        >
          {t("button-more")}
        </Link>
      </div>
    </div>
  );
}

// src/app/[locale]/page.tsx
import { GET_RESIDENTIAL_COMPLEXES, GET_LAYOUTS } from '../_components/PropertySearch/queries';
import PageContent from '../_components/PropertySearch/PageContent';
import { Locale } from '@/src/app/[locale]/_components/PropertySearch/locale';
import { apiVersion, dataset, projectId } from '@/src/sanity/env'; // Импортируем переменные окружения

interface PageProps {
  params: {
    locale?: string; 
  };
}

const supportedLocales: Locale[] = ['ru', 'uz', 'en'];

export default async function Page({ params }: PageProps) {
  let { locale } = params;

  if (!locale || !supportedLocales.includes(locale as Locale)) {
    locale = 'en'; 
  }

  const GET_RESIDENTIAL_COMPLEXES_QUERY = encodeURIComponent(GET_RESIDENTIAL_COMPLEXES);
  const GET_LAYOUTS_QUERY = encodeURIComponent(GET_LAYOUTS);

  const SANITY_API_URL = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;

  // Функция для выполнения запросов к Sanity с отключенным кешированием
  const fetchSanityData = async (query: string) => {
    const response = await fetch(`${SANITY_API_URL}?query=${query}`, {
      method: 'GET',
      cache: 'no-store', // Отключение кеширования
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;
  };

  // Получение данных параллельно
  const [complexes, layouts] = await Promise.all([
    fetchSanityData(GET_RESIDENTIAL_COMPLEXES_QUERY),
    fetchSanityData(GET_LAYOUTS_QUERY),
  ]);

  return (
    <PageContent complexes={complexes} layouts={layouts} locale={locale as Locale} />
  );
}


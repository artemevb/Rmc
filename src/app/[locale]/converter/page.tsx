// src/app/[locale]/page.tsx
import { client } from '@/src/sanity/lib/client';
import { GET_RESIDENTIAL_COMPLEXES, GET_LAYOUTS } from '../_components/Converter/queries';
import PageContent from '../_components/Converter/PageContent';
import { Locale } from '@/src/app/[locale]/_components/Converter/locale';

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

  const complexes = await client.fetch(GET_RESIDENTIAL_COMPLEXES);
  const layouts = await client.fetch(GET_LAYOUTS);

  return (
    <PageContent complexes={complexes} layouts={layouts} locale={locale as Locale} />
  );
}

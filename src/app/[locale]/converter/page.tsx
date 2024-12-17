"use client"
import { useLocale } from 'next-intl';
import { client } from '@/src/sanity/lib/client';
import { GET_RESIDENTIAL_COMPLEXES, GET_LAYOUTS } from '../_components/Converter/queries';
import PageContent from '../_components/Converter/PageContent';

export default async function Page() {
  const locale = useLocale();

  const complexes = await client.fetch(GET_RESIDENTIAL_COMPLEXES);
  const layouts = await client.fetch(GET_LAYOUTS);

  return (
    <PageContent complexes={complexes} layouts={layouts} locale={locale} />
  );
}

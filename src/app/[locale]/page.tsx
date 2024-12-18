// app/[locale]/page.tsx или соответствующий файл

import Main from "@/src/app/[locale]/_components/Main/Main";
import type { Locales } from "@/src/app/[locale]/layout";

type HomeProps = {
  params: {
    locale?: string;
  };
};

export default function Home({ params }: HomeProps) {
  // Определяем локаль на основе параметров маршрута
  const locale: Locales = params?.locale === 'uz' ? 'uz'
    : params?.locale === 'en' ? 'en'
      : 'ru';

  return (
    <div>
      <Main locale={locale} />
    </div>
  );
}

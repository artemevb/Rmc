import { useTranslations } from 'next-intl';
import { client } from '@/src/sanity/lib/client';
import groq from 'groq';
import { GetServerSideProps } from 'next';

const query = groq`
  *[_type == "conditionsSection"] {
    title,
    items
  }
`;

interface LayoutProps {
  data: {
    title: string;
    items: Array<{ heading: string; paragraphs: string[] }>;
  };
}

export default function Conditions({ data }: LayoutProps) {
  const t = useTranslations('Building_page_main.Conditions');

  return (
    <div className="w-full h-full flex flex-col mx-auto max-w-[1440px] max-2xl:px-[16px]">
      <div className='max-xl:border-b'>
        <h2 className='text-[30px] mdx:text-[45px] xl:text-[55px] font-medium pb-[12px] mdx:pb-[15px]'>
          {data?.title || t('title')}
        </h2>
        <p className='text-[16px] mdx:text-[20px] text-[#858585] pb-[40px] xl:max-w-[710px]'>
          {t('description')}
        </p>
      </div>
      <div className='xl:flex flex-col'>
        {data?.items?.length ? (
          data.items.map((item, index) => (
            <div key={index} className='border-b py-[24px] xl:py-[40px] xl:flex xl:justify-between'>
              <h4 className='text-[20px] mdx:text-[25px] font-medium'>{item.heading}</h4>
              <div className='mt-[15px] mdx:mt-[20px] xl:mt-0 xl:w-full xl:max-w-[588px]'>
                {item.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className='text-[16px] mdx:text-[20px] pt-[4px] mdx:pt-[12px]'>{paragraph}</p>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>{t('no_items')}</p>
        )}
      </div>
    </div>
  );
}

// Server-Side Rendering (SSR)
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const data = await client.fetch(query, { slug });

  if (!data) {
    return {
      notFound: true, // Если данных нет, возврат 404
    };
  }

  return {
    props: {
      data,
    },
  };
};

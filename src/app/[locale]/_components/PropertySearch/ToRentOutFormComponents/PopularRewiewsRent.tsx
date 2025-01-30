"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import openIcon from "@/public/svg/button-arrow-top.png";
import closedIcon from "@/public/svg/button-arrow-bottom.png";
import Image from 'next/image';

interface ArrowProps {
  isOpen: boolean;
}

const Arrow: React.FC<ArrowProps> = ({ isOpen }) => (
  <>
    {isOpen ? (
      <Image
        src={openIcon}
        alt="Open icon" 
        width={50}
        height={50}
        quality={100}
        className="transition-transform duration-300"
      />
    ) : (
      <Image
        src={closedIcon}
        alt="Closed icon"
        width={50}
        height={50}
        quality={100}
        className="transition-transform duration-300"
      />
    )}
  </>
);

const FaqSection: React.FC = () => {
  const t = useTranslations('PropertySearch.PopularReviewsRent');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-[1440px] 5xl:max-w-[2000px] mx-auto px-2 ">
      <h2 className="text-[30px] mdx:text-[45px] xl:text-[55px] font-medium mb-6 ml-3">
        {t('header')}
      </h2>

      {/* FAQ Item 1 */}
      <div className="mb-4">
        <button
          className="w-full flex justify-between items-start whitespace-pre-line text-left p-4 text-lg transition-all duration-700 "
          onClick={() => toggleFAQ(0)}
        >
          <span
            className={`text-[22px] mdx:text-[26px] whitespace-pre-line xl:text-[30px] max-mdx:max-w-[80%] ${
              openIndex === 0 ? 'text-corporate' : 'text-black transition-all duration-1000'
            }`}
          >
            {t('faq1.question')}
          </span>
          <span className="flex-shrink-0">
            <Arrow isOpen={openIndex === 0} />
          </span>
        </button>
        <div
          className={`border-b border-[#E1E1E1] overflow-hidden transition-all duration-700 ${
            openIndex === 0 ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <p className="p-4 text-[15px] whitespace-pre-line mdx:text-[20px]">{t('faq1.answer')}</p>
        </div>
      </div>

      {/* FAQ Item 2 */}
      <div className="mb-4">
        <button
          className="w-full flex justify-between items-start whitespace-pre-line text-left p-4 text-lg transition-all duration-700 "
          onClick={() => toggleFAQ(1)}
        >
          <span
            className={`text-[22px] mdx:text-[26px] whitespace-pre-line xl:text-[30px] max-mdx:max-w-[80%] ${
              openIndex === 1 ? 'text-corporate' : 'text-black transition-all duration-1000'
            }`}
          >
            {t('faq2.question')}
          </span>
          <span className="flex-shrink-0">
            <Arrow isOpen={openIndex === 1} />
          </span>
        </button>
        <div
          className={`border-b border-[#E1E1E1] overflow-hidden transition-all duration-700 ${
            openIndex === 1 ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <p className="p-4 text-[15px] whitespace-pre-line mdx:text-[20px]">{t('faq2.answer')}</p>
        </div>
      </div>

      {/* FAQ Item 3 */}
      <div className="mb-4">
        <button
          className="w-full flex justify-between items-start whitespace-pre-line text-left p-4 text-lg transition-all duration-700 "
          onClick={() => toggleFAQ(2)}
        >
          <span
            className={`text-[22px] mdx:text-[26px] whitespace-pre-line xl:text-[30px] max-mdx:max-w-[80%] ${
              openIndex === 2 ? 'text-corporate' : 'text-black transition-all duration-1000'
            }`}
          >
            {t('faq3.question')}
          </span>
          <span className="flex-shrink-0">
            <Arrow isOpen={openIndex === 2} />
          </span>
        </button>
        <div
          className={`border-b border-[#E1E1E1] overflow-hidden transition-all duration-700 ${
            openIndex === 2 ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <p className="p-4 text-[15px] whitespace-pre-line mdx:text-[20px]">{t('faq3.answer')}</p>
        </div>
      </div>

      {/* FAQ Item 4 */}
      <div className="mb-4">
        <button
          className="w-full flex justify-between items-start whitespace-pre-line text-left p-4 text-lg transition-all duration-700 "
          onClick={() => toggleFAQ(3)}
        >
          <span
            className={`text-[22px] mdx:text-[26px] whitespace-pre-line xl:text-[30px] max-mdx:max-w-[80%] ${
              openIndex === 3 ? 'text-corporate' : 'text-black transition-all duration-1000'
            }`}
          >
            {t('faq4.question')}
          </span>
          <span className="flex-shrink-0">
            <Arrow isOpen={openIndex === 3} />
          </span>
        </button>
        <div
          className={`border-b border-[#E1E1E1] overflow-hidden transition-all duration-700 ${
            openIndex === 3 ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <p className="p-4 text-[15px] mdx:text-[20px] whitespace-pre-line">{t('faq4.answer')}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;

// import necessary modules
"use client";
import Link from "next/link";
import { useState } from "react";
import arrow_black from "@/public/svg/arrow-down-black.svg";
import arrow_yellow from "@/public/svg/arrow-up-yellow.svg";
import Image from "next/image";
import { useTranslations } from 'next-intl';

interface ServiceOption {
  title: string;
  slug: string;
}

// Define the structure of navOptions items
interface NavItem {
  title: string;
  slug: string;
}



interface NavigationProps {
  navOptions: NavItem[];
  locale: string;
}

const Navigation: React.FC<NavigationProps> = ({ navOptions, locale }) => {
  const t = useTranslations('Header');
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);

  const servicesOptions: ServiceOption[] = [
    { title: t('nav.servicesOptions.buy'), slug: 'buy' },
    { title: t('nav.servicesOptions.rent'), slug: 'rent' },
    { title: t('nav.servicesOptions.sell'), slug: 'sell' },
    { title: t('nav.servicesOptions.evaluation'), slug: 'evaluation' }
  ];
  const handleServicesClick = (): void => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <nav className="h-full flex gap-10 items-center max-2xl:hidden relative font-normal">
      {navOptions.map((item, i) => {
        if (item.title === t('nav.services'))  {
          return (
            <div key={i} className="relative">
              <div onClick={handleServicesClick} className="cursor-pointer flex items-center">
                <span
                  className={`font-medium text-[18px] transition-all duration-300 whitespace-nowrap font-normal ${isServicesOpen ? 'text-corporate' : 'text-[#252324] hover:text-corporate'}`}
                >
                  {item.title}
                </span>
                <span className="ml-2">
                  <Image
                    src={isServicesOpen ? arrow_yellow : arrow_black}
                    width={50}
                    height={50}
                    alt="arrow"
                    className="h-full w-[12%] mdx:h-[20px] mdx:w-auto"
                  />
                </span>
              </div>
              {isServicesOpen && (
                <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md z-50 w-[340px]">
                  {servicesOptions.map((service, index) => (
                    <Link href={`/${locale}/${service.slug}`} key={index}>
                      <div className="px-4 py-[10px] text-[18px] font-normal hover:bg-[#FCE8E9] hover:text-corporate cursor-pointer border-b last:border-none">
                        {service.title}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        } else {
          return (
            <Link href={`/${locale}/${item.slug}`} key={i}>
              <div className="text-[#252324] font-normal text-[18px] hover:text-corporate transition-all duration-300 whitespace-nowrap">
                {item.title}
              </div>
            </Link>
          );
        }
      })}
    </nav>
  );
}

export default Navigation;

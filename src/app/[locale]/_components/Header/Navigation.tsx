"use client";
import Link from "next/link";
import { useState } from "react";
import arrow_black from "@/public/svg/arrow-down-black.svg";
import arrow_yellow from "@/public/svg/arrow-up-yellow.svg";
import Image from "next/image";

const servicesOptions = [
  { title: 'Купить', slug: 'buy' },
  { title: 'Арендовать', slug: 'rent' },
  { title: 'Продать', slug: 'sell' },
  { title: 'Оценка недвижимости', slug: 'evaluation' }
];

export default function Navigation({ navOptions }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleServicesClick = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <nav className="h-full flex gap-10 items-center max-2xl:hidden relative">
      {navOptions.map((item, i) => {
        if (item.title === 'Услуги') {
          return (
            <div key={i} className="relative">
              <div onClick={handleServicesClick} className="cursor-pointer flex items-center">
                <span
                  className={`font-medium text-[18px] transition-all duration-300 whitespace-nowrap ${isServicesOpen ? 'text-[#E1AF93]' : 'text-[#252324] hover:text-[#E1AF93]'
                    }`}
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
                    <Link href={`/${service.slug}`} key={index}>
                      <div className="px-4 py-[10px] text-[18px] hover:bg-[#FCF7F4] hover:text-[#E1AF93] cursor-pointer border-b last:border-none">
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
            <Link href={`/${item.slug}`} key={i}>
              <div className="text-[#252324] font-medium text-[18px] hover:text-[#E1AF93] transition-all duration-300 whitespace-nowrap">
                {item.title}
              </div>
            </Link>
          );
        }
      })}
    </nav>
  );
}
